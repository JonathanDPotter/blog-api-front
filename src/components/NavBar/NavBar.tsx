import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

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
    <header className="header">
      <h1 className="text-4xl mx-auto">Blog</h1>
      <nav className="grid grid-cols-2 sm:flex justify-around w-1/2 ml-auto">
        <NavLink to="/">Home</NavLink>
        {user ? <AuthLinks /> : <GuestLinks />}
      </nav>
    </header>
  );
};

export default NavBar;
