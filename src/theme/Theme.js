import React from "react";
import { ThemeProvider } from "styled-components";

const Theme = (props) => {
  return (
    <ThemeProvider theme={props.theme ? props.theme : { color: "LIGHT" }}>
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;
