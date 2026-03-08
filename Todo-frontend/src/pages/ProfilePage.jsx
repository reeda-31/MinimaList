import React, { useEffect, useState } from "react";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";

const ProfilePage = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const navigate = useNavigate();

  const { user, refreshUser } = useAuth();

  const handleStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/todo/fetch-todos`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Could'nt fetch data");
      }
      let completedTodos = 0,
        incompleteTodos = 0;
      data.data.forEach((todo) => {
        if (todo.completed) {
          completedTodos++;
        } else {
          incompleteTodos++;
        }
      });
      setStats({
        total: data.data.length,
        completed: completedTodos,
        pending: incompleteTodos,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    handleStats();
    refreshUser();
  }, [stats]);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* PROFILE HEADER */}

      <h1 className="text-2xl sm:text-3xl font-semibold border-b pb-4">
        Profile
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        {/* Avatar + Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <Avatar
            src={user?.avatar?.url}
            alt={user.username}
            size="w-28 sm:w-32 md:w-36"
          />

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-semibold">
              {user.username}
            </h2>

            <p className="text-gray-500 break-all">{user.email}</p>

            <p className="text-sm text-gray-400">
              Joined: {moment(user.createdAt).format("MMM D, YYYY")}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center sm:justify-end">
          <Button
            variant="btn-secondary"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-b"></div>

      {/* TODO STATISTICS */}

      <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left margin-0">
        Your Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 text-center mt-6 divide-y sm:divide-y-0 sm:divide-x">
        {/* TOTAL TODOS */}
        <div className="space-y-2 py-6 sm:py-0">
          <p className="text-3xl sm:text-4xl font-bold">{stats.total}</p>

          <p className="text-gray-500">Total Tasks</p>
        </div>

        {/* COMPLETED */}
        <div className="space-y-2 py-15 sm:py-0 ">
          <p className="text-3xl sm:text-4xl font-bold">{stats.completed}</p>

          <p className="text-gray-500">Completed</p>
        </div>

        {/* PENDING */}
        <div className="space-y-2 py-6 sm:py-0">
          <p className="text-3xl sm:text-4xl font-bold">{stats.pending}</p>

          <p className="text-gray-500">Pending</p>
        </div>
      </div>
      <div className="border-b mt-4"></div>
    </div>
  );
};

export default ProfilePage;
