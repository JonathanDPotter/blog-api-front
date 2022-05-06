import React, { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api/api";
import { useAppDispatch } from "../../store/hooks";
import { setToken, setUser } from "../../store/authSlice";
// components
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ButtonTypes from "../../enums/ButtonTypes";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState<string | null>(null);
  const [passType, setPassType] = useState(false);

  const { username, password } = state;

  const dispatch = useAppDispatch();

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.login(state);
      if (response.data.success) {
        await dispatch(setToken(response.data.token));
        await dispatch(setUser(username));
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
      setState(initialState);
    } catch (error: any) {
      const { message } = error;
      console.log(message, error);
    }
  };

  const closeModal = () => {
    setMessage(null);
  };

  return (
    <div className="page">
      <h2 className="page-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
            autoComplete="new-password"
            max={15}
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
            pattern={passReg}
            max={15}
            required
          />
          <FontAwesomeIcon
            className="icon"
            icon={faEye}
            onClick={handleVisibility}
          />
        </div>
        <Button
          type={ButtonTypes.submit}
          disabled={!(username && password)}
          text="Submit"
        />
        <p className="form-info">
          Your password must contain 8 characters, a capital letter, a number
          and a special character.
        </p>
      </form>
      {message && <Modal message={message} closeFunction={closeModal} />}
    </div>
  );
};

export default Login;
