import React from "react";
import "./widget.css";
import SearchIcon from "@material-ui/icons/Search";
import { TwitterTweetEmbed } from "react-twitter-embed";

//========================================//
// main function
function Widget() {
  return (
    <div className="Widget">
      <form>
        <div className="widgets__input">
          <SearchIcon />
          <input type="text" placeholder="Search Twitter" />
        </div>
      </form>
      <div className="widgets__widgetContainer">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed tweetId={"858551177860055040"} />
      </div>
    </div>
  );
}

export default Widget;
