import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import LoginForm from "./Components/Modals/LoginForm";
import axios from "axios";
import { RegistrationForm } from "./Components/Modals/RegistrationForm/RegistrationForm";
import { connect } from "react-redux";
import {
  addAccount,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from "./redux/actionCreators";
import { Slide } from "@material-ui/core";
import { SnackbarProvider } from "notistack";

function App({ accounts, ...props }) {
  const [isLoginOpen, setLoginIsOpen] = useState(false);

  const [isRegistrationOpen, setRegistrationIsOpen] = useState(false);
  return (
    <div
      className="App"
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <NavBar
        setLoginIsOpen={setLoginIsOpen}
        isLoginOpen={isLoginOpen}
        setRegistrationIsOpen={setRegistrationIsOpen}
        isRegistrationOpen={isRegistrationOpen}
      />
      <LoginForm isOpen={isLoginOpen} setLoginIsOpen={setLoginIsOpen} />
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={Slide}
      >
        <RegistrationForm
          isOpen={isRegistrationOpen}
          setRegistrationIsOpen={setRegistrationIsOpen}
          registerUser={props.registerUser}
          {...props}
        />
      </SnackbarProvider>
      <button
        onClick={() => {
          props.addAccount({ login: "somebody", password: "somebody" });
        }}
      >
        add acc
      </button>
      <button
        onClick={() => {
          console.log(accounts);
        }}
      >
        clg accounts
      </button>
      <div key={accounts.length}>
        {accounts.map((account) => (
          <li key={account.login}>
            {account.login} {account.password}
          </li>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    registration: state.registration,
    accounts: state.accounts,
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  addAccount,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
