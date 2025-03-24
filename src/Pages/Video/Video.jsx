import React from "react";
import { useParams } from "react-router-dom";
import "./Video.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";

const Video = () => {
  const { videoId } = useParams(); // No need for categoryId

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <Recommended videoId={videoId} /> {/* Corrected here */}
    </div>
  );
};

export default Video;
