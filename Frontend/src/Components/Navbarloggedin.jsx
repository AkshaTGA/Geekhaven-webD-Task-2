import { BadgeInfo, Heart, Store, User } from "lucide-react";
import CategoryLister from "./CategoryLister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavbarLoggedIn = ({ user = { name: "Guest", role: "buyer" } }) => {

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-md px-8 py-4 flex items-center justify-between">

        <div
          className="text-2xl font-extrabold text-indigo-700 tracking-wide cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          Geekhaven-Shop
        </div>

        <div className="flex justify-center flex-1 mx-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[380px] px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center space-x-6 ">
          <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-500 font-medium hover:border-1 p-2 rounded-xl transition transform hover:scale-105 cursor-pointer">
            <BadgeInfo className="w-5 h-5" />
            <span>About</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-700 hover:text-red-500 font-medium p-2 hover:border-1 rounded-xl transition transform hover:scale-105 cursor-pointer">
            <Heart className="w-5 h-5" />
            <span>Liked Items</span>
          </button>

          {user.role !== "seller" && (
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 p-2 rounded-xl hover:border-1 font-medium transition transform hover:scale-105 cursor-pointer"
              onClick={() => navigate("/become-seller")}
            >
              <Store className="w-5 h-5" />
              <span>Become Seller</span>
            </button>
          )}

          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 hover:border-1 p-2 rounded-xl font-medium transition transform hover:scale-105 cursor-pointer">
              <User className="w-5 h-5" />
              <span>{user.name}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:border-1 transition"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
                  onClick={() => navigate("/transactions")}
                >
                  Your Transactions
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>


      <CategoryLister className="relative z-50" />
    </div>
  );
};

export default NavbarLoggedIn;
