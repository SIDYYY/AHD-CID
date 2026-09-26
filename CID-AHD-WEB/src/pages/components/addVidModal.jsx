import React, { useState } from "react";
import { supabase } from "../../supabase";

export default function AddVideoModal({ isOpen, onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
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

    const { error } = await supabase.from("videos").insert([
      {
        title,
        video_id: videoId,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Upload failed");
    } else {
      alert("Video uploaded!");
      setTitle("");
      setVideoUrl("");
      onSuccess?.();
      onClose();
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-10">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Upload New Video</h2>
        <p className="text-gray-600 mb-4">Add a YouTube video</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Video Title
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              YouTube Link
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}