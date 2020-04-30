import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Thinker from "./Thinker";

const StyledList = styled.div`
  display: flex;
  flex-direction: row;
  width: 800px;
  margin: 20px auto;
  max-width: 90vw;
  align-items: center;
  @media all and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const Image = styled.div`
  width: 600px;
  max-width: 60vw;
  height: auto;
`;

const StyledText = styled.p`
  font-size: 18px;
  color: ${({ theme }) => (theme === "LIGHT" ? "#333" : "#eee")};
  text-align: center;
  margin-bottom: 30px;
`;

const EmptyListInfo = ({ text, theme }) => {
  return (
    <StyledList>
      <Image>
        <Thinker theme={theme}></Thinker>
      </Image>
      <StyledText theme={theme}>{text}</StyledText>
    </StyledList>
  );
};

EmptyListInfo.propTypes = {
  text: PropTypes.string, // Text to display when there is no content to display
};

export default EmptyListInfo;
