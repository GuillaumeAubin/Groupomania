import React from "react";
import "../style/footer.css";
import Logo from "../style/logos/icon-left-font-monochrome-white.png";

export default function Footer() {
  return (
    <footer className="footer-container">
      <img className="logo-footer" src={Logo} alt="logo-groupomania" />
    </footer>
  );
}
