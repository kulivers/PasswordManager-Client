import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import { LoginForm } from "./Components/LoginForm";
import axios from "axios";
import MyBeautifulForm from "./Components/MyBeauterfulForm";
import { RegistrationForm } from "./Components/RegistrationForm";

function App() {
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
      {/*<MyBeautifulForm />*/}
      <LoginForm isOpen={isLoginOpen} setLoginIsOpen={setLoginIsOpen} />
      <RegistrationForm
        isOpen={isRegistrationOpen}
        setRegistrationIsOpen={setRegistrationIsOpen}
      />
    </div>
  );
}

export default App;
