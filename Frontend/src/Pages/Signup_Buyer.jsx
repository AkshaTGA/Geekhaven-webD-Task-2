import { useState } from "react";
import { User, Mail, Key, ShoppingCart, Tag, Package } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../util/toastmessage";
import validator from "validator";
import Otp from "../Components/Otp.jsx";

const Signup_Buyer = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpStep, setOtpStep] = useState(false);

  const validate = () => {
    if (!fname.trim()) {
      notify("First Name is required", "warn", 2000, "top-right", true);
      return false;
    }
    if (!lname.trim()) {
      notify("Last Name is required", "warn", 2000, "top-right", true);
      return false;
    }
    if (!email) {
      notify("Email is required", "warn", 2000, "top-right", true);
      return false;
    }
    if (!validator.isEmail(email)) {
      notify("Email is invalid", "warn", 2000, "top-right", true);
      return false;
    }
    if (!password) {
      notify("Password is required", "warn", 2000, "top-right", true);
      return false;
    }
    if (password.length < 6) {
      notify("Password must be at least 6 characters", "warn", 2000, "top-right", true);
      return false;
    }
    if (password !== confirmPassword) {
      notify("Passwords do not match", "warn", 2000, "top-right", true);
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (validate()) {
      //  API Emali wala daalna hai idhar
      notify("OTP sent to your email", "success", 2000, "top-right", true);
      setOtpStep(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      <ToastContainer />

      <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-72 h-72 bg-indigo-200 rounded-full opacity-30 animate-pulse"></div>

      <ShoppingCart className="absolute top-20 left-10 w-30 h-30 text-blue-300 opacity-40 animate-pulse" />
      <Tag className="absolute top-40 right-20 w-50 h-50 text-indigo-300 opacity-40 animate-pulse" />
      <Package className="absolute bottom-32 left-16 w-50 h-50 text-purple-300  opacity-40 animate-pulse" />
      <ShoppingCart className="absolute bottom-20 right-10 w-30 h-30 text-blue-300 opacity-40 animate-pulse" />

      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 mb-8 animate-pulse">
        Geekhaven-Shop
      </h1>

      {!otpStep ? (
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-3xl relative z-10">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div className="relative">
              <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full px-10 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full px-10 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

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

            <div className="relative">
              <Key className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-10 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Send OTP
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      ) : (
        <Otp email={email} />
      )}
    </div>
  );
};

export default Signup_Buyer;
