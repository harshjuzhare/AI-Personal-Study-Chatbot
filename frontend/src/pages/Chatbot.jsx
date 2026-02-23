import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [recording, setRecording] = useState(false);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // ✅ SEND MESSAGE
  const sendMessage = async (text = message) => {
    if (!text.trim()) return;
    setChat((prev) => [...prev, { sender: "user", text, time: new Date() }]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        setChat((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ API quota exceeded.", time: new Date() },
        ]);
        return;
      }

      const data = await res.json();
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "No response from AI.", time: new Date() },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "Network error 🚫", time: new Date() },
      ]);
    }
  };

  // 🎤 VOICE INPUT
  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice not supported in this browser");

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setRecording(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      setRecording(false);
    };

    recognition.onerror = () => setRecording(false);
  };

  // 📎 FILE UPLOAD
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setChat((prev) => [...prev, { sender: "user", text: `Uploaded: ${file.name}`, time: new Date() }]);

    try {
      const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: data.reply || "File processed.", time: new Date() },
      ]);
    } catch (error) {
      setChat((prev) => [...prev, { sender: "ai", text: "File upload error 🚫", time: new Date() }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/bot-logo.png" // Replace with your logo path
            alt="AI Study Bot"
            className="w-10 h-10 rounded-full bg-white p-1"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">AI Study Bot</h1>
            <span className="text-sm opacity-80">
              Hi, I’m AI Study Bot. How can I help you?
            </span>
          </div>
        </div>
        <span className="text-sm opacity-70">{recording ? "Recording..." : ""}</span>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-md p-3 rounded-xl shadow ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-black rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <span className="text-xs opacity-50 mt-1 block text-right">
                {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white flex items-center gap-2 shadow-md">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
        />
        <button
          onClick={() => sendMessage()}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Send
        </button>
        <button
          onClick={startVoice}
          className={`px-4 py-2 rounded-full shadow ${
            recording ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          🎤
        </button>
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 rounded-full bg-gray-200 shadow"
        >
          📎
        </button>
        <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} />
      </footer>
    </div>
  );
}