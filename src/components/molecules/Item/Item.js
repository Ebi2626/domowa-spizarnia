import React from "react";
import styled from "styled-components";
import DeleteBtn from "../../atoms/DeleteButton/DelBtn";
import EditItem from "../../atoms/EditItem/EditItem";
import RoundButton from "../../atoms/RoundButton/RoundButton";
import PropTypes from "prop-types";

const Pargraph = styled.p`
  color: ${({ theme }) => (theme === "LIGHT" ? "black " : "white")};
  &::selection {
    background: transparent;
  }
`;

const Item = ({
  shop,
  togglePopup,
  handleDel,
  handleEdit,
  changeNum,
  num,
  name,
  val,
  unit,
  minVal,
  theme,
}) => {
  let classString =
    theme === "LIGHT"
      ? "text-gray-800 text-right max-w-md w-1/2 "
      : "text-right max-w-md w-1/2 text-gray-300";
  let nameStyle =
    theme === "LIGHT"
      ? "max-w-md w-1/2 mb-2 ml-2 text-gray-800"
      : "max-w-md w-1/2 mb-2 ml-2 text-gray-300";

  if (name === "" || name === undefined) {
    return null;
  }
  const valuesOfItem = {
    name,
    val,
    unit,
    minVal,
  };
  return (
    <div className="w-full p-4 mb-4 max-w-screen-md">
      <div className="p-2 relative border-bottom border-solid border-2 flex justify-between flex-row mx-5">
        <EditItem
          shop={shop}
          togglePopup={togglePopup}
          handleEdit={handleEdit}
          num={num}
          changeNum={changeNum}
        ></EditItem>
        <h3 className={nameStyle} style={{ maxWidth: "20vw" }}>
          {name}
        </h3>
        {shop ? (
          <>
            <RoundButton
              num={num}
              valuesOfItem={valuesOfItem}
              removeOne
              fn={handleEdit}
            >
              -
            </RoundButton>
            <Pargraph theme={theme}>
              {val} {unit}
            </Pargraph>
            <RoundButton
              num={num}
              valuesOfItem={valuesOfItem}
              addOne
              fn={handleEdit}
            >
              +
            </RoundButton>
          </>
        ) : (
          <p className={classString}>
            Ilość: {val}
            {unit}
          </p>
        )}
        <DeleteBtn
          className="bg-teal-500"
          onClick={() => {
            handleDel(name);
          }}
        >
          X
        </DeleteBtn>
      </div>
    </div>
  );
};

Item.propTypes = {
  togglePopup: PropTypes.func, // Function to open/close popup to editing item
  handleEdit: PropTypes.func, // Function to handle editing
  handleDel: PropTypes.func, // Function to handle deleting
  num: PropTypes.number, // Number of editing element
  changeNum: PropTypes.func, // Function to change number of editing element
  name: PropTypes.string, // Data of current element
  val: PropTypes.number, // Data of current element
  unit: PropTypes.string, // Data of current element
  minVal: PropTypes.number, // Data of current element
};

export default Item;
