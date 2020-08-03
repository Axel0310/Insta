import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // height: "7vh",
    backgroundColor: "rgb(132, 210, 255)",
    "& .title": {
      fontSize: "3em",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    "& .chat-link": {
        fontSize: "2.5em",
        position: "absolute",
        right: "2%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      },
    heightSizing:{
        height:"7vh"
    }
  },
});

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={classes.root}>
          <Toolbar>
            <h1 className="title">Awesome</h1>
            <Link to="/chat" className="chat-link">
              <i className="fas fa-paper-plane"></i>
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar/>
    </React.Fragment>
  );
}
