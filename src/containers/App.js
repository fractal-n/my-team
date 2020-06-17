import React from "react";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll.js";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";

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
    const { robots, searchTerm } = this.state;

    const filtered = robots.filter(
      (robot) =>
        robot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!robots.length) {
      return <h1 className="f1 tc">Loading</h1>;
    }

    return (
      <div className="tc">
        <h1 className="f1">My Team</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList items={filtered} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
