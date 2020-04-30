import React from "react";
import styled from "styled-components";

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const TextTitle = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  margin: 20px auto;
  color: ${({ theme }) => (theme === "LIGHT" ? "#2e2e2e" : "#fff")};
`;

const TextContent = styled.p`
  font-size: 16px;
  letter-spacing: 1.1px;
  line-height: 1.5;
  color: ${({ theme }) => (theme === "LIGHT" ? "black" : "white")};
`;

const TextWrapper = ({ theme, title, children }) => {
  return (
    <Wrapper>
      <TextTitle theme={theme}>{title}</TextTitle>
      <TextContent theme={theme}>{children}</TextContent>
    </Wrapper>
  );
};

export default TextWrapper;
