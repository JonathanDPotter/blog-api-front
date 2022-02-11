import React, { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import InewPost from "../../interfaces/newPost";
import IpostUpdate from "../../interfaces/postUpdate";
import { useAppSelector } from "../../store/hooks";
import Modal from "../Modal/Modal";
// styles
import "./EditPost.scss";

interface Iprops {
  closeFunction: () => void;
  _id: string;
  title: string;
  body: string;
  published: boolean;
}

const EditPost: FC<Iprops> = ({
  closeFunction,
  _id,
  title,
  body,
  published,
}) => {
  const initialState = { title, body, published };

  const navigate = useNavigate();

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState(initialState);

  const { token } = useAppSelector((state) => state.auth);

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

    if (token) {
      const newPost: IpostUpdate = {
        ...formState,
        token,
        _id,
      };

      const response = await api.editPost(newPost);
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

  return (
    <div className="edit page">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            maxLength={15}
            value={formState.title}
            onChange={handleChange}
          />
        </div>
        <div className="label-input">
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={formState.body}
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
            checked={formState.published}
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
      <button onClick={closeFunction}>cancel</button>
    </div>
  );
};

export default EditPost;
