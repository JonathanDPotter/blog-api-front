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
    <header className="bg-dblue h-nav border-b-4 border-brown flex flex-row justify-around text-lg items-center text-white/80">
      <h1 className="text-4xl">Blog</h1>
      <nav className="flex flex-row justify-around w-1/2">
        <NavLink to="/">Home</NavLink>
        {user ? <AuthLinks /> : <GuestLinks />}
      </nav>
    </header>
  );
};

export default NavBar;
