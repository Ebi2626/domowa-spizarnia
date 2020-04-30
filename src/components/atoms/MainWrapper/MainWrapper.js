import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 460px);
  background-color: ${({ theme }) => (theme === "LIGHT" ? "#fff" : "#234")};
`;

const MainWrapper = ({ theme, children }) => {
  return <Wrapper theme={theme}>{children}</Wrapper>;
};

export default MainWrapper;
