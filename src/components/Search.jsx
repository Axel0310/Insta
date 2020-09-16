import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import apiHandler from "../api/apiHandler";
import { withUser } from "./Auth/withUser";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  searchComponent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    "& .MuiGrid-container": {
      width: "auto",
      alignItems: "center"
    },
  },
  resultDisplay: {
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
        fontSize: "0.8em"
    }
  },
  profilePicture: {
    width: "4em",
    maxWidth: "100px",
    marginRight: "10px",
    borderRadius: "50%"
  },
  msg:{
      alignSelf: "center",
      fontSize: "1.5em",
      fontWeight: "bolder",
  },
  loader: {
      alignSelf: "center"
  }
}));

function Search({ context }) {
  const classes = useStyles();

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search !== "") {
        setLoading(true)
      apiHandler.searchUser(search).then((fetchedUsers) => {
        setResult(fetchedUsers);
        setLoading(false);
      });
    }
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const userCard = (user) => {
    return (
      <Link key={user._id} to={`/profile/${user._id}`}>
        <Paper elevation={3} className={classes.userCard}>
          <img
            src={user.profilePicture}
            alt="User"
            className={classes.profilePicture}
          />
          <p>
            <b>{user.name}</b>{" "}
            {context.user.subscriptions.includes(user._id) ? (
              <i> • Followed</i>
            ) : undefined}
          </p>
        </Paper>
      </Link>
    );
  };

  const noMatchMsg = <p className={classes.msg}>No profile matches your search</p>

  return (
    <div className={classes.searchComponent}>
      <Grid container alignItems="flex-end">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Search for a profile"
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      <section className={classes.resultDisplay}>
        {loading ? <CircularProgress className={classes.loader}/> : search === ""
          ? undefined
          : result.length === 0
          ? noMatchMsg
          : result.map((user) => userCard(user))}
      </section>
    </div>
  );
}

export default withUser(Search);
