import os
import httpx
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from .database import store_chat_message, get_chat_history

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"), override=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
MODEL_NAME = os.getenv("MODEL_NAME", "stepfun/step-3.5-flash:free").strip()

# Context for the AI to know about Akhil
AKHIL_CONTEXT = """
You are Akhil's Portfolio Assistant. Akhil is a 3rd year CS student.
Skills: React, Node.js, TypeScript, Python, C++, Solidity, MongoDB, Supabase.
Projects: ZeroTrace (Data Sanitization), AnonSphere (Encrypted Chat), Safe-Shore (Disaster Response).
Be professional and concise. Use his portfolio data to answer.
"""

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id
    user_message = request.message

    # Get chat history from MongoDB
    history = await get_chat_history(session_id)
    
    # Store user message
    await store_chat_message(session_id, "user", user_message)

    # Prepare messages for OpenRouter
    messages = [{"role": "system", "content": AKHIL_CONTEXT}]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": user_message})

    if not OPENROUTER_API_KEY or "YOUR_OPENROUTER_API_KEY" in OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=500, 
            detail="OpenRouter API Key is missing or using placeholder. Please set OPENROUTER_API_KEY in backend/.env"
        )
    

    async with httpx.AsyncClient() as client:
        try:
            payload = {
                "model": MODEL_NAME,
                "messages": messages,
            }
            
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://akhil-portfolio.com",
                    "X-Title": "Akhil Portfolio Chatbot",
                },
                json=payload,
                timeout=60.0
            )

            if response.status_code != 200:
                # Handle potential model issues with a fallback
                fallback_payload = payload.copy()
                fallback_payload["model"] = "openrouter/auto"
                
                print(f"Primary model failed ({response.status_code}). Trying openrouter/auto...")
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://akhil-portfolio.com",
                        "X-Title": "Akhil Portfolio Chatbot",
                    },
                    json=fallback_payload,
                    timeout=60.0
                )
            
            if response.status_code != 200:
                error_msg = response.text
                print(f"Error from OpenRouter: {error_msg}")
                raise HTTPException(status_code=response.status_code, detail=f"OpenRouter Error: {error_msg}")

            result = response.json()
            ai_message = result["choices"][0]["message"]["content"]

            # Store AI response
            await store_chat_message(session_id, "assistant", ai_message)

            return {"response": ai_message}
            
        except HTTPException:
            raise
        except Exception as e:
            print(f"Chat error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
