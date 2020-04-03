import React, { Component } from "react";
class Signin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    success: false,
    redirectToReferer: false
  };

  handleChange = (value, event) => {
    var obj = {};
    obj[value] = event.target.value;
    this.setState(obj);
  };

  authenticate(jwt, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  }

  clickSubmit = event => {
    event.preventDefault();
    var user = {
      email: this.state.email,
      password: this.state.password
    };
    this.signup(user).then(data => {
      if (data.message) {
        this.setState({ error: data.message });
      } else if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  signup = user => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>

        {!this.state.error ? (
          <div></div>
        ) : (
          <div className="alert alert-danger">{this.state.error}</div>
        )}
        {!this.state.success ? (
          <div></div>
        ) : (
          <div className="alert alert-primary">You are successfully Login</div>
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
