import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-blue-600">
            DevTask
          </h1>

          <h2 className="text-2xl font-semibold mt-5">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Register to start managing your tasks.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="mt-8"
        >

          {/* Name */}

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

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

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          {/* Checkboxes */}

          <div className="flex justify-between mb-6">

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

            <label className="flex items-center gap-2 cursor-pointer">

              <input
                type="checkbox"
                checked={showConfirmPassword}
                onChange={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />

              <span className="text-sm">
                Show Confirm
              </span>

            </label>

          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition cursor-pointer"
          >

            {loading ? "Creating Account..." : "Register"}

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </section>

  );

}

export default Register;