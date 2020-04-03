import React, { Component } from "react";
import axios from "axios";

import Loading from "./Loading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errors: "",
      loading: false
    };
  }

  getUsers() {
    this.setState({ loading: true });
    axios
      .get("https://api.randomuser.me/?nat=US&results=5")
      .then(users => {
        this.setState({ users: users.data.results, loading: false });
      })
      .catch(err => {
        this.setState({ errors: err.message });
      });
  }

  componentWillMount() {
    this.getUsers();
  }

  render() {
    var displayUsers = this.state.users.map(person => {
      return <h3>{person.name.first}</h3>;
    });
    return (
      <div>
        <div className="App">We will be back</div>
        {this.state.loading ? <Loading></Loading> : displayUsers}
      </div>
    );
  }
}
export default App;
