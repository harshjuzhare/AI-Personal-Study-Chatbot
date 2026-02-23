import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <ul className="space-y-6">
        <li><Link to="/" className="hover:text-purple-400">Dashboard</Link></li>
        <li><Link to="/notes" className="hover:text-purple-400">Notes</Link></li>
        <li><Link to="/quiz" className="hover:text-purple-400">Quiz</Link></li>
        <li><Link to="/chat" className="hover:text-purple-400">AI Chat</Link></li>
        <li><Link to="/pdf" className="hover:text-purple-400">PDF Summary</Link></li>
      </ul>
    </div>
  );
}