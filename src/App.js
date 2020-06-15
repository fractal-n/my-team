import React from "react";
import CardList from "./components/CardList";
import SearchBox from "./components/SearchBox";
import { robots } from "./store/robots";

const App = () => {
  return (
    <div className="tc">
      <h1>My Team</h1>
      <SearchBox />
      <CardList items={robots} />
    </div>
  );
};

export default App;
