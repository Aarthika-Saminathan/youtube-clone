import React from "react";
import { useParams } from "react-router-dom";
import "./Video.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recommended from "../../Components/Recommended/Recommended";

const Video = () => {
  const { videoId, categoryId } = useParams(); // ✅ Corrected destructuring

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      {categoryId && <Recommended categoryId={categoryId} />} {/* ✅ Only show Recommended if categoryId exists */}
    </div>
  );
};

export default Video;
