import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { login } from "../features/auth/authSlice";
import { fetchTasks, reset } from "../features/task/taskSlice";
import ThemeToggle from "../components/ThemeToggle"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("Login success:", response.data);

      dispatch(
        login({
          token: response.data.token,
          email: email,
        })
      );

      dispatch(reset());
      dispatch(fetchTasks());

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Top Bar */}
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>

      {/* Center Login Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md transition">

          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            Task Manager
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            Login to manage your tasks efficiently
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
              Login
            </button>

          </form>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;