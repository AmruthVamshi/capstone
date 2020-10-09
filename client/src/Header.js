import React,{Fragment} from "react";
import "./Header.css";
import Helpinghands from "./Helpinghands.png";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import { Avatar, IconButton } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';

function Header(props) {
  const [{ donor,headmaster }, dispatch] = useStateValue();
  let user;
  if(donor) user=donor;
  else user=headmaster;

  const logout = ()=> {
    if(headmaster){
      const cookies = new Cookies();
      cookies.remove('logintoken');
      dispatch({
        type: actionTypes.LOGOUT,
      });
      user=null;
    }else{
      fetch(`https://capstonebackend0.herokuapp.com/auth/logout`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200){
          dispatch({
            type: actionTypes.LOGOUT,
          });
          user=null;
        }
        throw new Error("failed to logout!");
      })
      .catch(error => {
        console.log(error);
      });
    }

      if(!user) {
        return <Redirect to='/login'/>
      }
  }

  return (
    <div className="header">
      <div className="header__left">
        <img src={Helpinghands} alt="" />
        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search Help a student" type="text" />
        </div>
      </div>
      <div className="header__middle">
        <div className="header__option header__option--active">
          <HomeIcon />
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar src={user.profile_pic} />
          <h4>{user.username}</h4>
        </div>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <ForumIcon />
        </IconButton>
        <IconButton>
          <button style={{position:'relative',border:"none",backgroundColor:"transparent",height:'26px',top:"-5"}} onClick={logout}>
          <ExitToAppIcon />
          <h5>Logout</h5>
          </button>
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;

//<div className="header__option">
//<ExitToAppIcon />
//<h5>Login/Signup</h5>
//</div>;
