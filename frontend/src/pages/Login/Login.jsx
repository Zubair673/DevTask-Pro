import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // Login
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // ===============================
      // Save Authentication Data
      // ===============================
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // ===============================
      // Check User Role
      // ===============================
      console.log("Logged in user:", data.user);
      console.log("User role:", data.user.role);

      toast.success(data.message);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* ===============================
            Header
        =============================== */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            DevTask
          </h1>

          <h2 className="text-2xl font-semibold mt-5">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue your developer journey.
          </p>
        </div>

        {/* ===============================
            Login Form
        =============================== */}
        <form
          onSubmit={handleLogin}
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

          {/* Password */}
          <div className="mb-3">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Show Password */}
          <div className="flex justify-between items-center mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              <span className="text-sm">
                Show Password
              </span>
            </label>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              <span className="text-sm">
                Remember Me
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition cursor-pointer"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Login;