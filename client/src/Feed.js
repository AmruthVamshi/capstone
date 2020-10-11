import React from "react";
import "./Feed.css";
import MessageSender from './MessageSender';
import Post from "./Post";
import { useState, useEffect } from "react";
import axios from 'axios'
import FormData from 'form-data'
import { useStateValue } from "./StateProvider";
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Cookies from 'universal-cookie';

function Feed(props) {
  const cookies = new Cookies();
  const [posts, setPosts] = useState([]);
  const [{ headmaster,search }, dispatch] = useStateValue();
  const [showDonations,setShowDonations] = useState(false);
  const [showResponses,setShowResponses] = useState(false);

  useEffect(() => {

    if(showResponses){
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", cookies.get('logintoken'));

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://capstonebackend0.herokuapp.com/request/responses", requestOptions)
        .then(response => response.json())
        .then(result => {
            setPosts(result.body.map(post=>({
              response:{
                  profilePic:post.donor.profile_pic,
                  school:post.school,
                  time:post.time,
                  itemName:post.donorResponse.itemName,
                  itemDescription:post.donorResponse.itemDescription,
                  address:post.donor.address,
                  donorName:post.donor.username,
                  requestDescription:post.requestDescription
                }
            })));
        })
        .catch(error => console.log('error', error));

      setPosts([{response:{
        profilePic:null,
        school:'HPS',
        time:'2020-10-10T14:29:21.815Z',
        itemName:'iphone',
        itemDescription:'phone is in working condition',
        address:'hyderabad',
        donorName:'amruth',
        requestDescription:'i need iphone'
      }}])
      return;
    }

    if(!showDonations){

      var data = new FormData();
      var url = `https://capstonebackend0.herokuapp.com/request?search=${search}`;
      if(props.headmaster) url = `https://capstonebackend0.herokuapp.com/request?id=${headmaster.id}&search=${search}`
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
        setPosts(response.data.body.map(post=>({data:post})));
      })
      .catch(function (error) {
        console.log(error);
      });

    }else{

      fetch(`https://capstonebackend0.herokuapp.com/response`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json(); 
        }
        throw new Error("failed to get your donations");
        alert('failed to get your donations');
      })
      .then(responseJson => {
        console.log(responseJson);
        if(!responseJson.body.length){
          alert('You havent donated yet....!')
          setShowDonations(false)
        }
          responseJson.body.map(post=>{
            setPosts(responseJson.body.map(post=>({
              donationData:{
                  profilePic:post.donor.profile_pic,
                  school:post.donnieRequest.schoolName,
                  time:post.createdAt,
                  itemName:post.itemName,
                  itemDescription:post.itemDescription,
                  address:post.donor.address
                }
            })));
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [showDonations,showResponses,search]);


  const AntSwitch = withStyles(theme => ({
  root: {
    width: 50,
    height: 24,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(25px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.error.main,
        borderColor: theme.palette.error.main,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

  if(props.headmaster){
    return(
      <div className="feed">
      <h3>Post you requests here :</h3>
      <MessageSender/>

      <Typography component="div" style={{marginTop:'20px'}}>
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Show My requests</Grid>
          <Grid item>
            <AntSwitch
              checked={showResponses}
              onChange={e=>{setShowResponses(e.target.checked)}}
              value={showResponses}
            />
          </Grid>
          <Grid item>Show responses</Grid>
        </Grid>
      </Typography>
      
      {posts.map((post) => (
        <Post
          responses={post.response}
          id={!post.data?null:post.data.id}
          headmaster={true}
          profilePic={null}
          timestamp={!post.data?null:post.data.createdAt}
          username={!post.data?null:post.data.donnie.username}
          image={!post.data?null:post.data.picture}
          requestMessage={!post.data?null:post.data.requestDescription}
          childMessage={!post.data?null:post.data.childDescription}
          schoolLocation={!post.data?null:post.data.schoolLocation}
          schoolName={!post.data?null:post.data.schoolName}
        />
      ))}
    </div>
    )
  }
  
  return (

    <div className="feed">

      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Show all requests</Grid>
          <Grid item>
            <AntSwitch
              checked={showDonations}
              onChange={e=>{setShowDonations(e.target.checked)}}
              value={showDonations}
            />
          </Grid>
          <Grid item>Show my donations</Grid>
        </Grid>
      </Typography>
      
      {posts.map((post) => (
        <Post
          myDonations={post.donationData}
          id={!post.data?null:post.data.id}
          headmaster={false}
          profilePic={null}
          timestamp={!post.data?null:post.data.createdAt}
          username={!post.data?null:post.data.donnie.username}
          image={!post.data?null:post.data.picture}
          requestMessage={!post.data?null:post.data.requestDescription}
          childMessage={!post.data?null:post.data.childDescription}
          schoolLocation={!post.data?null:post.data.schoolLocation}
          schoolName={!post.data?null:post.data.schoolName}
        />
      ))}

    </div>
  );
}

export default Feed;

