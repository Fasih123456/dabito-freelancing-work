import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./Pages/Apply";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/404";
import Claim from "./Pages/Claim";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    displayName: "",
    username: "",
    profileImageUrl: "",
  });

  const twitterLogin = async () => {
    window.open("http://localhost:3001/oauth/twitter", "_self");
  };

  const twitterLogout = async () => {
    window.open("http://localhost:3001/logout", "_self");
  };

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser({
          id: data.profileId.id,
          username: data.profileId.profile.username,
          displayName: data.profileId.profile.displayName,
          profileImageUrl: data.profileId.profile.photos[0].value,
        });
        console.log(currentUser);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <React.Fragment>
      <Header profileId={currentUser} location="/" />
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Homepage />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          <Route path="/Apply" element={<Apply />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
