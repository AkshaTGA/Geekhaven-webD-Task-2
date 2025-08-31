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
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <Signup_Buyer />,
    },
    {
      path: "/liked",
      element: <LikedItems />,
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
          console.log(userdata._id);
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
