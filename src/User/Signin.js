import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth/index";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferer: false
  };

  handleChange = (value, event) => {
    var obj = {};
    obj[value] = event.target.value;
    this.setState(obj);
  };

  clickSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });
    var user = {
      email: this.state.email,
      password: this.state.password
    };
    signin(user).then(data => {
      this.setState({ loading: false });
      if (data.message) {
        this.setState({ error: data.message });
      } else if (data.error) {
        this.setState({ error: data.error });
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="container">
          <h2 className="mt-5 mb-5">Loading...</h2>
        </div>
      );
    }
    if (this.state.redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>

        {!this.state.error ? (
          <div></div>
        ) : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        <form>
          <div className="form-group">
            <label className="test-muted">Email</label>
            <input
              type="email"
              onChange={this.handleChange.bind(this, "email")}
              className="form-control"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label className="test-muted">Password</label>
            <input
              type="password"
              onChange={this.handleChange.bind(this, "password")}
              className="form-control"
              value={this.state.password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
