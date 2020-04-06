import React from "react";
import styled from "styled-components";

const Line = styled.span`
  display: block;
  position: relative;
  background: gray;
  margin-bottom: 4px;
  width: 40px;
  height: 4px;
  border-radius: 15px;
  transition: all 0.3s ease-in-out;
`;
const Hamburger = styled.div`
  padding-top: 8px;
  position: absolute;
  width: 40px;
  height: 40px;
  left: -48px;
  top: 5px;
  &:hover > * {
    background: black;
  }
`;

const EditItem = (props) => {
  return (
    <Hamburger
      onClick={() => {
        console.log(`W Editing ${props.num}`);
        props.togglePopup(props, props.num);
      }}
    >
      <Line></Line>
      <Line></Line>
      <Line></Line>
    </Hamburger>
  );
};

export default EditItem;
