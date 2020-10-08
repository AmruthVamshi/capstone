import React from "react";
import "./Login.css";
import Helpinghands from "./Helpinghands.png";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useState, useEffect } from "react";
import axios from 'axios';

function Login() {
  const [state, dispatch] = useStateValue();
  /*
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        //console.log(result);
      })
      .catch((error) => alert(error.message));
  };*/
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
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        console.log(responseJson.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: responseJson.user,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open(`https://capstonebackend0.herokuapp.com/auth/google`, `_self`);
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={Helpinghands} alt="" />
        <h2 id="t1">Welcome to Help a Student</h2>
      </div>
      <Button type="submit">Sign In as Donor</Button>
      <Button type="submit" onClick={handleSignInClick}>
        {" "}
        Sign In as Head Master
      </Button>
    </div>
  );
}

export default Login;
