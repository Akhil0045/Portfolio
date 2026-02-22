import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = "portfolio_chat"

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DB_NAME]

async def get_database():
    return db

async def store_chat_message(session_id: str, role: str, content: str):
    await db.chats.insert_one({
        "session_id": session_id,
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow()
    })

async def get_chat_history(session_id: str):
    cursor = db.chats.find({"session_id": session_id}).sort("timestamp", 1)
    return await cursor.to_list(length=100)
