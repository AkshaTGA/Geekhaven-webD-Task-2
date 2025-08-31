import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import ProductPage from "./Pages/Productpage.jsx";
import Login from "./Pages/Login.jsx";
import Signup_Buyer from "./Pages/Signup_Buyer.jsx";
import LikedItems from "./Pages/Likeditems.jsx";
import Cookies from "js-cookie";
import { useUser } from "./context/Usercontext.jsx";
import { useEffect } from "react";
import Signup_Seller from "./Pages/Signup_seller.jsx";
import CartPage from "./Pages/Cart.jsx";

function App() {
  const { updateUser } = useUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup_Buyer />,
    },
    {
      path: "/liked",
      element: <LikedItems />,
    },
    {
      path: "/partner/Signup",
      element: <Signup_Seller />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
  ]);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      await fetch("http://localhost:3001/api/auth/checkauth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(async (data) => {
          return await data.json();
        })
        .then((userdata) => {
          if (userdata._id!=undefined) {
            return updateUser(userdata);
          } else {
            return updateUser(null);
          }
        });
    };
    checkUserLoggedIn();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
