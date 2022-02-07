import React, { FormEvent, useState } from "react";
import api from "../../api/api";
import InewPost from "../../interfaces/newPost";
import { useAppSelector } from "../../store/hooks";
// components
import Modal from "../Modal/Modal";
// styles
import "./MakePost.scss";

const MakePost = () => {
  const initialState = { title: "", body: "" };

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState(initialState);
  const { title, body } = formState;

  const { user } = useAppSelector((state) => state.auth);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.currentTarget;
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (user) {
      const newPost: InewPost = {
        ...formState,
        author: user,
        date: Date.now(),
      };
      const response = await api.makePost(newPost);
      setModalMessage(response.data.message)
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

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
