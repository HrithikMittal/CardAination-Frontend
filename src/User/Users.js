import React, { Component } from "react";
import { list } from "./apiUser";

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  render() {
    if (this.state.users) {
      return this.state.users.map(user => {
        return (
          <div className="container">
            <div className="card col-md-4">
              <div className="row">
                <div>
                  <p>{user.name}</p>
                  <p>{user.email} </p>
                  {/* <p>{user.created.toDateString()}</p> */}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
      </div>
    );
  }
}

export default Users;
