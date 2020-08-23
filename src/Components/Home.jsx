import React, { useState, useEffect } from "react";
import { Avatar, Input, Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./home.css";
import Post from "./Post";
import { db, auth } from "../firebase";
import firebase from "firebase";
import TwitterIcon from "@material-ui/icons/Twitter";
import PersonIcon from "@material-ui/icons/Person";

function Home() {
  const [Tweet, setTweet] = useState("");
  const [Posts, setPosts] = useState([]);
  const [TweetImage, setTweetImage] = useState("");

  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [OpenSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });
    return () => {
      // perform some clean up actions before refiring the useEffect
      unsubscribe();
    };
  }, [user, username]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  }));

  const classes = useStyles();
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
      );
  }, []);
  const SendTweet = (e) => {
    e.preventDefault();
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: user.displayName.split("|")[0],
      username: user.displayName.split("|")[1],
      verified: true,
      text: Tweet,
      image: TweetImage,
      avatar:
        "https://cdn.vox-cdn.com/thumbor/TbscUHQDRx0eeh4QZljIwkf2qaY=/0x86:706x557/1400x1050/filters:focal(0x86:706x557):format(png)/cdn.vox-cdn.com/imported_assets/847184/stevejobs.png",
    });
    setTweet("");
    setTweetImage("");
  };

  const SignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setOpenSignIn(false);
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const SignUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          // https://stackoverflow.com/questions/47300716/how-to-add-extra-fields-to-firebase-auth-age-gender
          displayName: displayname + "|" + username,
        });
      })
      .catch((err) => alert(err.message));
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  return (
    <div className="home__component">
      {user ? (
        <div className="home__header">
          <h3>Home</h3>
          <form>
            <div className="message__container">
              {/* avatar  */}
              <Avatar
                className="avatar"
                alt="Remy Sharp"
                src="/broken-image.jpg"
              >
                <PersonIcon />
              </Avatar>
              {/* input  */}
              <Input
                value={Tweet}
                onChange={(e) => setTweet(e.target.value)}
                placeholder="What's Happening ?"
              />
              {/* {console.log(Tweet)} */}
            </div>
            {/* tweet button  */}
            <div className="send__div">
              <input
                className="image__input"
                type="text"
                value={TweetImage}
                onChange={(e) => {
                  setTweetImage(e.target.value);
                }}
                placeholder="Optional: Enter Image URL."
              />
              {Tweet ? (
                <button onClick={SendTweet} className="main__tweet__button">
                  Tweet
                </button>
              ) : (
                <button
                  disabled
                  onClick={SendTweet}
                  className="main__tweet__button__disabled"
                >
                  Tweet
                </button>
              )}
            </div>
            <button className="signIn__button" onClick={() => auth.signOut()}>
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div className="signIn__message">
          <h2>Twitter!</h2>
          <p>Sign In to Tweet</p>
          <button className="signIn__button" onClick={() => setOpen(true)}>
            Sign In
          </button>
        </div>
      )}

      {/* logic for rendering all the posts  */}
      <div className="post__section">
        {Posts.map(({ id, post }) => (
          <Post
            username={post.username}
            displayName={post.displayName}
            avatar={post.avatar}
            text={post.text}
            verified={post.verified}
            image={post.image}
            postId={id}
            currentUser={user}
          />
        ))}
      </div>

      {/* signup modal  */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <TwitterIcon fontSize="large" />
          <form style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter Your username"
            />
            <Input
              type="text"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              placeholder="Full Name"
            />
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
            <Input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Set a Password"
            />
            <div className="modal__buttons" style={{ marginTop: "10px" }}>
              <Button
                onClick={() => setOpenSignIn(true)}
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
              <Button onClick={SignUp} variant="contained" color="primary">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/*  sign in modal */}
      <Modal open={OpenSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <TwitterIcon fontSize="large" />
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Your Password"
          />
          <Button onClick={SignIn} variant="contained" color="primary">
            Sign In
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export default Home;
