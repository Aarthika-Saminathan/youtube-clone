import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Feed.css';
import { API_KEY, value_converter } from '../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  console.log("Passing category to Feed:", category);

  const fetchData = async () => {
    try {
      const videolist_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category || 0}&key=${API_KEY}`;

      const response = await fetch(videolist_url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Fetched Data:", result);

      // Filter videos to remove age-restricted and blocked content
      const filteredVideos = result.items.filter(item => {
        const isAgeRestricted = item.contentDetails.contentRating?.ytRating === "ytAgeRestricted";
        const isBlocked = item.contentDetails.regionRestriction?.blocked?.includes("US");
        return !isAgeRestricted && !isBlocked;
      });

      setData(filteredVideos);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load videos. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {error ? (
        <p className="error">{error}</p>
      ) : data.length > 0 ? (
        data.map((item) => (
          <Link to={`/video/${item.id}`} className="card" key={item.id}>
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <h2>{item.snippet.channelTitle}</h2>
            <h3>{item.snippet.title}</h3>
            <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        ))
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default Feed;
