import { Link } from "react-router-dom";
import "../style/header.css";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Logo from "../style/logos/icon-left-font-monochrome-black.svg";

function Header() {
  const history = useHistory();

  function redirect() {
    history.push("/login");
  }

  function logout() {
    // localStorage.setItem('token', '')
    // localStorage.setItem('id', '')
    localStorage.clear();
    redirect();
  }

  const [show, setShow] = useState(false);

  function displayLinks() {
    setShow(!show);
  }

  return (
    <div>
      <header className="header-container">
        <a href="http://localhost:3000/forum"><img className="logo-header" src={Logo} alt="logo Groupomania"/></a>
        <button className="toggle-nav-btn" onClick={displayLinks}>
          <FaBars />
        </button>
      </header>
      <nav className={show ? "square active" : "square"}>
        <Link className="header-link" onClick={displayLinks} to="/">
          Accueil
        </Link>
        <Link className="header-link" onClick={displayLinks} to="/profil">
          {" "}
          Profil
        </Link>
        <Link className="header-link" onClick={displayLinks} to="/forum">
          {" "}
          Forum
        </Link>
        <Link className="header-link" onClick={displayLinks} to="/login">
          {" "}
          Se connecter
        </Link>
        <Link className="header-link" onClick={displayLinks} to="/signup">
          {" "}
          S'inscrire
        </Link>
        <button className="logout-btn" onClick={logout}>
          Se déconnecter
        </button>
      </nav>
    </div>
  );
}

export default Header;
