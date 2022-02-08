import React, { FC } from "react";

interface IpostProps {
  author: string;
  title: string;
  body: string;
  date: number;
}

const Post: FC<IpostProps> = ({ author, title, body, date }) => {
  const dateObj = new Date(date);
  return (
    <div className="post card">
      <h2>{author}</h2>
      <h3>{title}</h3>
      <p>{body}</p>
      <span>
        {dateObj.toDateString()} {dateObj.toTimeString()}
      </span>
    </div>
  );
};

export default Post;
