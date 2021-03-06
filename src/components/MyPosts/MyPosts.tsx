import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
// components
import Post from "../Post/Post";

const MyPosts = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  if (error) console.error(error);
  const { user } = useAppSelector((state) => state.auth);
  const [mine, setMine] = useState([]);

  useEffect(() => {
    if (data && user)
      setMine(data.posts.filter((post: any) => post.author === user));
    if (error) console.error(error);
  }, [data, error, user]);

  return (
    <div className="my-posts page">
      <h2 className="page-title">My Posts</h2>
      {isLoading && <p className="loading">Loading...</p>}
      {user &&
        mine &&
        mine.map((post: any, i) => (
          <Post
            _id={post._id}
            author={post.author}
            title={post.title}
            body={post.body}
            date={post.date}
            key={i}
            published={post.published}
          />
        ))}
      {user && mine.length === 0 && <div className="container">No posts</div>}
    </div>
  );
};

export default MyPosts;
