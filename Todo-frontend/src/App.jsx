import { useState } from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
