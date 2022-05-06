import React, { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button/Button";
// components
import Modal from "../Modal/Modal";

interface IpostProps {
  _id: string;
  author: string;
  title: string;
  body: string;
  date: number;
  published?: boolean;
}

const Post: FC<IpostProps> = ({
  _id,
  title,
  author,
  body,
  date,
  published,
}) => {
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const dateObj = new Date(date);

  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.auth);

  const deletePost = () => {
    token && api.deletePost(_id, token);
    navigate("/");
    navigate(0);
  };

  const handleClick = () => {
    if (location.pathname === "/") {
      navigate(`/posts/${_id}`);
    }
  };

  return (
    <div className="container my-2">
      <h2 onClick={handleClick}>{title}</h2>
      <p>{body}</p>
      <h3>by {author}</h3>
      <span>
        {dateObj.toDateString()} {dateObj.toTimeString()}
      </span>
      <br />
      {location.pathname === "/myposts" && (
        <>
          <span>{published ? "Published" : "Unublished"}</span>
          <Button onClick={() => navigate(`/posts/edit/${_id}`)} text="edit" />
          <button onClick={() => navigate(`/posts/edit/${_id}`)}>edit</button>
          <button onClick={() => setModalMessage("Are you Sure?")}>
            Delete
          </button>
        </>
      )}
      {modalMessage && (
        <Modal
          message={modalMessage}
          closeFunction={() => setModalMessage(null)}
          deleteFunction={deletePost}
        />
      )}
    </div>
  );
};

export default Post;
