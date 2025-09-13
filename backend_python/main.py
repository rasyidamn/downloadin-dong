import re
import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from yt_dlp import YoutubeDL
import requests
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Muat environment variables dari file .env
load_dotenv()

# --- Inisialisasi Aplikasi FastAPI ---
app = FastAPI()

# --- Konfigurasi CORS ---
# Ambil URL frontend dari environment variable
frontend_url = os.getenv('FRONTEND_URL')
origins = []
if frontend_url:
    origins.append(frontend_url)
# Tambahkan origin lain jika perlu, misalnya untuk development
# origins.append("http://localhost:5173") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins , # Izinkan origin spesifik atau semua jika tidak diset
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Model Pydantic untuk Validasi Request Body ---
class VideoRequest(BaseModel):
    url: str

# --- Endpoint untuk mengambil metadata video ---
@app.post("/api/video-info")
async def get_video_info(request: VideoRequest):
    YDL_OPTIONS = {
        'dump_single_json': True,
        'no_check_certificates': True,
        'warnings': 'no',
        'prefer_free_formats': True,
    }

    try:
        with YoutubeDL(YDL_OPTIONS) as ydl:
            metadata = ydl.extract_info(request.url, download=False)

            video_info = {
                "title": metadata.get("title"),
                "thumbnail": metadata.get("thumbnail"),
                "duration": metadata.get("duration"),
                "formats": [
                    {
                        "format_id": f.get("format_id"),
                        "ext": f.get("ext"),
                        "resolution": f.get("resolution"),
                        "url": f.get("url"),
                    }
                    for f in metadata.get("formats", []) if f.get("url") # Pastikan format punya URL
                ],
            }
        return {"message": "success", "data": video_info}

    except Exception as e:
        print(f"Error saat mengambil info video: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# --- Endpoint untuk men-download/stream video ---
@app.get("/api/video-download")
async def download_video(
    url: str = Query(..., description="URL video untuk di-download"),
    title: str | None = Query(default="video", description="Judul untuk nama file")
):
    try:
        safe_title = re.sub(r'[^a-z0-9]', '_', title.lower())
        
        # requests.get akan mengunduh seluruh file jika stream=False,
        # jadi kita buat generator untuk streaming
        def stream_content():
            with requests.get(url, stream=True) as req:
                req.raise_for_status() # Cek jika ada error HTTP
                for chunk in req.iter_content(chunk_size=8192):
                    yield chunk

        headers = {"Content-Disposition": f"attachment; filename=\"{safe_title}.mp4\""}
        return StreamingResponse(stream_content(), media_type="video/mp4", headers=headers)

    except Exception as e:
        print(f"Error saat proxy download: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Endpoint root untuk verifikasi
@app.get("/")
async def root():
 return {"message": "FastAPI server for yt-dlp is running!"}
