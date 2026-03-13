import { useState } from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import FeedPage from "./pages/FeedPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/feed" element={<FeedPage />}/>
          <Route path="/edit-profile" element={<EditProfilePage />}/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
