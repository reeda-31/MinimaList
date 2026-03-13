import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlus, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import CreateTodoModal from "../../pages/CreateTodoModal";

const Header = ({ addTodo }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left - App Name */}
      <div className="absolute left-1/2 -translate-x-1/2 md:left-1/2 ">
        <Link to="/feed" className="text-l font-bold md:text-xl">
          Minimalist
        </Link>
      </div>

      {/* Right Section */}
      <div className="ml-auto flex items-center gap-2">
        {/* Create Todo Button */}
        <Button
          outline
          variant="btn-neutral "
          className="btn-sm md:btn-md"
          onClick={() => setOpenModal(true)}
        >
          <CirclePlus />
        </Button>
        <Avatar
          src={user?.avatar?.url}
          size="w-10 md:w-12"
          onClick={() => navigate("/profile")}
        />
        <CreateTodoModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          addTodo={addTodo}
        />
      </div>
    </div>
  );
};

export default Header;
