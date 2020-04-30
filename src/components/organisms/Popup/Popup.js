import React, { useState } from "react";
import Header from "./../../atoms/Header/Header";
import PropTypes from "prop-types";
import styled from "styled-components";

const ClosingSpan = styled.span`
  display: block;
  position: absolute;
  text-align: center;
  color: white;
  top: 10px;
  right: 10px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  height: 30px;
  background: teal;
  z-index: 100;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: teal;
    background: white;
    cursor: pointer;
  }
`;

const Popup = ({ handleEdit, togglePopup, shop, changeNum, num, ...props }) => {
  const [name, setName] = useState(props.name || "");
  const [val, setVal] = useState(props.val || 0);
  const [unit, setUnit] = useState(props.unit || "");
  const [minVal, setMinVal] = useState(props.minVal || 0);

  return (
    <form className="fixed z-50 bg-white shadow-md rounded p-4 top-0">
      <ClosingSpan onClick={() => togglePopup(() => changeNum(num))}>
        X
      </ClosingSpan>
      <Header title="Wprowadź nowe dane" />
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nazwa produktu
        </label>
        <input
          required
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
          required
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
          htmlFor="type"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Jednostka miary produktu:
        </label>
        <select
          required
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

      {!shop && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="minVal"
          >
            Minimalna ilość produktu (do wysłania przypomnienia!)
          </label>
          <input
            required
            value={minVal}
            placeholder="Ilość poniżej której wysłane zostanie przypomnienie"
            name="minVal"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            onChange={(e) => setMinVal(Number(e.target.value))}
          />
        </div>
      )}
      <button
        className="shadow block bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white mx-auto mt-8 font-bold py-2 px-4 rounded"
        onClick={() =>
          name && val && unit && handleEdit(num, { name, val, unit, minVal })
        }
        type="button"
      >
        Popraw
      </button>
    </form>
  );
};

Popup.propTypes = {
  handleEdit: PropTypes.func, // Function to handle editing item to redux and local storage
  togglePopup: PropTypes.func, // Function to toggle popup with form
  shop: PropTypes.bool, // Information is it shopping list
  changeNum: PropTypes.func, // Function to change current editing item
  num: PropTypes.number, // Information of current item
};

export default Popup;
