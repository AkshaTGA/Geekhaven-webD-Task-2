import Navbar from "../Components/Navbar";
import Carosal from "../Components/Carosal";
import CategorySection from "../Components/CategorySection";
import ProductGrid from "../Components/ProductGrid";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import NavbarLoggedIn from "../Components/Navbarloggedin";

const Homepage = () => {
    const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      console.log(sessionStorage.getItem("isloggedin"))
      setIsLoggedIn(sessionStorage.getItem("isLoggedin") === "true" ? true : false);
    }, []);
  const images = [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600",
    "https://images.unsplash.com/photo-1606813902914-3c87fa8b4cd1?w=1600",
  ];




  const featuredProducts = [
    {
      sku: "SKU-12345",
      name: "Wireless Headphones",
      price: "$59.99",
      condition: "used",
      monthsUsed: 4,
      img: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=400",
    },
    {
      sku: "SKU-67890",
      name: "Smart Watch",
      price: "$129.99",
      condition: "new",
      monthsUsed: 0,
      img: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=400",
    },
  ];

  const fashionProducts = [
    {
      sku: "SKU-24680",
      name: "Casual Sneakers",
      price: "$89.99",
      condition: "used",
      monthsUsed: 10,
      img: "https://images.unsplash.com/photo-1528701800489-20be9c1e6b0c?w=400",
    },
    {
      sku: "SKU-13579",
      name: "Leather Backpack",
      price: "$149.99",
      condition: "new",
      monthsUsed: 0,
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400",
    },
  ];

  return (
    <>
      {isloggedIn ? <NavbarLoggedIn/> : <Navbar />}
      <Carosal images={images} />
      <CategorySection />

      <ProductGrid products={featuredProducts} title="Featured Products" />
      <ProductGrid products={fashionProducts} title="Fashion Picks" />

      <Footer />
    </>
  );
};

export default Homepage;
