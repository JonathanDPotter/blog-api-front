import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// components
import Button from "../Button/Button";
// utils
import { useGetAllPostsQuery } from "../../store/postApiSlice";
// types
import Ipost from "../../interfaces/post";
import ButtonTypes from "../../enums/ButtonTypes";

const FullPost = () => {
  const { data, error } = useGetAllPostsQuery("");
  error && console.error(error);
  const { _id } = useParams();
  const [post, setPost] = useState<Ipost | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    data && setPost(data.posts.find((obj: Ipost) => obj._id === _id));
  }, [data, _id]);

  if (post) {
    const { title, body, author, date } = post;
    return (
      <div className="full-post page">
        <h1>{title}</h1>
        <h2>By: {author}</h2>
        <p>{body}</p>
        <span>{new Date(date).toDateString()}</span>
        <br />
        <Button
          onClick={() => navigate("/")}
          text="Back"
          type={ButtonTypes.button}
        />
      </div>
    );
  } else {
    return <h1 className="page">Loading...</h1>;
  }
};

export default FullPost;
