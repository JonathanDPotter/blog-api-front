import axios from "axios";
// types
import InewUser from "../interfaces/newUser";

const baseURL = "http://localhost:1337";

const register = (newUser: InewUser) =>
  axios.post(baseURL + "/api/users/register", newUser);

const login = (user: InewUser) =>
  axios.post(baseURL + "/api/users/login", user);

const api = { register, login };

export default api;
