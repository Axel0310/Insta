import React from "react";
import UserContext from "./UserContext";

// This is what we call a HOC (Higher Order Component).
// It takes a component as a parameter and it returns a component.
// This technique can be used to abstract some logic in order to pass
// some data down as props to the component sent as parameter.

// The use case of this one is to make it easy to access the user context to
// any component in our app.

/* ******************************************************** */

//  How to use:  =>
// YourComponent.jsx
// import React from "react"
// function or class YourComponent()
//
// ... your implementation.
//
// export default withUser(YourComponent)
// ----------------^ your component now has access to the user context defined in UserProvider.jsx.

export const withUser = (ComponentToPassUserContextTo) => {
  // const user = {
  //   _id: "5f22dd401e71f82833a65c0f",
  //   profilePicture:
  //     "https://res.cloudinary.com/direuudpy/image/upload/v1596033402/insta/profile_picture_default_tzqyoh.jpg",
  //   email: "axel@gmail.com",
  //   name: "Axel",
  // };
  return function (props) {
    return (
      <UserContext.Consumer>
        {(context) => (
          <ComponentToPassUserContextTo {...props} context={context} />
        )}
      </UserContext.Consumer>
    );
  };
};
