import axios from "axios";
import InewPost from "../interfaces/newPost";
// types
import InewUser from "../interfaces/newUser";

const baseURL = "http://localhost:1337";

const register = (newUser: InewUser) =>
  axios.post(baseURL + "/api/users/register", newUser);

const login = (user: InewUser) =>
  axios.post(baseURL + "/api/users/login", user);

const makePost = (post: InewPost, token: string) =>
  axios.post(baseURL + "/api/posts", post, {
    headers: { authorization: `Bearer ${token}` },
  });

const api = { register, login, makePost };

export default api;
