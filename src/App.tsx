import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";

function Layout() {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  return (
    <div className="min-h-screen bg-white">
      {!isChatPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {!isChatPage && (
        <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm">© 2026 Akhil. Crafted with passion and code.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}