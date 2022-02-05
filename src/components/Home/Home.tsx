import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useGetAllPostsQuery } from "../../store/postApiSlice";
import Post from "../Post/Post";

const Home = () => {
  const { data, error, isLoading } = useGetAllPostsQuery("");
  const [published, setPublished] = useState([]);
  error && console.log(error);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (data) {
      setPublished(data.posts.filter((post: any) => post.published === true));
    }
  }, [data]);

  return (
    <div className="home page">
      {user && <h1>Hello {user}</h1>}
      {isLoading && <h1>Loading...</h1>}
      {published &&
        published.map((post: any, i) => {
          return (
            <Post
              author={post.author}
              title={post.title}
              body={post.body}
              date={post.date}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default Home;
