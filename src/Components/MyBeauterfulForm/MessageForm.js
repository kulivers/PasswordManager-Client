import React, { Component } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import styled, { keyframes } from "styled-components";
import Button from "@material-ui/core/Button";
import { BeauterfulInput } from "./beaterfulInput";
import "./beaterfulInput.css";
const YupValidationForm = () =>
  yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup
      .string()
      .typeError("It should be string")
      .min(2, "Too short name")
      .max(20, "To BIG name")
      .required("Please, tell me who are u"),
    message: yup
      .string()
      .min(3, "There is too short message bro")
      .required("Message is required"),
  });

export class ContainerWithForm extends Component {
  constructor(props) {
    super(props);
    this.animateBorder = this.animateBorder.bind(this);
  }
  state = { showAnimation: false };
  animateBorder = () => {
    this.setState({ showAnimation: true });
  };
  componentDidMount() {
    document.body.style.backgroundColor = "black";
  }
  render() {
    return (
      <div
        className={
          this.state.showAnimation
            ? "containerWithAnimation"
            : "containerWithoutAnimation"
        }
        onAnimationEnd={() => {
          this.setState({ showAnimation: false });
        }}
      >
        <MessageForm changed={this.animateBorder} />
        <label className="test">sad label</label>
      </div>
    );
  }
}

export const MessageForm = (props) => (
  <Formik
    initialValues={{
      email: "dadad@sdasd.rq",
      name: "sdasdad",
      message: "wqeqweq",
    }}
    validationSchema={YupValidationForm}
    onSubmit={(values, action, third) => {
      console.log("submitted");
    }}
  >
    {({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      handleReset,
      touched,
      values,
    }) => (
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        onChange={() => {
          props.changed();
        }}
      >
        <P>TELL ME BABE...</P>
        <BeauterfulInput name="email" />
        <BeauterfulInput name="name" />
        <BeauterfulInput name="message" />
        <br />

        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>

        <Button variant="contained" color="primary" type="reset">
          Reset
        </Button>
      </form>
    )}
  </Formik>
);

const raiseBorder = keyframes`
  0% {
    box-shadow: 0 0 0 4px darkorange, 0 0 0 11px red, 0 0 0 18px #ffff00;
  }
  50% {
    box-shadow: 0 0 0 7px darkorange, 0 0 0 15px red, 0 0 0 25px yellow;
  }
  100% {
    box-shadow: 0 0 0 4px darkorange, 0 0 0 11px red, 0 0 0 18px yellow;
  }
`;

const Container = styled.div`
  margin: auto;
  margin-top: 50px;
  background-color: grey;
  border-style: solid;
  border-width: 2px;
  border-color: black;
  padding-left: 185px;
  padding-right: 185px;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 600px;
  /* top: ${(p) => (p.inputValue ? "0px" : "20px")}; */
  animation-name: ${(p) => raiseBorder};
  /* animation-name: ${raiseBorder}; */
  animation-duration: 0.4s;
  box-shadow: 0 0 0 4px darkorange, 0 0 0 10px red, 0 0 0 16px yellow;
  height: auto;
`;

const P = styled.p`
  position: relative;

  font: small-caps bold 24px/1 sans-serif;
`;

const SubmitButton = styled.button``;

const ResetButton = styled.button``;
