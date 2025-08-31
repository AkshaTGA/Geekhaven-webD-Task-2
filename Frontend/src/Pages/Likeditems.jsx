import React from "react";
import ProductGrid from "../Components/ProductGrid";

const LikedItems = () => {
  const sampleProducts = [
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
      "https://images.pexels.com/photos/12882907/pexels-photo-12882907.jpeg"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        ❤️ Your Liked Items
      </h1>

      {sampleProducts.length > 0 ? (
        <ProductGrid products={sampleProducts} title="Saved For Later" />
      ) : (
        <div className="text-center text-gray-600 text-lg">
          You haven’t liked any items yet 😢
        </div>
      )}
    </div>
  );
};

export default LikedItems;
