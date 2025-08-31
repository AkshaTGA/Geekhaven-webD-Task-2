import React, { useEffect, useState } from "react";
import { useUser } from "../context/Usercontext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import NavbarLoggedIn from "../Components/Navbarloggedin";
import { Loader2, Heart, Trash2 } from "lucide-react";

const ProductCard = ({ product, removeFromLiked, isLoading }) => {
  const navigate = useNavigate();
  const image = product.images[0];

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
            className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart functionality (not implemented here)
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromLiked();
            }}
            disabled={isLoading}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const LikedItems = () => {
  const { user, updateUser } = useUser();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [likedProducts, setLikedProducts] = useState([
    {
      _id: "1",
      Productname: "Premium Wireless Headphones",
      description:
        "Experience immersive audio with active noise cancellation, 40 hours of battery life, and a sleek ergonomic design. Perfect for music lovers and professionals.",
      seller: { SellerDetails: { BusinessName: "TechWorld Store" } },
      SKU: "SKU-12345",
      condition: "Used",
      monthsUsed: 2,
      images: [
        "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg",
      ],
      price: 299.99,
    },
    {
      _id: "2",
      Productname: "Apple iPhone 13 Pro",
      description:
        "128GB, Sierra Blue. Excellent performance, ProMotion display, and amazing camera system. Lightly used, fully functional.",
      seller: { SellerDetails: { BusinessName: "SmartDeals Hub" } },
      SKU: "SKU-67890",
      condition: "Refurbished",
      monthsUsed: 5,
      images: [
        "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg",
      ],
      price: 849.99,
    },
    {
      _id: "3",
      Productname: "Gaming Laptop - ROG Strix G15",
      description:
        "Ryzen 7, RTX 3060, 16GB RAM, 1TB SSD. Perfect for gaming and content creation. Well maintained with great performance.",
      seller: { SellerDetails: { BusinessName: "Gamer's Arena" } },
      SKU: "SKU-54321",
      condition: "Used",
      monthsUsed: 10,
      images: [
        "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg",
      ],
      price: 1199.99,
    },
  ]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingItem, setLoadingItem] = useState(null);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedin") === "true");
  }, []);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      if (!user) {
        setLikedProducts([]);
        return;
      }
      setLoadingProducts(true);
      try {
        if (!user?.likedItems || user.likedItems.length === 0) {
          setLikedProducts([]);
          return;
        }
        const responses = await Promise.all(
          user.likedItems.map((itemId) =>
            fetch(`http://localhost:3001/api/item/${itemId}`).then((res) =>
              res.json()
            )
          )
        );
        setLikedProducts(responses);
      } catch (err) {
        console.error("Error fetching liked products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchLikedProducts();
  }, [user]);

  const removeFromLiked = async (productId) => {
    setLoadingItem(productId);
    try {
      const res = await fetch("http://localhost:3001/api/removefromliked", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: productId }),
      });

      const updatedUser = await res.json();
      updateUser(updatedUser);
    } catch (err) {
      console.error("Error removing item from liked:", err);
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <>
      {isloggedIn ? <NavbarLoggedIn /> : <Navbar />}
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-12 px-6">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Your Liked Items
        </h1>

        {loadingProducts ? (
          <div className="flex justify-center items-center h-[70vh]">
            <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
          </div>
        ) : likedProducts.length > 0 ? (
          <section className="py-10">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
              Saved For Later
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {likedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  removeFromLiked={() => removeFromLiked(product._id)}
                  isLoading={loadingItem === product._id}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fadeIn">
            <Heart className="w-20 h-20 text-gray-400 mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              You haven’t liked any items yet
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Start exploring and save your favorite products!
            </p>
            <a
              href="/products"
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Shop Now
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default LikedItems;
