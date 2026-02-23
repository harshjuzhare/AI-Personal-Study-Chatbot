import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10">

          {/* Animated Heading */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              AI Study Assistant 🚀
            </h1>
            <p className="text-gray-600 text-lg">
              Smart learning powered by Artificial Intelligence.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Notes Card */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/notes">
                <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105 cursor-pointer border border-white/40">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    Notes Manager
                  </h3>
                  <p className="text-gray-600">
                    Create, edit, and organize all your study notes.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Quiz Card */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/quiz">
                <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105 cursor-pointer border border-white/40">
                  <div className="text-4xl mb-4">❓</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    AI Quiz Generator
                  </h3>
                  <p className="text-gray-600">
                    Generate instant MCQs using AI.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Chat Card */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/chat">
                <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105 cursor-pointer border border-white/40">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    AI Chat Assistant
                  </h3>
                  <p className="text-gray-600">
                    Ask doubts and get instant AI explanations.
                  </p>
                </div>
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}