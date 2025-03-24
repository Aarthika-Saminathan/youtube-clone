import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY } from '../../data';
import { value_converter } from '../../data';


import { Link } from "react-router-dom";


const Recommended = ({ videoId }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      console.error("Error: videoId is undefined in Recommended component");
      return;
    }

    const fetchRecommendedVideos = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=5&key=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          setRecommendedVideos(data.items);
        } else {
          console.error("No recommended videos found.");
          setRecommendedVideos([]);
        }
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
        setRecommendedVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedVideos();
  }, [videoId]);

  return (
    <div className="recommended">
      <h3>Recommended Videos</h3>

      {loading ? (
        <p>Loading recommended videos...</p>
      ) : recommendedVideos.length > 0 ? (
        recommendedVideos.map((video) => (
          <Link
            to={`/video/${video.id.videoId}`}
            key={video.id.videoId}
            className="recommended-video"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div>
              <h4>{video.snippet.title}</h4>
              <p>{video.snippet.channelTitle}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No recommended videos available.</p>
      )}
    </div>
  );
};

export default Recommended;
