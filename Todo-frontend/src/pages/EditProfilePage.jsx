import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import {useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate=useNavigate();
  const { user } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user?.avatar?.url || null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);

      if (password) {
        formData.append("password", password);
      }

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/user/update-profile`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      navigate("/profile",{replace:true})
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="text-2xl font-bold text-center mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar src={preview||null} size="w-24" />

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs focus:outline-none"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Username */}
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                placeholder="Leave blank if unchanged"
                className="input input-bordered w-full focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="btn-primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;