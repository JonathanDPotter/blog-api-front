import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import IpostUpdate from "../../interfaces/postUpdate";
import { useAppSelector } from "../../store/hooks";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
import Modal from "../Modal/Modal";
// types
import Ipost from "../../interfaces/post";
// styles
import "./EditPost.scss";

const EditPost = () => {
  const { data, error } = useGetAllPostsQuery("");
  error && console.error(error);
  const { _id } = useParams();
  const [post, setPost] = useState<Ipost | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    body: "",
    published: false,
  });
  const navigate = useNavigate();
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

    if (token && _id) {
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

  useEffect(() => {
    data && setPost(data.posts.find((obj: Ipost) => obj._id === _id));
    post &&
      setFormState({
        title: post.title,
        body: post.body,
        published: post.published,
      });
  }, [data, post, _id]);

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
        <div className="label-input check-box">
          <label htmlFor="published">Publish</label>
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={formState.published}
            onChange={handleChange}
          />
        </div>
        <button type="submit">submit</button>
        <button onClick={() => navigate("/myposts")}>cancel</button>
      </form>
      {modalMessage && (
        <Modal message={modalMessage} closeFunction={closeModal} />
      )}
    </div>
  );
};

export default EditPost;
