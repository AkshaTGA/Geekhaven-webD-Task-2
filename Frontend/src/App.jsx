import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import ProductPage from "./Pages/Productpage.jsx";
import Login from "./Pages/Login.jsx";
import Signup_Buyer from "./Pages/Signup_Buyer.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
          <Homepage />
        
      ),
    },
    {
      path: "/product/:id",
      element: (
          <ProductPage />
        
      ),
    },
    {
      path: "/Login",
      element: (
          <Login />
      ),
    },
    {
      path: "/Signup",
      element: (
          <Signup_Buyer />
      ),
    },
    
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
