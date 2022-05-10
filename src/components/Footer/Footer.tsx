import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="foot">
      <nav className="flex justify-around w-1/2 max-w-lg">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      <p className="text-sm sm:text-lg">Jonathan Potter 2022</p>
    </footer>
  );
};

export default Footer;
