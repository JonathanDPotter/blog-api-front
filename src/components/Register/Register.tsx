import React, { FormEvent, useState } from "react";
// utils
import api from "../../api/api";
// styles
import "./Register.scss";

const Register = () => {
  const initialState = { username: "", password: "", repeatPassword: "" };
  const [state, setState] = useState(initialState);
  const { username, password, repeatPassword } = state;
  const passReg =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    let { id, value } = event.currentTarget;
    if (value.length > 15) value = value.slice(0, 15);
    setState({ ...state, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.register({ username, password });
      console.log(response.status, response.data);
    } catch (error: any) {
      console.error(error.message, error);
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
            type="password"
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
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            onChange={handleChange}
            value={repeatPassword}
            autoComplete="new-password"
            min={8}
            pattern={passReg}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
