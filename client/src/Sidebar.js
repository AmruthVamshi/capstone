import React from "react";
import SidebarRow from "./SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import NoteIcon from "@material-ui/icons/Note";
import PeopleIcon from "@material-ui/icons/People";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import TvIcon from "@material-ui/icons/Tv";
import CellWifiIcon from "@material-ui/icons/CellWifi";
import ChatIcon from "@material-ui/icons/Chat";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [{ donor,headmaster }, dispatch] = useStateValue();
  let user;
  if(donor) user=donor;
  else user=headmaster;

  return (
    <div className="sidebar">
      <SidebarRow src={user.photoURL} title={user.displayName} />
      <SidebarRow
        Icon={LocalHospitalIcon}
        title="COVID-19 Information Center"
      />
      <SidebarRow Icon={NoteIcon} title="Guildelines for donations" />
      <SidebarRow Icon={PeopleIcon} title="Headmasters" />
      <SidebarRow Icon={SmartphoneIcon} title="Smartphones wanted" />
      <SidebarRow Icon={TvIcon} title="TVs wanted" />
      <SidebarRow Icon={CellWifiIcon} title="connections wanted" />
      <SidebarRow Icon={EmojiPeopleIcon} title="For Girls" />
      <SidebarRow Icon={ChatIcon} title="Messenges" />
      <SidebarRow Icon={StorefrontIcon} title="See Amazon" />
      <SidebarRow Icon={VideoLibraryIcon} title="Learn using the platform" />
    </div>
  );
}

export default Sidebar;
