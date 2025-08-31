import { useEffect, useState } from "react";
import { Mail, Key } from "lucide-react";
import { notify } from "../util/toastmessage";
import { ToastContainer } from "react-toastify";
import validator from "validator";
import Handlelogin from "../util/Login";
import { useUser } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { updateUser, user } = useUser();
  const navigate = useNavigate();
  const validate = () => {
    if (!email) {
      notify("Email is required", "warn", 2000, "top-right", true);
      return false;
    } else if (validator.isEmail(email) === false) {
      notify("Email is invalid", "warn", 2000, "top-right", true);
      return false;
    }

    if (!password) {
      notify("Password is required", "warn", 2000, "top-right", true);
      return false;
    } else if (password.length < 6) {
      notify(
        "Password must be at least 6 characters",
        "warn",
        2000,
        "top-right",
        true
      );
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (validate()) {
        const loginResponse = await Handlelogin(email, password);
        updateUser(loginResponse.userObj);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      notify("Login successful", "success", 1500, "bottom-right", true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <ToastContainer />

      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-indigo-200 rounded-full opacity-30 animate-pulse"></div>

      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-8 animate-pulse">
        Geekhaven-Shop
      </h1>

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-3xl relative z-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="relative">
            <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div className="relative">
            <Key className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="hover:text-blue-600 transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit" disabled={isLoading}
            className={`${isLoading?"bg-gray-400":"bg-gradient-to-r  from-blue-500 to-indigo-600"} mt-4 text-white py-2 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105`}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
