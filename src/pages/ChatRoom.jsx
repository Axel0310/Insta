import React from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chatHeader: {
    backgroundColor: "grey",
    width: "100%",
    height: "40px",
  },
  chatWindow: {
    backgroundColor: "red",
    width: "100%",
    height: "calc(100vh - 188px)",
  },
}));

export default function ChatRoom() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.chatHeader}>Header</div>
      <div className={classes.chatWindow}></div>
      <div>
      <input type="text"/>
        <Button variant="contained" color="primary" endIcon={<SendIcon />}>
          Send
        </Button>
      </div>
    </>
  );
}
