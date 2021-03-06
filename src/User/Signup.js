import React, { Component } from "react";
import { signup } from "../auth/index";

class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  };

  handleChange = (value, event) => {
    var obj = {};
    obj[value] = event.target.value;
    this.setState(obj);
  };

  clickSubmit = event => {
    event.preventDefault();
    var user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    signup(user).then(data => {
      if (data.message) {
        this.setState({ error: data.message });
      } else if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signup</h2>

        {!this.state.error ? (
          <div></div>
        ) : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        {!this.state.success ? (
          <div></div>
        ) : (
          <div className="alert alert-primary">You are successfully Signup</div>
        )}
        <form>
          <div className="form-group">
            <label className="test-muted">Name</label>
            <input
              type="text"
              onChange={this.handleChange.bind(this, "name")}
              className="form-control"
              value={this.state.name}
            />
          </div>
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

export default Signup;
