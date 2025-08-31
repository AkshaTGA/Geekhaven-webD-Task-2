import React, { useEffect, useState } from "react";
import { useUser } from "../context/Usercontext";
import {
  Loader2,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import NavbarLoggedIn from "../Components/Navbarloggedin";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user, updateUser } = useUser();
  const [cartProducts, setCartProducts] = useState([]);
  const [loadingItem, setLoadingItem] = useState(null);
  const [priceBreakup, setPriceBreakup] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedin") === "true");
  }, []);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user?.Cart?.length) {
        setCartProducts([]);
        return;
      }
      setLoadingProducts(true);
      try {
        const responses = await Promise.all(
          user.Cart.map((item) =>
            fetch(`http://localhost:3001/api/item/${item.Item}`).then((res) =>
              res.json()
            )
          )
        );

        const merged = responses.map((product, idx) => ({
          ...product,
          qty: user.Cart[idx].quantity,
        }));

        setCartProducts(merged);
      } catch (err) {
        console.error("Error fetching cart products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchCartProducts();
  }, [user?.Cart]);

  useEffect(() => {
    if (!user?.Cart?.length) return;

    const fetchPriceBreakup = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/priceBreakup", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setPriceBreakup(data);
      } catch (err) {
        console.error("Error fetching price breakup:", err);
      }
    };

    fetchPriceBreakup();
  }, [user?.Cart]);

  const updateQty = async (productId, newQty) => {
    setLoadingItem(productId);
    try {
      const res = await fetch("http://localhost:3001/api/addtocart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: productId, qty: newQty }),
      });

      const updatedUser = await res.json();
      if (updatedUser._id) updateUser(updatedUser);
    } catch (err) {
      console.error("Error updating qty:", err);
    } finally {
      setLoadingItem(null);
    }
  };

  const removeItem = async (productId) => {
    setLoadingItem(productId);
    try {
      const res = await fetch("http://localhost:3001/api/removefromcart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: productId }),
      });

      const updatedUser = await res.json();
      if (updatedUser._id) updateUser(updatedUser);
    } catch (err) {
      console.error("Error removing item:", err);
    } finally {
      setLoadingItem(null);
    }
  };

  return (
    <>
      {isloggedIn ? <NavbarLoggedIn /> : <Navbar />}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-indigo-100 p-8 flex justify-center">
        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {loadingProducts ? (
                <div className="flex justify-center items-center h-[70vh]">
                  <Loader2 className="animate-spin w-12 h-12 text-indigo-600" />
                </div>
              ) : cartProducts.length > 0 ? (
                cartProducts.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-6 w-full max-w-[70%]">
                      <div className="relative">
                        <img
                          src={item?.images[0]}
                          alt={item.Productname}
                          className="w-28 h-28 object-cover rounded-2xl border border-gray-200 shadow-sm"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gray-100/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                          {item.Productname}
                        </h2>
                        <p className="text-indigo-700 text-lg font-semibold">
                          ₹{item.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Sold by: {item.seller.SellerDetails.BussinessName},{" "}
                          {item.seller.SellerDetails.BussinessCity}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800">
                            {item.ProductCondition}
                          </span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 capitalize">
                            {item.category}
                          </span>
                        </div>
                        <div className="relative group">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 text-white text-sm p-2 rounded-lg shadow-lg max-w-xs">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1 shadow-sm">
                        {item.qty > 1 && (
                          <button
                            onClick={() =>
                              updateQty(item._id, Number(item.qty) - 1)
                            }
                            disabled={loadingItem === item._id}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                          >
                            <Minus className="w-5 h-5" />
                          </button>
                        )}
                        <span className="px-4 py-2 text-gray-800 font-semibold text-lg">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item._id, Number(item.qty) + 1)
                          }
                          disabled={
                            loadingItem === item._id ||
                            !item.CurrentlyAvailable ||
                            item.qty >= item.Stock
                          }
                          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        disabled={loadingItem === item._id}
                        className="text-red-600 font-semibold hover:text-red-700 transition-all duration-200 flex items-center space-x-2"
                      >
                        {loadingItem === item._id ? (
                          <Loader2 className="animate-spin w-6 h-6" />
                        ) : (
                          <>
                            <Trash2 className="w-5 h-5" />
                            <span>Remove</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fadeIn">
                  <ShoppingCart className="w-20 h-20 text-gray-400 mb-6 animate-pulse" />
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mt-3 text-lg">
                    Discover amazing products and start shopping now!
                  </p>
                  <Link
                    to={"/"}
                    className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Shop Now
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-8 animate-slideUp">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
                Order Summary
              </h2>
              {priceBreakup ? (
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">
                      ₹{priceBreakup.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Platform Fee</span>
                    <span className="font-semibold">
                      ₹{priceBreakup.platformFee.toLocaleString()}
                    </span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹
                      {(
                        priceBreakup.subtotal + priceBreakup.platformFee
                      ).toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full mt-6 py-4 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <ArrowRight className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-fadeIn">
            <ShoppingCart className="w-20 h-20 text-gray-400 mb-6 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Discover amazing products and start shopping now!
            </p>
            <Link
              to={"/"}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
