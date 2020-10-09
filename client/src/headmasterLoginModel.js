import React from "react";
import "./Login.css";
import Helpinghands from "./Helpinghands.png";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import {Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

function HeadmasterLoginModel(props) {
  const [state, dispatch] = useStateValue();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const cookies = new Cookies();

  const handleLogin = ()=>{
  	if(!email) {alert('enter your email');return}
  	var data = qs.stringify({
	 'email': email,
	 'password': password 
	});
	var config = {
	  method: 'post',
	  url: 'https://capstonebackend0.herokuapp.com/auth/donnie/signin',
	  headers: { 
	    'Content-Type': 'application/x-www-form-urlencoded'
	  },
	  data : data
	};
	axios(config)
	.then(function (response) {
		if(response.status===200){
			if(response.data.auth==true){
				cookies.set('logintoken',response.data.accessToken,{path:'/'});
				jwt.verify(response.data.accessToken, 'helpastudentsecret', (err, decoded) => {
				    if (err) alert(err);
				    dispatch({
			          type: actionTypes.SET_HEADMASTER,
			          headmaster: decoded,
			        });
				});
				props.onHide();
				//window.location.reload();
			}
			else
			alert(response.data.reason);
		}else{
			alert('some error occured! try again!.');
		}
	})
	.catch(function (error) {
	  console.log(error);
	});
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login as Headmaster
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
        <input className='inputField' type='text' value={email} onChange={e=>{setEmail(e.target.value)}} placeholder='Enter your email'/><br/>
        <input className='inputField' type='password' value={password} onChange={e=>{setPassword(e.target.value)}} placeholder='Enter your password'/><br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleLogin}>Login</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HeadmasterLoginModel;