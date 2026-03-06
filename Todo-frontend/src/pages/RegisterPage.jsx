import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  if (loading) return null;

  if (user) {
    return <Navigate to="/feed" replace />;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registeration failed!");
      }

      await refreshUser();
      navigate("/feed");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-sans mb-8 mt-7">Create Your Account</h1>
      <form onSubmit={handleRegister} className="w-full max-w-lg">
        <fieldset className=" border-base-300 rounded-xl p-8  flex flex-col justify-center gap-3">
          <label className="label font-semibold">Username</label>
          <input
            type="text"
            className="input w-full focus:outline-none"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="label font-semibold">Email</label>
          <input
            type="email"
            className="input w-full focus:outline-none"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label font-semibold">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="input w-full pr-12 focus:outline-none"
              placeholder="Enter your password"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="btn-ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-sm px-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
            </Button>
          </div>
          {isFocused && (
            <p className="text-sm text-gray-500 mt-1">
              Create a strong password.
            </p>
          )}

          <label className="label font-semibold">Avatar</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full focus:outline-none"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setAvatar(e.target.files[0]);
              }
            }}
          />

          <div className="flex justify-end mt-4 w-full">
            <Button
              variant="btn-neutral btn-outline btn-sm"
              className="px-4 py-2"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </fieldset>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error.message}</p>
      )}

      <p className="text-sm mt-2 text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="underline font-medium hover:text-black">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
