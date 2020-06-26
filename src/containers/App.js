import React from "react";
import { connect } from "react-redux";

import { setSearchField, requestRobots } from "../store/actions";

import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll.js";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";

import "./App.css";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filtered = robots.filter(
      (robot) =>
        robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchField.toLowerCase())
    );

    return isPending ? (
      <h1 className="f1 tc">Loading</h1>
    ) : (
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
