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

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/makepost" element={<MakePost />} />
        <Route path="/logout" element={<LogOut />} />
        <Route
          path="*"
          element={<h1 style={{ fontSize: "5rem" }}>404 not found</h1>}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

