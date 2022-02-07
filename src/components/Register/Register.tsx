import React, { FormEvent, useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// utils
import api from "../../api/api";
// styles
import "./Register.scss";
import { AxiosResponse } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const Register = () => {
  const initialState = { username: "", password: "", repeatPassword: "" };
  const [state, setState] = useState(initialState);
  const { username, password, repeatPassword } = state;
  const [passType, setPassType] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const passReg =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    let { id, value } = event.currentTarget;
    if (value.length > 15) value = value.slice(0, 15);
    setState({ ...state, [id]: value });
  };

  const handleVisibility = () => {
    setPassType(!passType);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await api.register({ username, password });
    if (response.data.success) {
      setState(initialState);
      navigate("/");
    } else {
      setState(initialState);
      setError(response.data.message);
      setShowModal(true);
    }
  };

  return (
    <div className="register page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
            max={15}
            autoComplete="new-password"
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">password</label>
          <input
            type={passType ? "text" : "password"}
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
            autoComplete="new-password"
            min={8}
            pattern={passReg}
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="repeatPassword">repeat password</label>
          <input
            type={passType ? "text" : "password"}
            name="repeatPassword"
            id="repeatPassword"
            onChange={handleChange}
            value={repeatPassword}
            autoComplete="new-password"
            min={8}
            pattern={passReg}
            required
          />
          <FontAwesomeIcon
            className="icon"
            icon={faEye}
            onClick={handleVisibility}
          />
        </div>
        <button type="submit"disabled={!(username && password && repeatPassword)}>Submit</button>
        {password && repeatPassword && password !== repeatPassword && (
          <p style={{ color: "rgb(202, 202, 59)" }}>Passwords must match!!</p>
        )}
        <span>
          Your password must contain 8 characters, a capital letter, a number
          and a special character.
        </span>
      </form>
      {showModal && <Modal message={error} closeFunction={closeModal} />}
    </div>
  );
};

export default Register;
