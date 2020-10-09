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
import {Modal} from 'react-bootstrap';
import HeadmasterLoginModel from './headmasterLoginModel';
import HeadmasterRegisterModel from './HeadmasterRegisterModel';

function Login() {
  const [state, dispatch] = useStateValue();
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

  useEffect(() => {
    fetch(`https://capstonebackend0.herokuapp.com/sucess`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate donor");
      })
      .then(responseJson => {
        console.log(responseJson.user);
        dispatch({
          type: actionTypes.SET_DONOR,
          donor: responseJson.user,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if(state.donor) return <Redirect to='/'/>

  const handleSignInClickGoogle = () => {
    window.open(`https://capstonebackend0.herokuapp.com/auth/google`, `_self`);
  };

  const handleSignInClickFacebook = () => {
    window.open(`https://capstonebackend0.herokuapp.com/auth/facebook`, `_self`);
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={Helpinghands} alt="" />
        <h2 id="t1">Welcome to Help a Student</h2>
      </div>
      <Button type="submit" onClick={handleSignInClickGoogle} >Sign In as Donor via Google</Button>
      <Button type="submit" onClick={handleSignInClickFacebook} >Sign In as Donor via Facebook</Button>
      
      <Button variant="primary" onClick={() => setModalShow1(true)}>
        Sign in as Headmaster
      </Button>

      <Button variant="primary" onClick={() => setModalShow2(true)}>
        Register as Headmaster
      </Button>

      <HeadmasterLoginModel
        show={modalShow1}
        onHide={() => setModalShow1(false)}
      />

      <HeadmasterRegisterModel
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />

      </div>
  );
}

export default Login;
