import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Notes from "./pages/Notes";
import Quiz from "./pages/Quiz";
import PDFSummary from "./pages/PDFSummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/chat" element={<Chatbot />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/pdf" element={<PDFSummary />} />
    </Routes>
  );
}

export default App;