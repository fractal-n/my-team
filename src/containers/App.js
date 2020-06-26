import React from "react";
import { connect } from "react-redux";

import { setSearchField } from "../actions";

import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll.js";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";

import "./App.css";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  };
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      robots: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;

    const filtered = robots.filter(
      (robot) =>
        robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchField.toLowerCase())
    );

    if (!robots.length) {
      return <h1 className="f1 tc">Loading</h1>;
    }

    return (
      <div className="tc">
        <h1 className="f1">My Team</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList items={filtered} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
