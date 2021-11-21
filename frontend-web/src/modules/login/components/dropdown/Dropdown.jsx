import React, { useState } from "react";
import styled from "styled-components";

const Main = styled("div")`
  font-family: sans-serif;
  height: auto;
`;

const DropDownContainer = styled("div")`
  width: 150px;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 15px;  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color:#f5f5dc;
  background-color: Transparent;
  width: auto;
  border: 2px solid  #50564f;


`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  width: auto;
  padding: 0;
  margin: 0;
  padding-left: 1em;
  border: 2px solid  #50564f;
  box-sizing: border-box;
  font-size: 1.3rem;
  font-weight: 500;
  background-color: Transparent;
  color:#f5f5dc;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  text-align: center;

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
    console.log(selectedOption);
  };

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || "Hotel"}
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