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
      <h2 className="page-title">Log Out</h2>
      <form
        onSubmit={handleSubmit}
        className="h-[50vh] w-[100%]"
      >
        <p className="mx-auto">Are you sure that you want to log out?</p>
        <div className="flex w-[100%] justify-around mt-[2rem]">
          <Button type={ButtonTypes.submit} text="Log Out" />
          <Button type={ButtonTypes.button} text="Cancel" onClick={() => navigate(-1)} />
        </div>
      </form>
    </div>
  );
};

export default LogOut;
