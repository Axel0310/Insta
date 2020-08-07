import React from "react";
import { Switch, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import BottomNavBar from "./components/BottomNavBar";
import ImageForm from "./components/Forms/ImageForm";
import FormEditProfile from "./components/Forms/FormEditProfile";
import ImagesCarousel from "./pages/ImagesCarousel";
import { withUser } from "./components/Auth/withUser";
import Search from "./components/Search";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Notifications from "./pages/Notifications";

function App(props) {
  // const [displayMsg, setDisplayMsg] = React.useState(false);

  const { user } = props.context;

  // const Alert = (props) => {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setDisplayMsg(false);
  // };

  // const FeedbackMsg = () => (
  //   <Snackbar open={displayMsg} autoHideDuration={4000} onClose={handleClose}>
  //     <Alert onClose={handleClose} severity="success">
  //       This is a success message!
  //     </Alert>
  //   </Snackbar>
  // );

  // const handleDisplayMsg = () => {
  //   setDisplayMsg(true);
  // }

  return (
    <React.Fragment>
      {user && <Header />}
      <main id="content">
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/auth/signin" component={Signin} />
          <Route exact path="/auth/signup" component={Signup} />
          <ProtectedRoute
            exact
            path="/image/:mode(upload|edit)/:id?"
            component={ImageForm}
          />
          <ProtectedRoute
            exact
            path="/profile/edit"
            component={FormEditProfile}
          />
          <ProtectedRoute exact path="/profile/:id" component={Profile} />
          <ProtectedRoute
            exact
            path="/:mode(home|profile)/:images?/:id?"
            component={ImagesCarousel}
          />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/notifications" component={Notifications} />
        </Switch>
      </main>
      {user && <BottomNavBar />}
      {/* <FeedbackMsg /> */}
    </React.Fragment>
  );
}

export default withUser(App);
