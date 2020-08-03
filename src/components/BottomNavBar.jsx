import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Avatar from '@material-ui/core/Avatar';
import { withUser } from "../components/Auth/withUser";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    "& .MuiBottomNavigationAction-root":{
      minWidth: 60
    }
  },
  profilePic: {
    borderRadius: "50%",
    width: "2em",
  },
});

function LabelBottomNavigation(props) {
  const { user } = props.context;
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={
          <Link to="/home">
            <HomeIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Upload"
        value="upload"
        icon={
          <Link to="/image/upload">
            <AddBoxIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<Link to={`/profile/${user._id}`}><Avatar alt="Profil" src={user.profilePicture}/></Link>}
      />
    </BottomNavigation>
  );
}

export default withUser(LabelBottomNavigation);
