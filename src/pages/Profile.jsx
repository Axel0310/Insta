import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import ProfilActions from "../components/ProfileActions";
import { withUser } from "../components/Auth/withUser";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../styles/profile.css";

const Profile = (props) => {
  const [profileUser, setProfileUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const connectedUser = props.context.user;

  useEffect(() => {
    apiHandler.getUser(props.match.params.id).then((fetchedUser) => {
      setProfileUser(fetchedUser);
      setIsLoading(false);
    });
  }, []);

  const handleFollow = async () => {
    const { updatedConnectedUser, updatedProfileUser} = await apiHandler.updateSubs(connectedUser._id, profileUser._id);
    setProfileUser(updatedProfileUser);
    props.context.setUser(updatedConnectedUser);
  };

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
        <ProfilActions profileUser={profileUser} clbkFollow={handleFollow} />
      </section>
      <section className="user-images">
        {profileUser.images.map((image) => (
          <img key={image._id} src={image.url} alt="Publication" className="publication" />
        ))}
      </section>
    </React.Fragment>
  );
};

export default withUser(Profile);
