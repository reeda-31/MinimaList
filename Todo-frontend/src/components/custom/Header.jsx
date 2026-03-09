import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import CreateTodoModal from "../../pages/CreateTodoModal";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left - App Name */}
      <div className="flex-1">
        <Link to="/feed" className="text-xl font-bold">
          Minimalist
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Create Todo Button */}
        <Button
          outline
          variant="btn-neutral "
          className="btn-sm sm:btn-md"
          onClick={() => setOpenModal(true)}
        >
          <CirclePlus />
        </Button>
        <Avatar
          src={user?.avatar?.url}
          size="w-12"
          onClick={() => navigate("/profile")}
        />
        <CreateTodoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      </div>
    </div>
  );
};

export default Header;
