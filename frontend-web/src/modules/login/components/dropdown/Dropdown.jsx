import React, { useState } from "react";
import styled from "styled-components";

const Main = styled("div")`
  font-family: sans-serif;
  height: auto;
`;

const DropDownContainer = styled("div")`
  width: 300px;
  padding-top: 20px;
  padding-left: 300px;
  height:40px;
`;

const DropDownHeader = styled("div")`
  font-weight: 500;
  font-size: 1.3rem;
  color:dimgray;
  background-color: white;
  width: auto;
  height: 40px;
  padding-top: 10px;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  width: 300px;
  height: 40px
  font-size: 1.3rem;
  font-weight: 500;
  background-color: white;
  color:dimgray;  
  position: absolute;
  padding-left: 0;
`;

const ListItem = styled("li")`
  list-style: none;
  font-size: 1.3rem;
  text-align: center;
  position: relative;
  width: 300px;
  height: 40px;
  margin-top: 10px;
`;


const options = [
  {
      "id": 0,
      "nombre": "Hotel Test"
  }
];

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Seleccione un hotel"}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={option.id}>
                  {option.nombre}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}
export default Dropdown;