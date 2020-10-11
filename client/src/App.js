import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';
import { actionTypes } from "./reducer";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
          <Route
            exact path="/login"
            component = {Login}
          />
          <Route exact path='/' component={Home} />
        </BrowserRouter>
    </div>
  );
}

function Home(){
  const [{ donor,headmaster }, dispatch] = useStateValue();
  const cookies = new Cookies();
  if(!headmaster){
    let token = cookies.get('logintoken');
    if(token){
      jwt.verify(token, 'helpastudentsecret', (err, decoded) => {
            if (err) alert(err);
            dispatch({
                type: actionTypes.SET_HEADMASTER,
                headmaster: decoded,
              });
        });
    }
  }
  if(headmaster) return (
          <div>
          <Header/>
            <div className="app__body">
              <Sidebar />
              <Feed headmaster={true}/>
            </div>
          </div>
        ) 
  return (
    !donor ? (
        <Login/>
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed headmaster={false}/>
          </div>
        </>
      )
    )
}

export default App;


/*

 */