import React from "react";
import Button from "@material-ui/core/Button";
import { withUser } from "../components/Auth/withUser";
import { Link } from "react-router-dom";
//css is included in profile.css

function ProfileActions({ profileUser, context, clbkFollow }) {

  const connectedUser = context.user;
  // console.log(connectedUser)
  const isFollowed = connectedUser.subscriptions.includes(profileUser._id)

  // const isFollowed = profileUser.followers.includes(connectedUser._id)

  const handleClick = () => {
    clbkFollow();
  };

  const connectedUserBtns = (
    <React.Fragment>
      <Link to="/profile/edit">
        <Button variant="contained" color="primary">
          Edit profile
        </Button>
      </Link>
      <Link to="/signout">
        <Button variant="outlined" color="primary">
          Sign out
        </Button>
      </Link>
    </React.Fragment>
  );

  const followBtn = (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );

  return (
    <div className="user-actions">
      {profileUser._id === connectedUser._id ? connectedUserBtns : followBtn}
    </div>
  );
}

export default withUser(ProfileActions);
