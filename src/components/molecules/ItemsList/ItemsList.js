import React from "react";
import PropTypes from "prop-types";

const ItemsList = ({ children }) => (
  <div
    className="container flex-col flex items-center mx-auto p-4 mb-6"
    style={{ minHeight: "calc((100vh - 588px) - 1.5rem)" }}
  >
    {children}
  </div>
);

ItemsList.propTypes = {
  children: PropTypes.array,
};

export default ItemsList;
