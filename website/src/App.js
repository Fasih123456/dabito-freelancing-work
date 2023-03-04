import { BrowserRouter, Routes, Route } from "react-router-dom";
import Apply from "./Pages/Apply";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/404";
import Claim from "./Pages/Claim";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Apply" element={<Apply />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
