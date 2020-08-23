import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ListAltSharpIcon from "@material-ui/icons/ListAltSharp";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";

import "./sidebar.css";
function SideBar() {
  return (
    <div className="main__div">
      <div className="main__header">
        <TwitterIcon fontSize="large" />
      </div>
      <div className="main__links">
        <ul>
          <li className="active">
            <span>
              <HomeOutlinedIcon />
            </span>
            <div> Home</div>
          </li>
          <li>
            <span>
              <ExploreOutlinedIcon />
            </span>
            <div>Explore</div>
          </li>
          <li>
            <span>
              <NotificationsNoneOutlinedIcon />
            </span>
            <div>Notifications</div>
          </li>
          <li>
            <span>
              <EmailOutlinedIcon />
            </span>
            <div>Messages</div>
          </li>
          <li>
            <span>
              <TurnedInNotOutlinedIcon />
            </span>
            <div>Bookmarks</div>
          </li>
          <li>
            <span>
              <ListAltSharpIcon />
            </span>
            <div>Lists</div>
          </li>
          <li>
            <span>
              <PersonOutlineOutlinedIcon />
            </span>
            <div>Profile</div>
          </li>
          <li>
            <span>
              <ExpandMoreIcon />
            </span>
            <div>More</div>
          </li>
        </ul>
        <button className="tweet__button">Tweet</button>
      </div>
    </div>
  );
}

export default SideBar;
