import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from "../components/Auth/withUser";

const useStyles = makeStyles({
  fixedBottom: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  profilePic: {
    borderRadius: "50%",
    width: "1em"
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
      className={classes.fixedBottom}
    >
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        label="Upload"
        value="upload"
        icon={<AddBoxIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={user ? <img src={user.profilePicture}/> : <PersonIcon />}
        className={classes.profilePic}
      />
    </BottomNavigation>
  );
}

export default withUser(LabelBottomNavigation);
