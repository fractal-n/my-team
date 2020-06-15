import React from "react";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import { robots } from "./store/robots";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots,
      searchTerm: "",
    };
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

    return (
      <div className="tc">
        <h1>My Team</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList items={filtered} />
      </div>
    );
  }
}

export default App;
