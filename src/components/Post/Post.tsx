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
    <div className="container my-4 border-t-2 border-b-4 border-dblue">
      <h2 onClick={handleClick} className="border-b text-xl">
        {title}
      </h2>
      <p>{body}</p>
      <div className="border-b w-full text-right mt-2">
        <h3 className="text-lg ">by {author}</h3>
      </div>
      <div className="text-right mb-2">
        <span>
          {dateObj.toLocaleDateString()}{" "}
          {dateObj.toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
      {location.pathname === "/myposts" && (
        <div className="flex-col py-4">
          <p className="display-block">
            {published ? "Published" : "Unpublished"}
          </p>
          <div className="flex justify-end">
            <Button
              onClick={() => navigate(`/posts/edit/${_id}`)}
              text="edit"
              classList="bg-dblue text-white font-bold py-2 px-4 rounded hover:bg-yellow hover:text-dblue max-w-[8rem] mr-[2rem]"
            />
            <Button
              onClick={() => setModalMessage("Are you Sure?")}
              text="Delete"
            />
          </div>
        </div>
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
