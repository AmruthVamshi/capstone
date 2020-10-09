import React from "react";
import "./Feed.css";
import MessageSender from './MessageSender';
import Post from "./Post";
import db from "./firebase";
import { useState, useEffect } from "react";
import axios from 'axios'
import FormData from 'form-data'
import { useStateValue } from "./StateProvider";

function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [{ headmaster }, dispatch] = useStateValue();

  useEffect(() => {
      var data = new FormData();
      var url = 'https://capstonebackend0.herokuapp.com/request';
      if(props.headmaster) url = `https://capstonebackend0.herokuapp.com/request?id=${headmaster.id}`
      var config = {
        method: 'get',
        url: url,
        headers: { 
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(response.data);
        setPosts(response.data.body.map(post=>({id:post.id.id,data:post})));
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);

  if(props.headmaster){
    return(
      <div className="feed">
      <h3>Post you requests here :</h3>
      <MessageSender/>
      <h3 style={{marginTop:"10px"}}>My requests</h3>
      {posts.map((post) => (
        <Post
          id={post.data.id}
          headmaster={true}
          profilePic={null}
          timestamp={post.data.createdAt}
          username={post.data.donnie.username}
          image={post.data.picture}
          requestMessage={post.data.requestDescription}
          childMessage={post.data.childDescription}
          schoolLocation={post.data.schoolLocation}
          schoolName={post.data.schoolName}
        />
      ))}
    </div>
    )
  }

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          id={post.data.id}
          headmaster={false}
          profilePic={null}
          timestamp={post.data.createdAt}
          username={post.data.donnie.username}
          image={post.data.picture}
          requestMessage={post.data.requestDescription}
          childMessage={post.data.childDescription}
          schoolLocation={post.data.schoolLocation}
          schoolName={post.data.schoolName}
        />
      ))}
    </div>
  );
}

export default Feed;

/*
db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
 */