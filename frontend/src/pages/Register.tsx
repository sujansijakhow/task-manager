import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      console.log("Register success:", response.data);

      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error: any) {
      console.error("Register error:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Top Bar */}
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      {/* Center Register Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md transition">

          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Task Manager Register
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            Create your account to manage your tasks
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md
              focus:outline-none focus:ring-2 focus:ring-primary
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md
              focus:outline-none focus:ring-2 focus:ring-primary
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md hover:opacity-90 transition"
            >
              Register
            </button>

          </form>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;