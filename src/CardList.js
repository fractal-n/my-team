import React from "react";
import Card from "./Card";

const CardList = ({ items }) => {
  return (
    <div>
      {items.map((user) => {
        return (
          <Card
            key={user.id}
            name={user.name}
            email={user.email}
            username={user.username}
          />
        );
      })}
    </div>
  );
};

export default CardList;
