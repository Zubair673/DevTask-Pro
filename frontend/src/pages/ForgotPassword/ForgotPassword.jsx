import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !newPassword || !confirmPassword) {

      toast.error("Please fill all fields");
      return;

    }

    if (newPassword !== confirmPassword) {

      toast.error("Passwords do not match");
      return;

    }

    try {

      setLoading(true);

      const { data } = await API.post("/auth/reset-password", {
        email,
        newPassword,
      });

      toast.success(data.message);

      // Redirect to Login (Replace History)
      navigate("/login", {
        replace: true,
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Password Reset Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-600">
            DevTask
          </h1>

          <h2 className="text-2xl font-semibold mt-5">
            Reset Password
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your registered email and a new password.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >

          {/* Email */}
          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* New Password */}
          <div className="mb-5">

            <label className="block mb-2 font-medium">
              New Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2 mb-6">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />

            <span className="text-sm cursor-pointer">
              Show Password
            </span>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition cursor-pointer"
          >

            {loading ? "Resetting..." : "Reset Password"}

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Remember your password?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </section>

  );

}

export default ForgotPassword;