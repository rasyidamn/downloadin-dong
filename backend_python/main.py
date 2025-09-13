import re
import os
from flask import Flask, request, jsonify, Response
from yt_dlp import YoutubeDL
import requests
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": os.getenv('FRONTEND_URL')}})

# Endpoint untuk mengambil metadata video
@app.route("/api/video-info", methods=["POST"])
def get_video_info():
    # Mengambil 'url' dari body JSON, mirip dengan req.body
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL wajib diisi!"}), 400

    YDL_OPTIONS = {
        'dump_single_json': True,
        'no_check_certificates': True,
        'warnings': 'no',
        'prefer_free_formats': True,
    }

    try:
        # Menggunakan yt-dlp untuk mengambil metadata
        with YoutubeDL(YDL_OPTIONS) as ydl:
            metadata = ydl.extract_info(url, download=False)

            # Membuat struktur respons, mirip dengan kode JS Anda
            # List comprehension di bawah ini setara dengan .map() di JS
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
                    for f in metadata.get("formats", [])
                ],
            }

        return jsonify({"message": "success", "data": video_info}), 200

    except Exception as e:
        print(f"Error saat mengambil info video: {e}")
        return jsonify({"error": str(e)}), 500


# Endpoint untuk men-download/stream video
@app.route("/api/video-download", methods=["GET"])
def download_video():
    # Mengambil 'url' dan 'title' dari query parameter, mirip dengan req.query
    video_url = request.args.get("url")
    title = request.args.get("title")

    if not video_url:
        return jsonify({"error": "URL download wajib diisi!"}), 400

    try:
        # Membersihkan judul file, mirip dengan replace() di JS
        safe_title = re.sub(r'[^a-z0-9]', '_', (title or "video").lower())

        # Melakukan streaming download dengan library requests
        # Ini setara dengan axios stream dan pipe di Node.js
        req = requests.get(video_url, stream=True)

        return Response(
            req.iter_content(chunk_size=1024),
            content_type="video/mp4",
            headers={"Content-Disposition": f"attachment; filename=\"{safe_title}.mp4\""}
        )

    except Exception as e:
        print(f"Error saat proxy download: {e}")
        return jsonify({"success": False, "message": "internal server error"}), 500


# Menjalankan aplikasi jika file ini dieksekusi langsung
if __name__ == "__main__":
    app.run(debug=True)