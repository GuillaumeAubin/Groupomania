import React, { useState } from "react";
//import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../style/form.css";
//import DataContext from '../DataContext'

export default function Signup() {
  const history = useHistory();

  //  const { dataUser } = useContext(DataContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isModerator, setIsModerator] = useState(false)

  function redirect() {
    history.push("/login");
  }

  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const signup = () => {
    Axios.post("http://localhost:4200/api/user/signup", {
      name: name,
      email: email,
      password: password,
    }).then((response) => {
      //console.log(response);
      redirect();
    });
  };

  function emailValidation(email, password) {
    if (!email.match(emailReg)) {
      alert("Erreur : votre email est invalide !");
      return;
    } else if (!password.match(passwordReg)) {
      alert("Erreur : votre mot de passe est invalide !");
      return;
    }
    signup();
  }

  return (
    <div className="form-container">
      <h1 className="main-title">S'inscrire sur le forum</h1>

      <div className="form-container-box">
        <div className="inputs">
          <div className="input">
            <label htmlFor="inputName">Nom :</label>
            <input
              className="form-control"
              id="inputName"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>

          <div className="input">
            <label htmlFor="inputEmail">Email :</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>

          <div className="input">
            <label htmlFor="inputPassword">Mot de passe :</label>
            <input
              className="form-control"
              id="inputPassword"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <p>(Le mot de passe doit contenir au moins 8 caractères dont 1 chiffre)</p>
          </div>
        </div>

        <div className="button-login-container">
          <button
            className="submit-btn-login"
            onClick={(() => signup, () => emailValidation(email, password))}
          >
            S'INSCRIRE
          </button>
        </div>
      </div>
    </div>
  );
}
