import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";
// component
import EditPost from "../EditPost/EditPost";
// styles
import "./Post.scss";

interface IpostProps {
  _id: string;
  author: string;
  title: string;
  body: string;
  date: number;
  published?: boolean;
}

const Post: FC<IpostProps> = ({ _id, title, author, body, date, published }) => {
  const [edit, setEdit] = useState(false);
  const dateObj = new Date(date);
  const location = useLocation();

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      <h3>by {author}</h3>
      <span>
        {dateObj.toDateString()} {dateObj.toTimeString()}
      </span>
      <br />
      {location.pathname === "/myposts" && (
        <button onClick={() => setEdit(!edit)}>edit</button>
      )}
      {edit && (
        <EditPost
          _id={_id}
          title={title}
          body={body}
          closeFunction={() => setEdit(!edit)}
          published={published ? published : false}
        />
      )}
    </div>
  );
};

export default Post;
