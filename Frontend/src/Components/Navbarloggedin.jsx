import { BadgeInfo, Heart, Store, User, ShoppingCart } from "lucide-react";
import CategoryLister from "./CategoryLister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/Usercontext";
import Handlelogin from "../util/Login";

const NavbarLoggedIn = () => {
  const { user, clearUser } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    console.log("Logging out...");
    clearUser();
    sessionStorage.removeItem("isLoggedIn");
    await fetch("http://localhost:3001/api/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-md px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold text-indigo-700 tracking-wide cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          Geekhaven-Shop
        </div>

        {/* Search */}
        <div className="flex justify-center flex-1 mx-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[380px] px-4 py-2 rounded-full border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6 ">
          <button
            onClick={() => navigate("/about")}
            className="flex items-center space-x-2 text-gray-700 hover:text-purple-500 font-medium hover:border-1 p-2 rounded-xl transition transform hover:scale-105 cursor-pointer"
          >
            <BadgeInfo className="w-5 h-5" />
            <span>About</span>
          </button>

          {/* Liked with badge */}
          <div className="relative">
            <button
              onClick={() => navigate("/liked")}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-500 font-medium p-2 hover:border-1 rounded-xl transition transform hover:scale-105 cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              <span>Liked</span>
            </button>
            {user?._id && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {user.likedItems.length}
              </span>
            )}
          </div>

          {/* Cart with badge */}
          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium p-2 hover:border-1 rounded-xl transition transform hover:scale-105 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </button>
            {user?._id  && (
              <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {user.Cart.length}
              </span>
            )}
          </div>

          {user?.role !== "seller" && (
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 p-2 rounded-xl hover:border-1 font-medium transition transform hover:scale-105 cursor-pointer"
              onClick={() => user ? navigate("/partner/signup") :<Handlelogin/>}
            >
              <Store className="w-5 h-5" />
              <span>Become Seller</span>
            </button>
          )}

          {/* User dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 hover:border-1 p-2 rounded-xl font-medium transition transform hover:scale-105 cursor-pointer">
              <User className="w-5 h-5" />
              <span>{user?.firstname}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100 transition"
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
