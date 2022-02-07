import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/authSlice";
// styles
import "./LogOut.scss";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="log-out page">
      <h1>Log Out</h1>
      <form onSubmit={handleSubmit}>
        <h1>Are you sure that you want to log out?</h1>
        <button type="submit">Log Out</button>
      </form>
    </div>
  );
};

export default LogOut;
