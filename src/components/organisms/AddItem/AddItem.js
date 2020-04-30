import React, { useState } from "react";
import Header from "./../../atoms/Header/Header";
import styled from "styled-components";
import PropTypes from "prop-types";

const ClosingSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
  position: absolute;
  color: teal;
  background-color: white;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 100;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: white;
    background-color: teal;
  }
`;

const AddItem = ({ shop, togglePopup, handleAdd }) => {
  const [name, setName] = useState("");
  const [val, setVal] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [minVal, setMinVal] = useState(0);

  return (
    <form
      className="fixed z-50 bg-white shadow-md rounded px-8 pt-6 pb-8"
      style={{ top: "10%", width: 400, maxWidth: "90vw", overflowY: "auto" }}
    >
      <ClosingSpan onClick={() => togglePopup()}>X</ClosingSpan>
      <Header title="Wprowadź dane" />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nazwa produktu
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Poprawna nazwa produktu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="value"
        >
          Ilość produktu:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="value"
          placeholder="Poprawna ilość prodktu..."
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="unit"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Jednostka miary produktu:
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          name="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="kg">Kilogramy</option>
          <option value="l">Litry</option>
          <option value=" szt.">Sztuki</option>
        </select>
      </div>
      {!shop ? (
        <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="minVal"
            >
              Minimalna ilość produktu (do wysłania przypomnienia!)
            </label>
            <input
              value={minVal}
              placeholder="Ilość poniżej której wysłane zostanie przypomnienie"
              name="minVal"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              onChange={(e) => setMinVal(Number(e.target.value))}
            />
          </div>
        </>
      ) : null}
      <button
        className="shadow block bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white mx-auto mt-8 font-bold py-2 px-4 rounded"
        onClick={() => name && val && handleAdd({ name, val, unit, minVal })}
        type="button"
      >
        Dodaj
      </button>
    </form>
  );
};

AddItem.propTypes = {
  handleAdd: PropTypes.func, // Function to handle adding new item to redux and local storage
  togglePopup: PropTypes.func, // Function to toggle popup with form
  shop: PropTypes.bool, // Information is it shopping list
};
export default AddItem;
