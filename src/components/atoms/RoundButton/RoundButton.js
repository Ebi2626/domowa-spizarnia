import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  color: white;
  background: #999;
  transition: all 0.3s ease-in-out;
  &::selection {
    color: #999;
    background: transparent;
  }
  &:hover {
    cursor: pointer;
    color: #999;
    background: white;
  }
`;

const RoundButton = ({
  removeOne,
  num,
  addOne,
  children,
  fn,
  valuesOfItem,
}) => {
  return (
    <ButtonWrapper
      onClick={() => {
        if (addOne) {
          const newParameters = {
            name: valuesOfItem.name,
            val: Number(valuesOfItem.val) + 1,
            unit: valuesOfItem.unit,
            minVal: valuesOfItem.minVal,
          };
          return fn(num, newParameters);
        } else if (removeOne) {
          const newParameters = {
            name: valuesOfItem.name,
            val:
              valuesOfItem.val > 1
                ? Number(valuesOfItem.val) - 1
                : valuesOfItem.val,
            unit: valuesOfItem.unit,
            minVal: valuesOfItem.minVal,
          };
          return fn(num, newParameters);
        } else {
          alert("Wystąpił błąd przy kliknięciu na button");
        }
      }}
    >
      {children}
    </ButtonWrapper>
  );
};

RoundButton.propTypes = {
  removeOne: PropTypes.bool, // Information to substracting value
  addOne: PropTypes.bool, // Information to adding value
  children: PropTypes.string, // Sign inside button
  fn: PropTypes.func, // Callback to send information to redux and local storage
  valuesOfItem: PropTypes.object, // Data of editing element
};

export default RoundButton;
