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

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [published, setPublished] = useState([]);
  error && console.log(error);

  const dispatch = useAppDispatch();

  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkValid = async () => {
      if (token) {
        const response = await api.validate(token);
        if (!response.data.success) dispatch(logOut());
      }
    };

    if (data) {
      setPublished(data.posts.filter((post: Ipost) => post.published === true));
    }
    if (token) checkValid();
  }, [data, token, dispatch]);

  return (
    <div className="page">
      <h2 className="page-title w-full max-w-full mx-[2rem]">
        Hello {user ? user : "Guest"}
      </h2>
      {isLoading && <h1>Loading...</h1>}
      {published &&
        published.map((post: Ipost) => {
          return (
            <Post
              _id={post._id}
              author={post.author}
              title={post.title}
              body={post.body}
              date={post.date}
              key={post._id}
            />
          );
        })}
    </div>
  );
};

export default Home;
