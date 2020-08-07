import React, { useState, useEffect } from "react";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    margin: "10px auto",
    fontSize: "2em",
    fontWeight: "bolder",
  },
  notifsContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notifWrapper: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: "5px",
    backgroundColor: "#fffef0",
  },
  imgMini: {
    width: "5em",
    maxWidth: "100px",
    margin: "5px 10px",
  },
  notifDesc: {
    fontWeight: "bold",
  },
});

function Notifications() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler.getNotifications().then((fetchedNotifications) => {
      setNotifications(fetchedNotifications);
      setLoading(false);
    });
  }, []);

  const compareDates = (date1, date2) => {
    if (date1 > date2) return -1;
    else if (date1 < date2) return 1;
    else return 0;
  };

  if (loading) return <CircularProgress />;
  return (
    <React.Fragment>
      <h2 className={classes.title}>Notifications</h2>
      <div className={classes.notifsContainer}>
        {notifications.length === 0 ? (
          <p>You have no notifications yet</p>
        ) : (
          notifications
            .sort((notif1, notif2) =>
              compareDates(notif1.createdAt, notif2.createdAt)
            )
            .map((notif) => (
              <Paper key={notif._id} className={classes.notifWrapper}>
                <img
                  src={notif.image.url}
                  alt="Notif"
                  className={classes.imgMini}
                />
                <p className={classes.notifDesc}>
                  {notif.user.name} {notif.event} your picture
                </p>
              </Paper>
            ))
        )}
      </div>
    </React.Fragment>
  );
}

export default withUser(Notifications);
