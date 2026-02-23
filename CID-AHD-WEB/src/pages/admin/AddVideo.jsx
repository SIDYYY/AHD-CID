import React, { useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export default function AddVideo() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Removed the extra 'a'

  // Function to extract YouTube Video ID
  const extractVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      alert("Invalid YouTube link");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("videos")
      .insert([
        {
          title: title,
          video_id: videoId,
        },
      ]);

    if (error) {
      console.error("Supabase error:", error);
      alert("Upload failed");
    } else {
      alert("Video uploaded successfully!");
      navigate("/admin/adminDashboard");
    }

    setLoading(false);
  };

  return (
    <div className="add-video-container">
      <div className="add-video-card">
        <h2>Upload New Video</h2>
        <p>Add a YouTube video to your collection</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Video Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">YouTube Link</label>
            <input
              id="videoUrl"
              type="text"
              placeholder="Paste YouTube URL (e.g., https://youtube.com/watch?v=...)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>

            <button 
              type="button" 
              onClick={() => navigate("/admin/adminDashboard")}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .add-video-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          padding: 20px;
          background: linear-gradient(135deg, #2729ce 0%, #60bcd3 100%);
        }

        .add-video-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          padding: 40px;
          width: 100%;
          max-width: 500px;
        }

        .add-video-card h2 {
          color: #333;
          font-size: 28px;
          margin: 0 0 10px 0;
          text-align: center;
        }

        .add-video-card p {
          color: #666;
          text-align: center;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #555;
          font-weight: 600;
          font-size: 14px;
        }

        .form-group input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-group input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-group input::placeholder {
          color: #999;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-primary, .btn-secondary {
          flex: 1;
          padding: 14px 20px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #1ca3e2 0%, #0c476e 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 111, 233, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #f0f0f0;
          color: #666;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        @media (max-width: 768px) {
          .add-video-card {
            padding: 30px 20px;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}