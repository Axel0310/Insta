import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import ProfilActions from "../components/ProfileActions";
import { withUser } from "../components/Auth/withUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = ({context, match, history}) => {
  const [profileUser, setProfileUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const connectedUser = context.user;

  useEffect(() => {
    apiHandler.getUser(match.params.id).then((fetchedUser) => {
      setProfileUser(fetchedUser);
      setIsLoading(false);
    });
  }, [match]);

  const handleFollow = async () => {
    const { updatedConnectedUser, updatedProfileUser} = await apiHandler.updateSubs(connectedUser._id, profileUser._id);
    setProfileUser(updatedProfileUser);
    context.setUser(updatedConnectedUser);
  };

  const handleSignOut = () => {
    apiHandler.logout()
    .then( res => {
      context.removeUser();
      history.push("/");
    })
    .catch( error => {
      console.log(error)
    })
  }

  if (isLoading) return <CircularProgress />;
  return (
    <React.Fragment>
      <section className="user-info">
        <div className="user-info-header">
          <img
            src={profileUser.profilePicture}
            alt="Profile"
            className="user-picture"
          />
          <div className="info-wrapper">
            <h2 className="user-name">{profileUser.name}</h2>
            <div className="user-figures">
              <p className="figure">
                <span>{profileUser.images.length}</span>{" "}
                <span> publications</span>
              </p>
              <p className="figure">
                <span>{profileUser.followers.length}</span>
                <span> followers</span>
              </p>
              <p className="figure">
                <span>{profileUser.subscriptions.length}</span>
                <span> subscriptions</span>
              </p>
            </div>
          </div>
        </div>
        <p className="user-description">{profileUser.description}</p>
        <ProfilActions profileUser={profileUser} clbkFollow={handleFollow} clbkSignOut={handleSignOut}/>
      </section>
      <section className="user-images">
        {profileUser.images.map((image) => (
          <Link to={`/profile/images/${match.params.id}`} key={image._id}>
          <img src={image.url} alt="Publication" className="publication" />
          </Link>
        ))}
      </section>
    </React.Fragment>
  );
};

export default withUser(Profile);
