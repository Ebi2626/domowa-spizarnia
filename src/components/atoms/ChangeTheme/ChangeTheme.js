import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin: 20px auto;
  width: 120px;
  height: 60px;
  border-radius: 15px;
  background-color: white;
  border: solid 2px #2e2e2e;
  &:before {
    content: "Jasny";
    position: absolute;
    display: block;
    left: -10px;
    top: -30px;
    color: ${({ theme }) => (theme === "LIGHT" ? "#000" : "#fff")};
  }
  &:after {
    content: "Ciemny";
    position: absolute;
    display: block;
    right: -10px;
    top: -30px;
    color: ${({ theme }) => (theme === "LIGHT" ? "#000" : "#fff")};
  }
`;
const lightProperties = `background-color: #234;
transform: translateX(0%);
border-radius: 10px 0 0 10px;`;
const darkProperties = `background-color: #234;
transform: translateX(98%);
border-radius: 0 10px 10px 0;`;

const Button = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: white;
  &::before {
    content: "";
    left: 3px;
    top: 3px;
    position: absolute;
    height: calc(100% - 6px);
    width: calc(50% - 3px);
    transition: all 0.3s ease-in-out;
    ${({ theme }) => (theme === "LIGHT" ? lightProperties : darkProperties)}
  }
`;

const ChangeTheme = ({ theme, fn }) => (
  <Wrapper>
    <Header title="MOTYW" theme={theme} />
    <ButtonWrapper theme={theme}>
      <Button theme={theme} onClick={() => fn()}></Button>
    </ButtonWrapper>
  </Wrapper>
);

export default ChangeTheme;
