import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Recommended.css";

const API_KEY = "YOUR_YOUTUBE_API_KEY"; // 🔴 Replace with a valid API key

const Recommendation = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchRelatedVideos();
  }, [videoId]);

  const fetchRelatedVideos = async () => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=8&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setRelatedVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching related videos:", error);
    }
  };

  return (
    <div className="recommendations">
      <h3 className="recommend-title">Recommended Videos</h3>
      {relatedVideos.map((video) => (
        <Link
          key={video.id.videoId}
          to={`/watch/${video.id.videoId}`}
          className="recommend-item"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="recommend-thumbnail"
          />
          <div className="recommend-info">
            <h4 className="recommend-title">{video.snippet.title}</h4>
            <p className="recommend-channel">{video.snippet.channelTitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommendation;
