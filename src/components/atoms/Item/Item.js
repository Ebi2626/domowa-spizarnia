import React from "react";
import DeleteBtn from "./DelBtn";
import EditItem from "./EditItem";

const Item = (props) => {
  if (props.name === "" || props.name === undefined) {
    return null;
  }
  return (
    <div className="w-full p-4 mb-4 max-w-screen-md">
      <div className="p-2 relative border-bottom border-solid border-2 flex justify-between flex-row mx-5">
        <EditItem
          togglePopup={props.togglePopup}
          handleEdit={props.handleEdit}
          num={props.num}
          changeNum={props.changeNum}
        ></EditItem>
        <h1 className="max-w-md w-1/2 mb-2 ml-2">{props.name}</h1>
        {!props.shop && (
          <p className="max-w-md w-1/2  text-gray-600 text-right">
            Ilość: {props.val}
            {props.unit}
          </p>
        )}
        <DeleteBtn
          className="bg-teal-500"
          onClick={() => {
            props.handleDel(props.name);
          }}
        >
          X
        </DeleteBtn>
      </div>
    </div>
  );
};

export default Item;
