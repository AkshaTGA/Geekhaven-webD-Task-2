import { Heart, LogIn, Store,BadgeInfo } from "lucide-react";
import CategoryLister from "./CategoryLister";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r  from-blue-50 to-indigo-100 shadow-md px-8 py-4 flex items-center justify-between">
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

        <div className="flex items-center space-x-6">
          <button  onClick={() => navigate("/about")} className="flex items-center space-x-2 text-gray-700 hover:text-purple-500 font-medium hover:border-1 p-2 rounded-xl transition transform hover:scale-105 cursor-pointer">
            <BadgeInfo className="w-5 h-5" />
            <span>About</span>
          </button>
          <button  onClick={() => navigate("/liked")} className="flex items-center space-x-2 text-gray-700 hover:text-red-500 font-medium hover:border-1 p-2 rounded-xl transition transform hover:scale-105 cursor-pointer">
            <Heart className="w-5 h-5" />
            <span>Liked Items</span>
          </button>
          <button  onClick={() => navigate("/become-seller")} className="flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:border-1 p-2 rounded-xl  font-medium transition transform hover:scale-105 cursor-pointer">
            <Store className="w-5 h-5" />
            <span>Become Seller</span>
          </button>
          <button  onClick={() => navigate("/login")} className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 hover:border-1 p-2 rounded-xl  font-medium transition transform hover:scale-105 cursor-pointer">
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </button>
        </div>
      </nav>
      <CategoryLister className="relative z-50" />
    </div>
  );
};

export default Navbar;
