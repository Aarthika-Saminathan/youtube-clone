import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { value_converter } from "../../data";
import moment from "moment";

const API_KEY = "AIzaSyCgg4_GgCute82Oia9JMlsT72WU8MXpSX4"; // 🔴 Replace with your API Key

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(videoDetails_url);
        const data = await response.json();
        if (data.items?.length > 0) {
          setApiData(data.items[0]);
        } else {
          console.error("No video data found");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (!apiData?.snippet?.channelId) return;

    const fetchOtherData = async () => {
      try {
        const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const response = await fetch(channelData_url);
        const data = await response.json();
        if (data.items?.length > 0) {
          setChannelData(data.items[0]);
        } else {
          console.error("No channel data found");
        }
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }

      try {
        const comment_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        const response = await fetch(comment_url);
        const data = await response.json();
        setCommentData(data.items || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setCommentData([]);
      }
    };

    fetchOtherData();
  }, [apiData?.snippet?.channelId]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData?.snippet?.title || "Loading title..."}</h3>

      <div className="play-video-info">
        <p>
          {apiData
            ? `${value_converter(apiData.statistics.viewCount)} views`
            : "Loading views..."}{" "}
          • {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "Loading likes..."}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
          </span>
          <span>
            <img src={share} alt="Share" />
          </span>
          <span>
            <img src={save} alt="Save" />
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || "default-avatar.png"}
          alt="Publisher"
        />
        <div>
          <p>{channelData?.snippet?.title || "Loading channel..."}</p>
          <span>
            {channelData
              ? `${value_converter(channelData.statistics.subscriberCount)} subscribers`
              : "Fetching subscribers..."}
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData?.snippet?.description?.slice(0, 250) || "Loading description..."}</p>
        <hr />
        <h3>
          {apiData ? value_converter(apiData.statistics.commentCount) : "Loading comments..."}{" "}
          Comments
        </h3>

        {commentData.length > 0 ? (
          commentData.map((item, index) => {
            const comment = item?.snippet?.topLevelComment?.snippet;
            return comment ? (
              <div key={index} className="comment">
                <img src={comment?.authorProfileImageUrl} alt="User" />
                <div>
                  <h3>
                    {comment?.authorDisplayName}{" "}
                    <span>{moment(comment?.publishedAt).fromNow()}</span>
                  </h3>
                  <p>{comment?.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="Like" />{" "}
                    <span>{value_converter(comment?.likeCount)}</span>
                    <img src={dislike} alt="Dislike" />
                  </div>
                </div>
              </div>
            ) : null;
          })
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default PlayVideo;