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
      .then(res => {
        var exusers = this.state.users;
        var totalusers = exusers.concat(res.data.results);
        this.setState({ users: totalusers, loading: false });
      })
      .catch(err => {
        this.setState({ errors: err.message });
      });
  }

  componentWillMount() {
    this.getUsers();
  }

  loadMoreUsers = () => {
    this.getUsers();
  };

  render() {
    var displayUsers = this.state.users.map(person => {
      return <h3 key={person.cell}>{person.name.first}</h3>;
    });
    return (
      <div>
        <button onClick={this.loadMoreUsers.bind(this, "Hey")}>
          Click Me to Load More
        </button>
        {this.state.loading ? <Loading /> : displayUsers}
      </div>
    );
  }
}
export default App;
