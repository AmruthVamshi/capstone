import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { useState } from "react";
import axios from 'axios';
import qs from 'qs';
import {Modal} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeadmasterRegisterModel.css';
import swal from 'sweetalert';


function HeadmasterRegisterModel(props) {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');
  const [schoolID,setSchoolID] = useState('');

  const handleRegister = () => {
    let err=[];
    if(username.length < 7) err.push('username should be greater than 7 charecters');
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) err.push('enter a valid email id!');
    if(password.length < 7) err.push('password should be greater than 7 charecters');
    if(password!==rePassword) err.push("Passwords doesn't match");
    if(schoolID.length < 4) err.push('enter a valid schoolID');

    if(!err.length){
      var data = qs.stringify({
        'username': username,
        'email': email,
        'password': password,
        'schoolID': schoolID 
      });
      var config = {
        method: 'post',
        url: 'https://capstonebackend0.herokuapp.com/auth/donnie/signup',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        swal(JSON.stringify(response.data),'','success');
        props.onHide();
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      err.forEach( function(element, index) {
        swal(element,'','error');
      });
      err=[];
    }
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
          Register as headmaster...
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
        <input className='inputField' type='text' value={username} onChange={e=>{setUsername(e.target.value)}} placeholder='Enter your username'/><br/>
        <input className='inputField' type='text' value={email} onChange={e=>{setEmail(e.target.value)}} placeholder='Enter your email'/><br/>
        <input className='inputField' type='password' value={password} onChange={e=>{setPassword(e.target.value)}} placeholder='Enter your password'/><br/>
        <input className='inputField' type='password' value={rePassword} onChange={e=>{setRePassword(e.target.value)}} placeholder='Retype your password'/><br/>
        <input className='inputField' type='text' value={schoolID} onChange={e=>{setSchoolID(e.target.value)}} placeholder='Enter SchoolID'/><br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleRegister}>Register</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HeadmasterRegisterModel;