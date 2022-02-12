import React from "react";
import { NavLink } from "react-router-dom";
// styles
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <p>Jonathan Potter 2022</p>
    </footer>
  );
};

export default Footer;
