import React from "react";
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

function Header() {
  const [{ user }, dispatch] = useStateValue();
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

        <div className="header__option">
          <ExitToAppIcon />
          <h5>Login/Signup</h5>
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
          <NotificationsActiveIcon />
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
