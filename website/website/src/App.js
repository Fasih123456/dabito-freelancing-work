import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./Pages/Apply";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/404";
import Claim from "./Pages/Claim";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import Admin from "./Pages/Admin";
import { myContext } from "./Components/OAuthContext";
import AllTweets from "./Pages/AllTweets";

import "./Css/App.css";

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);

  return (
    <React.Fragment>
      <Header location="/" />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Homepage />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Apply" element={<Apply />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tweets" element={<AllTweets />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
