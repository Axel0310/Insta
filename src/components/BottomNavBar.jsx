import React, {useEffect} from "react";
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
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgb(132, 210, 255)",
    "& .MuiBottomNavigationAction-root":{
      color: "white",
      minWidth: 40,
    },
    "& a:hover": {
      color: "white",
    },
  },
  profilePic: {
    borderRadius: "50%",
    width: "1.5em",
    height: "1.5em"
  },
});

function LabelBottomNavigation({context, location}) {
  const { user } = context;
  const {pathname} = location;
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect( () => {
    if(pathname === "/home"){
      setValue("home");
    } else if(pathname === "/search"){
      setValue("search");
    }else if(pathname === "/image/upload"){
      setValue("upload");
    }else if(pathname === "/notifications"){
      setValue("activities");
    }else if(pathname === `/profile/${user._id}` || pathname === `/profile/edit`){
      setValue("profile");
    } else {
      setValue("");
    }
  }, [pathname])

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
        label="Activities"
        value="activities"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<Link to={`/profile/${user._id}`}><Avatar alt="Profil" src={user.profilePicture} className={classes.profilePic}/></Link>}
      />
    </BottomNavigation>
  );
}

export default withRouter(withUser(LabelBottomNavigation));
