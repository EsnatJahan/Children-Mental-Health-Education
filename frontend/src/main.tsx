import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./Pages/home";
import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Lectures from "./Pages/lectures";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path = "/lectures" element={<Lectures />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
