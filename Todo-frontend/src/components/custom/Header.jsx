import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FilePen } from "lucide-react";
import {useAuth} from "../../context/AuthContext"
import { Navigate } from "react-router-dom";
import Avatar from "../ui/Avatar";

const Header = () => {
    const{user}=useAuth()
    const navigate = useNavigate()


  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left - App Name */}
      <div className="flex-1">
        <Link to="/feed" className="text-xl font-bold">
          MinimaList
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Create Todo Button */}
          <button className="btn btn-outline btn-sm sm:btn-md"
          onClick={()=>{navigate("/create-todo")}}>
            <FilePen />
          </button>

        {/* Avatar */}
        <Link to="/profile">
          <Avatar src={user?.avatar?.url} size="w-12" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
