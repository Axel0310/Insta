import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "15px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  userCard: {
    display: "flex",
    alignItems: "center",
    marginTop: "5px",
    width: "100%",
    backgroundColor: "#fffef0",
    padding: "5px",
    fontSize: "1.7em",
    "& i": {
      fontSize: "0.8em",
    },
  },
  profilePicture: {
    width: "4em",
    maxWidth: "100px",
    marginRight: "10px",
    borderRadius: "50%",
  },
  msg: {
    alignSelf: "center",
    fontSize: "1.5em",
    fontWeight: "bolder",
  },
  loader: {
    alignSelf: "center",
  },
}));

export default function ChatLobby() {
  const classes = useStyles();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    apiHandler.getFriends().then((fetchedFriends) => {
      setFriends(fetchedFriends);
    });
  }, []);

  if (friends.length === 0) {
    return <p>Add friends to chat with them!</p>;
  }

  const displayOneFriend = (friend) => {
    return (
      <Link key={friend._id} to={`/chat/${friend._id}`}>
        <Paper elevation={3} className={classes.userCard}>
          <img
            src={friend.profilePicture}
            alt="Friend"
            className={classes.profilePicture}
          />
          <p>{friend.name}</p>
        </Paper>
      </Link>
    );
  };

  return (
    <div className={classes.container}>
      <p className={classes.msg}>Chat with your friends</p>
      {friends.map((friend) => displayOneFriend(friend))}
    </div>
  );
}
