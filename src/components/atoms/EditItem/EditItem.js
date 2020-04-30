import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Line = styled.span`
  display: block;
  position: relative;
  background: gray;
  margin-bottom: 4px;
  width: 40px;
  height: 4px;
  border-radius: 15px;
  transition: all 0.2s linear;
`;
const Hamburger = styled.div`
  padding-top: 8px;
  position: absolute;
  width: 40px;
  height: 40px;
  left: -48px;
  top: 5px;
  &:hover {
    cursor: pointer;
  }
  &:hover > * {
    background: teal;
  }
`;

const EditItem = ({ togglePopup, num, ...props }) => {
  return (
    <Hamburger
      onClick={() => {
        togglePopup(props, num);
      }}
    >
      <Line></Line>
      <Line></Line>
      <Line></Line>
    </Hamburger>
  );
};

EditItem.propTypes = {
  togglePopup: PropTypes.func, //function to close Popup
  num: PropTypes.number, //number with information which item is editing
};

export default EditItem;
