import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const background = process.env.PUBLIC_URL + "background.jpg";

const StyledHeader = styled.div`
  position: relative;
  width: ${({ main }) => (main ? "100%" : "auto")};
  height: ${({ main }) => (main ? `400px` : "auto")};
  background-image: ${({ main }) => (main ? `url(${background})` : null)};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:after {
    content: "";
    display: ${({ main }) => (main ? `block` : `none`)};
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    overflow: hidden;
    height: 400px;
    z-index: 1;
  }
`;

export default function Header({ main, title, theme }) {
  let classString = "text-2xl";
  if (!main) {
    if (theme) {
      classString =
        theme === "LIGHT" ? "text-2xl text-black" : "text-2xl text-white";
    }
  }
  return (
    <StyledHeader main={main}>
      <h1
        className={`${
          main ? "text-4xl font-bold text-white z-10 uppercase" : classString
        } text-center p-4`}
      >
        {title}
      </h1>
    </StyledHeader>
  );
}

Header.propTypes = {
  main: PropTypes.bool, // information is it a main header
  title: PropTypes.string, // content of component
};
