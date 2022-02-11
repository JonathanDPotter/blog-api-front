import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
// styles
import "./NavBar.scss";

const NavBar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const AuthLinks = () => {
    return (
      <>
        <NavLink to="/logout">Logout</NavLink>
        <NavLink to="makepost">Make Post</NavLink>
        <NavLink to="myposts">My Posts</NavLink>
      </>
    );
  };

  const GuestLinks = () => {
    return (
      <>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </>
    );
  };

  return (
    <header>
      <h1>Blog</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        {user ? <AuthLinks /> : <GuestLinks />}
      </nav>
    </header>
  );
};

export default NavBar;
