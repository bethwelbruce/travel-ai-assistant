# travel-ai-assistant
A modern AI-powered travel guide that provides real-time visa, vaccine, and document requirements for any destination. Built with FastAPI (Python) and Next.js, featuring a sleek responsive UI with animated interactions.

# 🌍 Travel AI Assistant

## Features
- Real-time visa/vaccine/document advice
- Modern responsive UI (mobile/desktop)
- Query history tracking
- Fast AI responses via Groq API

## Setup

### Backend (FastAPI)
1. Create `backend/api.env`:
   ```env
   GROQ_API_KEY=your_key_here
Install & run:

bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend (Next.js)
bash
cd frontend
npm install
npm run dev
Tech Stack
Frontend: Next.js, Tailwind CSS, Framer Motion

Backend: FastAPI, Python

AI: Groq (Llama3-70B)

Usage
Visit http://localhost:3000

Ask questions like:

"Visa requirements for Japan?"

"Vaccines needed for Brazil?"

Project Structure
backend/
  main.py           # API routes
  api.env           # API keys
frontend/
  pages/index.js    # Main UI
  package.json      # Frontend deps
Note: Requires Node.js 18+ and Python 3.10+


This includes:
1. **Minimal headings** (no fluff)
2. **Exact commands** to run the project
3. **File locations** for key configurations
4. **Basic tech stack** info
5. **Usage examples**

Adjust the Groq model name if you're using a different one
