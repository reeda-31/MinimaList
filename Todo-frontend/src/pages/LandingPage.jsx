import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import  Button  from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const {user,loading}=useAuth()
  if(loading) return null;
  if(user){
    return <Navigate to="/feed" replace />
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        {/* Small Tagline */}
        <p className="uppercase tracking-widest text-sm text-primary font-semibold">
          Simple. Powerful. Organized.
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
          Manage Your Tasks <br />
          <span className="text-primary">Like a Pro</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto">
          Minimalist helps you stay focused, organized, and in control. Create,
          manage, and track your daily tasks with a clean and distraction-free
          experience.
        </p>

        {/* Buttons (Always Horizontal) */}
        <div className="flex justify-center gap-6 pt-4">
          <Button
            className="px-12 text-base shadow-lg hover:scale-105 transition-transform duration-300" variant="btn-primary"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>

          <Button
            className="px-12 text-base hover:bg-base-300 transition-all duration-300" variant="btn-outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
