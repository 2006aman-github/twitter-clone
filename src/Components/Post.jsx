import React, { useState, useEffect } from "react";
import "./post.css";
import { Avatar, Input, Button, Modal, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import PublishIcon from "@material-ui/icons/Publish";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { db } from "../firebase";
import firebase from "firebase";
import PersonIcon from "@material-ui/icons/Person";
// import "bootstrap/dist/css/bootstrap.min.css";
// ============================ import ======================= //

function Post({
  username,
  displayName,
  avatar,
  text,
  image,
  postId,
  currentUser,
}) {
  const [OpenCommentBox, setOpenCommentBox] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [reply, setReply] = useState("");
  const [comments, setComments] = useState([]);
  const [comment__length, setComment__length] = useState([]);
  // const [likes, setLikes] = useState(0);
  // const [usersLiked, setUsersLiked] = useState([]);

  // db.collection("posts")
  //   .doc(postId)
  //   .collection("likedusers")
  //   .onSnapshot((snap) => {
  //     setUsersLiked(snap.docs.map((doc) => doc.data()));
  //   });
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      // perform some clean up actions before refiring the useEffect
      unsubscribe();
    };
  }, [postId]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "15px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  }));

  useEffect(() => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((snap) => setComment__length(snap.docs.length));
  }, []);

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const PostReply = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        comment: reply,
        user: currentUser.displayName.split("|")[0],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setReply("");
  };

  const classes = useStyles();
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar className="profile__pic" alt="Remy Sharp">
          <PersonIcon />
        </Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <h3>{displayName}</h3>
          <i>
            <VerifiedUserIcon fontSize="small" className="post__badge" />
          </i>
          <span>{username}</span>
        </div>
        <div className="post__text">{text}</div>
        <div className="post__img">
          <img src={image} alt="" />
        </div>
        <div className="post__footer">
          <span
            onClick={() => {
              currentUser ? setOpenCommentBox(true) : alert("Please Login...");
            }}
            className="reply__span"
          >
            <ChatBubbleOutlineIcon className="reply__button" />
            {comment__length}
          </span>
          <span className="retweet__span">
            <RepeatIcon className="retweet__button" />
          </span>
          <span className="like__span">
            <FavoriteBorderIcon className="like__button" />
          </span>
          <span>
            <PublishIcon />
          </span>
        </div>
      </div>
      <Modal open={OpenCommentBox} onClose={() => setOpenCommentBox(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div
            className="replies"
            style={{
              overflow: "auto",
              height: "350px",
              width: "100%",
              margin: "0",
            }}
          >
            <ul>
              {comments.map((comment) => (
                <li
                  style={{
                    listStyle: "none",
                    margin: "15px 0px",
                    border: "none",
                    backgroundColor: "lightgray",
                    padding: "6px",
                  }}
                >
                  <b style={{ marginRight: "15px", fontSize: "large" }}>
                    {comment.user}:-
                  </b>
                  <span style={{ fontStyle: "capitalize" }}>
                    {comment.comment}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Reply Here"
            />
            <Button
              onClick={PostReply}
              style={{ marginTop: "15px" }}
              variant="contained"
              color="secondary"
            >
              Reply
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Post;
