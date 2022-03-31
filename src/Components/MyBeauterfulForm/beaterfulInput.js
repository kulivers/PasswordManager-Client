import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { Container } from '@material-ui/core';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const BeauterfulInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <BeauterfulContainer>
      <Input
        className="beauterfulInput"
        {...field}
        {...props}
        placeholder={capitalizeFirstLetter(field.name)}
      />
      <Label htmlFor={field.name} inputValue={field.value}>
        {capitalizeFirstLetter(field.name)}
      </Label>
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </BeauterfulContainer>
  );
};

const BeauterfulContainer = styled.div`
  position: relative;
  margin: 10px;
  padding: 16px;
  border: 1px solid red;
  margin-bottom: 16px;
  width: 600px;
`;
const Input = styled.input`
  position: relative;
  z-index: 1;
  border-radius: 8px;
  border-width: 0 0 1px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  height: auto;
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  &:focus {
    box-shadow: none;
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }
`;
const Label = styled.label`
  /* text-align: center; */

  /* border: solid blue 2px; */
  color: darkred;
  position: absolute;
  left: 25px;
  bottom: 0;
  z-index: 0;
  align-self: center;
  top: ${(p) => (p.inputValue ? '0px' : '20px')};
  font-size: ${(p) => (p.inputValue ? '17px' : '0px')};
  width: 0px;
  height: 0px;
  font-weight: 300;
  /* opacity: 0.5; */
  cursor: text;
  transition: 0.2s ease all;
  margin: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-family: monospace;
`;

export default BeauterfulInput;
