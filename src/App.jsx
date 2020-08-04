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

function App(props) {
  const { user } = props.context;
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
          <ProtectedRoute exact path="/profile/edit" component={FormEditProfile} />
          <ProtectedRoute exact path="/profile/:id" component={Profile} />
          <ProtectedRoute exact path="/:mode(home|profile)/:images?/:id?" component={ImagesCarousel} />
        </Switch>
      </main>
      {user && <BottomNavBar />}
    </React.Fragment>
  );
}

export default withUser(App);
