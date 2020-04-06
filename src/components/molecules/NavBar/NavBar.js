import React from "react";

const NavBar = (props) => (
  <nav className="flex items-center justify-around text-white flex-wrap bg-teal-500 p-6">
    {props.children}
  </nav>
);

export default NavBar;
