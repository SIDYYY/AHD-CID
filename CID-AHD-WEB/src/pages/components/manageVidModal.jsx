import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function ManageVideosModal({
  isOpen,
  onClose,
  refreshKey = 0,
}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingVideo, setEditingVideo] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos.");
    } else {
      setVideos(data || []);
    }

    setLoading(false);
  };
  const extractVideoId = (url) => {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;

  const match = url.match(regExp);

  return match ? match[1] : null;
};
const handleEdit = async () => {
  if (!editingVideo) return;

  const videoId = extractVideoId(editUrl);

  if (!videoId) {
    alert("Invalid YouTube link.");
    return;
  }

  if (!editTitle.trim()) {
    alert("Please enter a video title.");
    return;
  }

  setSavingEdit(true);

  const { error } = await supabase
    .from("videos")
    .update({
      title: editTitle.trim(),
      video_id: videoId,
    })
    .eq("id", editingVideo.id);

  if (error) {
    console.error("Update error:", error);
    alert("Failed to update video.");
  } else {
    setVideos((prev) =>
      prev.map((video) =>
        video.id === editingVideo.id
          ? {
              ...video,
              title: editTitle.trim(),
              video_id: videoId,
            }
          : video
      )
    );

    setEditingVideo(null);
    setEditTitle("");
    setEditUrl("");
  }

  setSavingEdit(false);
};

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this video?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    alert("Failed to delete video.");
    return;
  }

  setVideos((prev) => prev.filter((video) => video.id !== id));
};

  useEffect(() => {
    if (isOpen) {
      fetchVideos();
    }
  }, [isOpen, refreshKey]);

  // IMPORTANT: Don't display anything unless the button was clicked
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Manage Videos
            </h2>
            <p className="text-sm text-gray-500">
              Videos currently posted in the system
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[75vh]">
          {loading && (
            <p className="text-gray-500 text-center py-10">
              Loading videos...
            </p>
          )}

          {error && (
            <p className="text-red-500 text-center py-10">
              {error}
            </p>
          )}

          {!loading && !error && videos.length === 0 && (
            <p className="text-gray-500 text-center py-10">
              No videos posted yet.
            </p>
          )}

          {!loading && !error && videos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white border rounded-xl shadow-sm overflow-hidden"
                >
                  {/* YouTube Video */}
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.video_id}`}
                      title={video.title}
                      allowFullScreen
                    />
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                        {video.title}
                    </h3>

                    {video.created_at && (
                        <p className="text-sm text-gray-500 mt-1">
                        {new Date(video.created_at).toLocaleDateString()}
                        </p>
                    )}

                    <div className="flex gap-2 mt-4">
                        <button
                        onClick={() => {
                            setEditingVideo(video);
                            setEditTitle(video.title);
                            setEditUrl(
                            `https://www.youtube.com/watch?v=${video.video_id}`
                            );
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                        Edit
                        </button>

                        <button
                        onClick={() => handleDelete(video.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>

      </div>
      {editingVideo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
                Edit Video
            </h2>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Video Title
                </label>

                <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Link
                </label>

                <input
                type="text"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.youtube.com/watch?v=..."
                />
            </div>

            <div className="flex justify-end gap-2">
                <button
                onClick={() => setEditingVideo(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                Cancel
                </button>

                <button
                onClick={handleEdit}
                disabled={savingEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                {savingEdit ? "Saving..." : "Save Changes"}
                </button>
            </div>
            </div>
        </div>
        )}
    </div>

    
  );
}