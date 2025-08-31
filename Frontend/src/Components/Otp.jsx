import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../util/toastmessage";

const Otp = ({ email }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      notify("Please enter OTP", "warn", 2000, "top-right", true);
      return;
    }
    // API finction daal de 
    alert(`OTP ${otp} verified for ${email}`);
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-3xl relative z-10">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Verify OTP
      </h2>

      <p className="text-center text-gray-600 mb-6">
        An OTP has been sent to <span className="font-semibold">{email}</span>
      </p>

      <form onSubmit={handleVerify} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
        />

        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default Otp;
