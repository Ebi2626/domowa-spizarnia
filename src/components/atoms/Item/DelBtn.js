import React from "react";
import styled from "styled-components";

const DeleteBtn = styled.span`
  position: absolute;
  right: -50px;
  top: 5px;
  color: white;
  padding: 8px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: teal;
  }
`;

export default DeleteBtn;
