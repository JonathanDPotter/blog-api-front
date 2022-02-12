import axios from "axios";
import InewPost from "../interfaces/newPost";
// types
import InewUser from "../interfaces/newUser";
import IpostUpdate from "../interfaces/postUpdate";

const baseURL = "https://jonathan-potter-rest-api.herokuapp.com/";

const register = (newUser: InewUser) =>
  axios.post(baseURL + "/api/users/register", newUser);

const login = (user: InewUser) =>
  axios.post(baseURL + "/api/users/login", user);

const validate = (token: string) =>
  axios.get(baseURL + "/api/users/validate", {
    headers: { authorization: `Bearer ${token}` },
  });

const makePost = (post: InewPost, token: string) =>
  axios.post(baseURL + "/api/posts", post, {
    headers: { authorization: `Bearer ${token}` },
  });

const editPost = (update: IpostUpdate) =>
  axios.put(
    baseURL + "/api/posts/" + update._id,
    { body: update.body, title: update.title, published: update.published },
    { headers: { authorization: `Bearer ${update.token}` } }
  );

const deletePost = (_id: string, token: string) =>
  axios.delete(baseURL + "/api/posts/" + _id, {
    headers: { authorization: `Bearer ${token}` },
  });

const api = { register, login, validate, makePost, editPost, deletePost };

export default api;
