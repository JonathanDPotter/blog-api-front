import React from "react";
import { Routes, Route } from "react-router-dom";
// comoponents
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import LogOut from "./components/LogOut/LogOut";
import MakePost from "./components/MakePost/MakePost";
import MyPosts from "./components/MyPosts/MyPosts";
import FullPost from "./components/FullPost/FullPost";
import EditPost from "./components/EditPost/EditPost";
import About from "./components/About/About";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/makepost" element={<MakePost />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/posts/:_id" element={<FullPost />} />
        <Route path="/posts/edit/:_id" element={<EditPost />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={<h1 className="page" style={{ fontSize: "5rem" }}>404 not found</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
