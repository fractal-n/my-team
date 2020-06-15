import React from "react";
import "./App.css";
import Scroll from "./components/Scroll.js";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchTerm: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const filtered = this.state.robots.filter(
      (robot) =>
        robot.name
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()) ||
        robot.email.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    if (this.state.robots.length === 0) {
      return <h1 className="f1 tc">Loading</h1>;
    }

    return (
      <div className="tc">
        <h1 className="f1">My Team</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList items={filtered} />
        </Scroll>
      </div>
    );
  }
}

export default App;
