import React, { useState, useEffect } from "react";
import Header from "./../../atoms/Header/Header";
import styled from "styled-components";

const ClosingSpan = styled.span`
  display: block;
  position: absolute;
  color: black;
  top: 20px;
  right: 20px;
  &:hover {
    color: teal;
  }
`;

const Popup = (props) => {
  const [name, setName] = useState(props.name || "");
  const [val, setVal] = useState(props.val || 0);
  const [unit, setUnit] = useState(props.unit || "");
  const [minVal, setMinVal] = useState(props.minVal || "");
  useEffect(() => {
    console.log(name, val, unit, minVal, props.num);
  });

  return (
    <form className="fixed z-50 bg-white shadow-md rounded p-4 top-0">
      <ClosingSpan
        onClick={() => props.togglePopup(() => props.changeNum(props.num))}
      >
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
          onChange={(e) => setVal(e.target.value)}
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
          onChange={(e) => setMinVal(e.target.value)}
        />
      </div>
      <button
        className="shadow block bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white mx-auto mt-8 font-bold py-2 px-4 rounded"
        onClick={() =>
          name &&
          val &&
          unit &&
          minVal &&
          props.handleEdit(props.num, { name, val, unit, minVal })
        }
        type="button"
      >
        Popraw
      </button>
    </form>
  );
};

export default Popup;
