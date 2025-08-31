import Navbar from "../Components/Navbar";
import Carosal from "../Components/Carosal";
import CategorySection from "../Components/CategorySection";
import ProductGrid from "../Components/ProductGrid";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import NavbarLoggedIn from "../Components/Navbarloggedin";
import { useUser } from "../context/Usercontext";

const Homepage = () => {
  const {user}=useUser();
  const [isloggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("isLoggedin", user ? true : false);
    setIsLoggedIn(sessionStorage.getItem("isLoggedin") === "true");
  }, [user]);
  const images = [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600",
    "https://images.unsplash.com/photo-1606813902914-3c87fa8b4cd1?w=1600",
  ];




  const sampleProducts = [
  {
    _id: "68b1500fa51ae3e838beaa65",
    Productname: "Premium Wireless Headphones",
    description:
      "Experience immersive audio with active noise cancellation, 40 hours of battery life, and a sleek ergonomic design. Perfect for music lovers and professionals.",
    seller: { SellerDetails: { BusinessName: "TechWorld Store" } },
    SKU: "SKU-12345",
    condition: "Used",
    monthsUsed: 2,
    images: [
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
    ],
    price: 299.99,
  },
  {
    _id: "68b0d2db628f935074a567ce",
    Productname: "Apple iPhone 13 Pro",
    description:
      "128GB, Sierra Blue. Excellent performance, ProMotion display, and amazing camera system. Lightly used, fully functional.",
    seller: { SellerDetails: { BusinessName: "SmartDeals Hub" } },
    SKU: "SKU-67890",
    condition: "Refurbished",
    monthsUsed: 5,
    images: [
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
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
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
    ],
    price: 1199.99,
  },
  {
    _id: "4",
    Productname: "Canon EOS M50 Camera",
    description:
      "24.1MP Mirrorless Camera with 15-45mm lens. Great for photography and vlogging. Barely used, like new.",
    seller: { SellerDetails: { BusinessName: "PhotoWorld" } },
    SKU: "SKU-98765",
    condition: "New",
    monthsUsed: 0,
    images: [
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
    ],
    price: 499.99,
  },
  {
    _id: "5",
    Productname: "Nike Air Jordan Sneakers",
    description:
      "Limited edition, size 10. Stylish and comfortable sneakers with a modern design. Hardly worn, excellent condition.",
    seller: { SellerDetails: { BusinessName: "SneakerHub" } },
    SKU: "SKU-11223",
    condition: "Used",
    monthsUsed: 1,
    images: [
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
    ],
    price: 159.99,
  }
];


  return (
    <>
      {isloggedIn ? <NavbarLoggedIn/> : <Navbar />}
      <Carosal images={images} />
      <CategorySection />

      <ProductGrid products={sampleProducts} title="Featured Products" />
      <ProductGrid products={sampleProducts} title="Fashion Picks" />

      <Footer />
    </>
  );
};

export default Homepage;
