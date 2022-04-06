import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import LoginForm from "./Components/Modals/LoginForm";
import axios from "axios";
import { RegistrationForm } from "./Components/Modals/RegistrationForm/RegistrationForm";
import { connect } from "react-redux";
import { addAccount } from "./redux/actionCreators";

function App({ addAccount, accounts, ...props }) {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isRegistrationOpen, setRegistrationIsOpen] = useState(false);

  const makeRequest = async () => {
    const url = "https://localhost:5001/api/token";
    const body = {
      firstName: "Egor",
      LastName: "cooleshov",
      UserName: "simpleKulivers2",
      Password: "2222qqqq",
      email: "kulivers@mail.ru",
    };
    const token = await axios.post(url, body);
    console.log(token);
  };

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

      <RegistrationForm
        isOpen={isRegistrationOpen}
        setRegistrationIsOpen={setRegistrationIsOpen}
      />
      <button
        onClick={() => {
          addAccount({ login: "somebody", password: "somebody" });
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
    accounts: state.accountsReducer.accounts,
  };
};

const mapDispatchToProps = {
  addAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
