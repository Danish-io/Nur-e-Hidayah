from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import edge_tts
import io
from pydantic import BaseModel
import time

app = FastAPI(title="Nur-e-Hidayah AI Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchQuery(BaseModel):
    query: str

class TTSRequest(BaseModel):
    text: str
    voice: str = "hi-IN-SwaraNeural"  # Default to Hindi Neural

@app.get("/")
def read_root():
    return {"message": "AI Service Operational"}

@app.post("/search")
def search(query: SearchQuery):
    # Mock AI response logic
    time.sleep(1) # Simulate processing
    q = query.query.lower()
    
    if "patience" in q:
        return {"answer": "The Quran mentions patience (Sabr) frequently. Allah is with those who are patient (2:153). Indeed, with hardship [will be] ease (94:6)."}
    elif "mercy" in q:
        return {"answer": "My mercy encompasses all things (7:156). Allah is the Entirely Merciful, the Especially Merciful."}
    
    return {"answer": f"You asked about '{query.query}'. This is a mock response from the AI service. In a real implementation, this would query a vector database for semantic matches."}

@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    """
    Generates audio from text using Edge TTS.
    Returns audio/mpeg binary data.
    """
    voice = request.voice
    text = request.text
    
    # Generate audio
    communicate = edge_tts.Communicate(text, voice)
    
    # Create an in-memory byte stream
    audio_data = io.BytesIO()
    
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.write(chunk["data"])
            
    audio_data.seek(0)
    
    return Response(content=audio_data.read(), media_type="audio/mpeg")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
