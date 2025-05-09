from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from typing import Optional

# Load environment variables
load_dotenv("api.env")  # Load from api.env file

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq API Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("Missing GROQ_API_KEY in api.env file")

class Query(BaseModel):
    question: str

def call_groq_api(prompt: str) -> str:
    """Call Groq API with optimized travel expert prompt"""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {
                "role": "system",
                "content": """You are a professional travel advisor. Always respond with:
                - Clear section headers (##)
                - Bullet points
                - Concise factual information
                - Up-to-date requirements
                Example format:
                ## Visa Requirements
                - Valid passport (6+ months validity)
                - Proof of onward travel"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.5,  # Balance creativity/accuracy
        "max_tokens": 512,   # Control response length
        "top_p": 0.9
    }

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=15  # 15-second timeout
        )
        response.raise_for_status()
        
        data = response.json()
        return data["choices"][0]["message"]["content"]
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Groq API request failed: {str(e)}"
        )

@app.post("/ask")
async def ask_question(query: Query):
    """Main endpoint for travel questions"""
    try:
        if not query.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        ai_response = call_groq_api(query.question)
        
        return {
            "response": ai_response,
            "status": "success"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Service health endpoint"""
    return {
        "status": "healthy",
        "provider": "Groq",
        "model": "llama3-70b-8192"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)