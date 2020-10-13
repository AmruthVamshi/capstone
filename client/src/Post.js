import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Button } from "@material-ui/core";
import Cookies from 'universal-cookie';
import axios from 'axios';
import DonateModal from './donateModal';
import { useState } from "react";
import swal from 'sweetalert';

function Post({id, profilePic, requestMessage, timestamp, image, username,schoolLocation,childMessage,schoolName,headmaster,myDonations,responses}) {
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
      swal("couldn't delete your post!.",'','error');
    });
  }

  if(myDonations){
    return (
        <div className="post">
          <div className="post__top">
          <Avatar src={myDonations.profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>Donated to : {myDonations.school}</h3>
            {/* It would first parse the time into int as seconds and then to UTC time */}
            <p>{new Date(myDonations.time.toString()).toString()}</p>
          </div>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> donated Item : {myDonations.itemName}</p>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> Item condition : {myDonations.itemDescription}</p>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> pickup address : {myDonations.address}</p>
        </div>
        </div>
      )
  }
  console.log(responses)
  if(responses){
    return (
      <div className="post">
          <div className="post__top">
          <Avatar src={responses.profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>{responses.donorName} volunteered to donate {responses.itemName}</h3>
            {/* It would first parse the time into int as seconds and then to UTC time */}
            <p>{new Date(responses.time.toString()).toString()}</p>
          </div>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> Your request : {responses.requestDescription}</p>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> Item condition : {responses.itemDescription}</p>
        </div>
        <div className="post__bottom">
          <p style={{fontSize:"20px"}}> contact info : {responses.address}</p>
        </div>
        </div>
    )
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
        <p style={{fontWeight:'bold',fontSize:'18px'}}>School Name : {schoolName}</p>
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
