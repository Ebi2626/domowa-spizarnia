import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  position: relative;
  bottom: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: 16px;
  text-transform: uppercase;
  color: white;
  transition: all 0.3s ease-in-out;
  & > a {
    margin-left: 10px;
    color: #2e2e2e;
    &:hover {
      color: white;
    }
  }
`;

const Footer = () => (
  <StyledFooter className="bg-teal-500">
    Created with passion to code by{" "}
    <a href="https://linkedin.com/in/edwin-harmata"> Edwin</a>.
  </StyledFooter>
);

export default Footer;
