import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  padding: 10px;
  margin: 10px auto;
  border-radius: 10px;
  border: solid 2px ${({ theme }) => (theme === "LIGHT" ? "#2e2e2e" : "#fff")};
  color: ${({ theme }) => (theme === "LIGHT" ? "#2e2e2e" : "#fff")};
`;

const PeriodItem = ({ theme, name, period }) => {
  return (
    <Wrapper theme={theme}>
      <p>{name}</p>
      <p>Co {period} dni</p>
    </Wrapper>
  );
};

export default PeriodItem;
