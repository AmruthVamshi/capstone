import React from "react";
import SidebarRow from "./SidebarRow";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import TvIcon from "@material-ui/icons/Tv";
import CellWifiIcon from "@material-ui/icons/CellWifi";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FilterListIcon from '@material-ui/icons/FilterList';
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import './Sidebar.css';

function Sidebar() {
  const [{ donor,headmaster,search }, dispatch] = useStateValue();
  let user;
  if(donor) user=donor;
  else user=headmaster;

  return (
    <div className="sidebar">
      <SidebarRow src={user.photoURL} title={user.displayName} />
      <SidebarRow src={user.photoURL} title="Donation Categories" />
      <button className='filterButton' onClick={()=>{dispatch({type: actionTypes.SET_SEARCH,search:''});}}>
        <SidebarRow Icon={FilterListIcon} title="All Categories" />
      </button>
      <button className='filterButton' onClick={()=>{dispatch({type: actionTypes.SET_SEARCH,search:'phone'});}}>
        <SidebarRow Icon={SmartphoneIcon} title="Smartphones wanted" />
      </button>
      <button className='filterButton' onClick={()=>{dispatch({type: actionTypes.SET_SEARCH,search:'tv'});}}>
      <SidebarRow Icon={TvIcon} title="TVs wanted" />
      </button>
      <button className='filterButton' onClick={()=>{dispatch({type: actionTypes.SET_SEARCH,search:'connection'});}}>
      <SidebarRow Icon={CellWifiIcon} title="connections wanted" />
      </button>
      <button className='filterButton' onClick={()=>{dispatch({type: actionTypes.SET_SEARCH,search:'girl'});}}>
      <SidebarRow Icon={EmojiPeopleIcon} title="For Girls" />
      </button>
    </div>
  );
}

export default Sidebar;
