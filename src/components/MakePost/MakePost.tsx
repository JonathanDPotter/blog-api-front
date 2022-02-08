import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// utils
import api from "../../api/api";
import { useAppSelector } from "../../store/hooks";
// types
import InewPost from "../../interfaces/newPost";
// components
import Modal from "../Modal/Modal";
// styles
import "./MakePost.scss";

const MakePost = () => {
  const initialState = { title: "", body: "", published: false };

  const navigate = useNavigate();

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState(initialState);
  const { title, body } = formState;

  const { user, token } = useAppSelector((state) => state.auth);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;
    if (id === "published") {
      setFormState({ ...formState, published: !formState.published });
    } else {
      setFormState({ ...formState, [id]: value });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (user && token) {
      const newPost: InewPost = {
        ...formState,
        author: user,
        date: Date.now(),
      };
      console.log(newPost);
      const response = await api.makePost(newPost, token);
      if (response.data.success) {
        navigate("/");
        navigate(0);
      } else {
        setModalMessage(response.data.message);
      }
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="make-post page">
      <h1>Make Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="label-input">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={handleChange}
            rows={10}
          />
        </div>
        <div className="label-input">
          <label htmlFor="published">Publish</label>
          <input
            type="checkbox"
            name="published"
            id="published"
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={!(title && body)}>
          submit
        </button>
      </form>
      {modalMessage && (
        <Modal message={modalMessage} closeFunction={closeModal} />
      )}
    </div>
  );
};

export default MakePost;
