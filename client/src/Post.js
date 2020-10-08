import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import NearMeIcon from "@material-ui/icons/NearMe";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function Post({ profilePic, message, timestamp, image, username }) {
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          {/* It would first parse the time into int as seconds and then to UTC time */}
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <div className="messageSender__location">
            <LocationOnIcon style={{ color: "green" }} />
            <div className="messageSender__locationDisplay">
              <h5>Display location here</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
