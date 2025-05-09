# 🌍 Travel AI Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-blue)](https://nextjs.org/)

An AI-powered travel assistant that provides real-time visa, vaccine, and document requirements for any destination.

![image](https://github.com/user-attachments/assets/391baaf7-5b8c-4829-8aa0-1e194b9fdbb4)
![image](https://github.com/user-attachments/assets/3678581b-6329-4f07-872e-c245342ae37f)



## ✨ Features

- **Instant Travel Advice** - Get visa/vaccine requirements in seconds
- **Modern UI** - Sleek glassmorphism design with animations
- **Query History** - Track your previous searches
- **Responsive** - Works on mobile & desktop
- **Fast API** - Powered by Groq's lightning-fast LLMs

## 🛠 Tech Stack

**Backend**:
- Python 3.10+
- FastAPI
- Groq API (Llama3-70B)

**Frontend**:
- Next.js 14
- Tailwind CSS
- Framer Motion
- React Icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- [Groq API key](https://console.groq.com/keys)

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/bethwelbruce/travel-ai-assistant.git
   cd travel-ai-assistant
Set up backend:

bash
cd backend
cp .env.template .env  # Add your Groq API key
pip install -r requirements.txt
uvicorn main:app --reload
Set up frontend (in new terminal):

bash
cd frontend
npm install
npm run dev
Open http://localhost:3000 in your browser

📂 Project Structure
travel-ai-assistant/
├── backend/            # FastAPI server
│   ├── main.py
│   ├── requirements.txt
│   └── .env.template
└── frontend/           # Next.js app
    ├── pages/
    ├── public/
    └── package.json
📝 License
MIT © 2024 [Your Name]

Happy Travels! ✈️🌎
