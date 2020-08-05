import React, { Component } from "react";

import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <form
        className="profile-form"
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      >
        <h2 className="form-title">Sign in</h2>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email" name="email"/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" name="password"/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button">Validate</button>
          </p>
        </div>
        <p>Don't have an account yet ? <Link to="/auth/signup">Sign up</Link> </p>
      </form>
    );
  }
}

export default withRouter(FormSignin);
