import React from "react";

const ItemsList = (props) => (
  <div className="container flex-col flex items-center mx-auto p-4">
    {props.children}
  </div>
);

export default ItemsList;
