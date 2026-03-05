import { useState } from "react";
import { Eye } from "lucide-react";
import {EyeClosed} from "lucide-react"


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
      <legend className="fieldset-legend text-xl font-semibold">
        Register
      </legend>

      <label className="label">Username</label>
      <input type="text" className="input" placeholder="Enter your username" />

      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Enter your email address"
      />

      <label className="label">Password</label>
      <div className="flex gap-2">
          <input
            type={showPassword ? "text" : "password"}
            className="input flex-1"
            placeholder="Create a strong password"
          />

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        </div>

      <label className="label">Avatar</label>
      <input type="file" className="file-input file-input-bordered" />
    </fieldset>
    </div>
  );
};

export default RegisterPage;
