import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// utils
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/authSlice";
// enums
import ButtonTypes from "../../enums/ButtonTypes";
// components
import Button from "../Button/Button";

const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Log Out</h1>
      <form onSubmit={handleSubmit}>
        <h1>Are you sure that you want to log out?</h1>
        <Button type={ButtonTypes.submit} text="Log Out" />
        <Button text="Cancel" onClick={() => navigate(-1)} />
      </form>
    </div>
  );
};

export default LogOut;
