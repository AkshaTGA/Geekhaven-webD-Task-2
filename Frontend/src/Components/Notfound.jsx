import { useNavigate } from "react-router-dom";
import { Box } from "lucide-react";

const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[84vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4 animate-pulse">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">
        Product Not Found
      </p>
      <p className="text-gray-500 mb-6">
        Sorry, the product you are looking for does not exist or has been removed.
      </p>

      <Box className="w-32 h-32 text-indigo-300 mb-6 animate-bounce" />

      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform hover:scale-105"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ProductNotFound;
