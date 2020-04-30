import React, { useState } from "react";
import Header from "../../atoms/Header/Header";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  padding: 30px 10px;
  background: rgb(255, 255, 255);
  z-index: 999;
`;
const Form = styled.form`
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 800px;
  border: solid 2px black;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
`;

const ClosingCross = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  height: 30px;
  width: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 15px;
  background-color: black;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: black;
    background-color: white;
  }
`;

const Input = styled.input`
  margin-left: 10px;
  border-bottom: solid 2px black;
  width: 50%;
`;
const Button = styled.button`
  width: 100px;
  margin: 10px auto;
  border-radius: 10px;
  padding: 10px 30px;
  color: white;
  background-color: teal;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: white;
    border: solid 2px teal;
    color: teal;
  }
`;

const AddPeriodic = ({ theme, close, handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = new Date();
    const response = {
      name: newName,
      period: newPeriod,
      data: data,
    };
    handleSubmit(response);
    return close();
  };
  const checkString = (e) => {
    let allow = true;
    for (let i = 0; i < e.target.value.length; i++) {
      if (!isNaN(parseInt(e.target.value[i]))) {
        allow = false;
        break;
      }
    }

    return allow ? e.target.value : newName;
  };
  return (
    <Wrapper>
      <ClosingCross onClick={() => close()}>X</ClosingCross>
      <Header title="Dodaj nowy produkt cykliczny"></Header>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Label>
          Nazwa produktu:{" "}
          <Input
            placeholder="Nazwa produktu"
            type="text"
            name="name"
            id="name"
            value={newName}
            onChange={(e) => setNewName(checkString(e))}
          />
        </Label>
        <Label>
          Ilość dni do następnego dopisania do listy:{" "}
          <Input
            placeholder="Co ile dni"
            type="number"
            name="period"
            id="period"
            value={newPeriod}
            onChange={(e) =>
              setNewPeriod(e.target.value > 0 ? parseInt(e.target.value) : 0)
            }
          />
        </Label>
        <Button>Wyślij</Button>
      </Form>
    </Wrapper>
  );
};

export default AddPeriodic;
