#🤖 AI Study Assistant

AI Study Assistant is a full-stack web application that helps students learn smarter using Artificial Intelligence.  
It uses a **local AI model (Mistral via Ollama)** to generate responses without using any paid API.

---

## 🚀 Features

- 💬 AI Chat Assistant (Ask study doubts)
- 📄 File Upload & AI Explanation
- 📝 Notes Management (UI ready)
- ❓ Quiz Section (UI ready)
- 🎨 Modern Animated Dashboard
- ⚡ Fully Local AI (No OpenAI API Required)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Framer Motion

### Backend
- Node.js
- Express.js
- Axios
- Multer (File Upload)

### AI Engine
- Ollama (Local LLM Runtime)
- Mistral Model

---

## 📂 Project Structure


AI-Study-Assistant/
│
├── backend/
│ ├── routes/
│ ├── uploads/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Install Ollama

Download from:  
https://ollama.com

Then install Mistral model:


ollama pull mistral


---

### 2️⃣ Start Ollama


ollama run mistral


After it loads, press **Ctrl + C**  
(Ollama server keeps running in background)

---

### 3️⃣ Start Backend


cd backend
npm install
node server.js


Backend runs on:


http://localhost:5000


---

### 4️⃣ Start Frontend

Open new terminal:


cd frontend
npm install
npm run dev


Frontend runs on:


http://localhost:5173


---

## 🔗 API Endpoints

### Chat API

POST /api/chat


Request Body:
```json
{
  "message": "Explain recursion simply"
}
File Upload API
POST /api/upload

FormData:

file: <your_text_file>
