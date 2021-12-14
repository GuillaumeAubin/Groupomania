import React, { useState } from "react";
// import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../style/form.css";
// import DataContext from '../DataContext'
import { Link } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  //const { dataUser, setDataUser } = useContext(DataContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function redirect() {
    history.push("/");
  }

  const login = () => {
    Axios.post("http://localhost:4200/api/user/login", {
      email: email,
      password: password,
    }).then((response) => {
      localStorage.setItem("token", "Bearer " + response.data.token);
      //console.log(response.data.userId);
      //console.log(response.data.moderator);
      localStorage.setItem("id", response.data.userId);
      localStorage.setItem("moderator", response.data.moderator);
      redirect();
    });
  };

  const emailReg =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+[a-zA-Z0-9-]+)/;

  function emailValidation(email) {
    if (!email.match(emailReg)) {
      alert("error : email must be valid !");
    }
    login();
  }

  return (
    <div className="form-container">
      <h1 className="main-title">Sign in to Groupomania</h1>
      <div className="form-container-box">
        <div className="inputs">
          <div className="input">
            <label htmlFor="inputEmail">Email:</label>
            <input
              placeholder="email"
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="input">
            <label htmlFor="inputPassword">password:</label>
            <input
              placeholder="password"
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="button-login-container">
          <button
            className="submit-btn-login"
            onClick={(() => login, () => emailValidation(email))}
          >
            SUBMIT
          </button>
        </div>
      </div>
      <p>Vous n&apos;avez pas de compte ?</p>{" "}
      <Link className="signup-link" to="/signup">
        Créer un compte
      </Link>
    </div>
  );
}
