import React from 'react';
import { NavLink } from 'react-router-dom';
// styles
import "./NavBar.scss";

const NavBar = () => {
  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </nav>
    </header>
  );
};

export default NavBar