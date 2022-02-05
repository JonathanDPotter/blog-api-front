import React, { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
// utils
import api from "../../api/api";
import { useAppDispatch } from "../../store/hooks";
// styles
import "./Login.scss";
import { setToken, setUser } from "../../store/authSlice";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [state, setState] = useState(initialState);
  const [passType, setPassType] = useState(false);

  const { username, password } = state;

  const dispatch = useAppDispatch();

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
      dispatch(setToken(response.data.token));
      dispatch(setUser(username));
      setState(initialState);
    } catch (error: any) {
      const { message } = error;
      console.log(message, error);
    }
  };

  return (
    <div className="page login">
      <h1>Login</h1>
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
            max={15}
            required
          />
          <FontAwesomeIcon
            className="icon"
            icon={faEye}
            onClick={handleVisibility}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
