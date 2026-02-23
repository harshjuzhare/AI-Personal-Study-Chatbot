import { useState } from "react";
import { motion } from "framer-motion";

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});

  const generateQuiz = async () => {
    if (!topic) return alert("Enter a topic");

    setLoading(true);

    // Dummy AI Data (Replace with backend later)
    setTimeout(() => {
      const dummy = Array.from({ length: count }, (_, i) => ({
        id: i,
        question: `Sample Question ${i + 1} about ${topic}?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A",
      }));

      setQuestions(dummy);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-10">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-10 text-gray-800"
      >
        AI Quiz Generator 🤖
      </motion.h1>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl max-w-3xl mx-auto mb-10"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Topic (e.g. Java, DBMS, AI)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 p-4 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="p-4 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
          </select>

          <button
            onClick={generateQuiz}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl transition duration-300"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </motion.div>

      {/* Questions Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        {questions.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <h3 className="font-semibold text-lg mb-4">
              Q{index + 1}. {q.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSelected({ ...selected, [q.id]: opt })
                  }
                  className={`p-3 rounded-xl border transition duration-200
                    ${
                      selected[q.id] === opt
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 hover:bg-indigo-100"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}