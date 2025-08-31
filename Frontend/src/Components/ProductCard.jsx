import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext";
import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";

const ProductCard = ({ product }) => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const image = product.images[0];
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [loadingToggleLiked, setLoadingToggleLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const isLiked = user?.likedItems?.includes(product._id);

  const addToCart = async () => {
    setLoadingAddToCart(true);
    try {
      const res = await fetch("http://localhost:3001/api/addtocart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: product._id, qty: 1 }),
      });

      const updatedUser = await res.json();
      if (updatedUser._id) updateUser(updatedUser);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setLoadingAddToCart(false);
    }
  };

  useEffect(() => {
    const isInCart = user?.Cart.some(
      (cartItem) => cartItem.Item.toString() === product?._id.toString()
    );
    setAddedToCart(isInCart);
  }, [user?.Cart, product?._id]);

  const toggleLiked = async () => {
    setLoadingToggleLiked(true);
    const endpoint = isLiked
      ? "http://localhost:3001/api/removefromliked"
      : "http://localhost:3001/api/addtoliked";
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: product._id }),
      });

      const updatedUser = await res.json();
      if (updatedUser._id) updateUser(updatedUser);
    } catch (err) {
      console.error(
        `Error ${isLiked ? "removing from" : "adding to"} liked items:`,
        err
      );
    } finally {
      setLoadingToggleLiked(false);
    }
  };

  return (
    <div
      className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={image}
        alt={product.Productname}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1">SKU: {product.SKU}</p>
        <h3 className="text-gray-700 font-semibold text-lg truncate">
          {product.Productname}
        </h3>
        <p className="text-indigo-600 font-bold mt-1">
          ₹{product.price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Condition:{" "}
          <span className="font-medium">
            {product.ProductCondition === "New"
              ? "New"
              : product.ProductCondition === "Refurbished"
              ? "Refurbished"
              : `Used (${product.monthsUsed || 0} months)`}
          </span>
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            className="flex-1 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition disabled:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            disabled={loadingAddToCart || loadingToggleLiked || addedToCart}
          >
            {loadingAddToCart ? (
              <Loader2 className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              `${addedToCart ? "Added to Cart" : "Add to Cart"}`
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLiked();
            }}
            disabled={loadingAddToCart || loadingToggleLiked}
            className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
              isLiked
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            }`}
          >
            {loadingToggleLiked ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-600" : ""}`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
