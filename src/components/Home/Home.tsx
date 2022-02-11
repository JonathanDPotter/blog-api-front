import React, { useEffect, useState } from "react";
// utils
import { useAppDispatch } from "../../store/hooks";
import { logOut } from "../../store/authSlice";
import api from "../../api/api";
import { useAppSelector } from "../../store/hooks";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
// types
import Ipost from "../../interfaces/post";
// components
import Post from "../Post/Post";
// styles
import "./Home.scss";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [published, setPublished] = useState([]);
  error && console.log(error);

  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  const checkValid = async () => {
    if (token) {
      const response = await api.validate(token);
      if (!response.data.success) dispatch(logOut());
    }
  };

  useEffect(() => {
    if (data) {
      setPublished(data.posts.filter((post: Ipost) => post.published === true));
    }
    if (token) checkValid();
  }, [data, token]);

  return (
    <div className="home page">
      <h1>Hello {user ? user : "Guest"}</h1>
      {isLoading && <h1>Loading...</h1>}
      {published &&
        published.map((post: Ipost, i) => {
          return (
            <Post
              _id={post._id}
              author={post.author}
              title={post.title}
              body={post.body}
              date={post.date}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default Home;
