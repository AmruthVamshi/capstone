import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import NearMeIcon from "@material-ui/icons/NearMe";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Button } from "@material-ui/core";
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import DonateModal from './donateModal';
import { useState, useEffect } from "react";

function Post({id, profilePic, requestMessage, timestamp, image, username,schoolLocation,childMessage,schoolName,headmaster}) {
  const [modalShowDonate, setModalShowDonate] = useState(false);
  const deletePost = ()=>{
    const cookies = new Cookies();
    var config = {
      method: 'delete',
      url: `https://capstonebackend0.herokuapp.com/request/${id}`,
      headers: { 
        'x-access-token': cookies.get('logintoken')
      }
    };

    axios(config)
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      alert("couldn't delete your post!.");
    });
  }

  return (
    <div className="post" key={id}>
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3>
          {/* It would first parse the time into int as seconds and then to UTC time */}
          <p>{new Date(timestamp.toString()).toString()}</p>
        </div>
      </div>
      <div className="post__bottom">
        <p style={{fontSize:"20px"}}>{requestMessage}</p>
      </div>
      <div className="post__bottom">
        <h5>You are donating to :</h5><p>{childMessage}</p>
      </div>
      <div className="post__bottom">
        <h5>School Name :</h5><p>{schoolName}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        {
          !headmaster?(
            <div className="post__option">
            <Button variant="primary" onClick={() => setModalShowDonate(true)}>
              Donate
            </Button>

            <DonateModal
              show={modalShowDonate}
              onHide={() => setModalShowDonate(false)}
              id={id}
            />
            </div>
            ):(
              <div className="post__option">
                <Button type="submit" onClick={deletePost}>Delete</Button>
              </div>
            )
        }
        <div className="post__option">
          <div className="messageSender__location">
            <LocationOnIcon style={{ color: "green" }} />
            <div className="messageSender__locationDisplay">
              <h5>{schoolLocation}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
