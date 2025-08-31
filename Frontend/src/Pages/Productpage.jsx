import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams} from "react-router-dom";
import NavbarLoggedIn from "../Components/Navbarloggedin";

const ProductPage = () => {
  const { id } = useParams();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(sessionStorage.getItem("isloggedin"))
    setIsLoggedIn(sessionStorage.getItem("isLoggedin") === "true" ? true : false);
  }, []);
  const [product, setProduct] = useState({
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
  });
  const [isLoading, setIsLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(product.price);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    setIsLoading(true);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/item/${id}`);
        const data = await response.json();
        setProduct(data);
        const random = Math.floor(Math.random() * 30);
        setDiscount(random);
        setSelectedImage(data.images[0]);
        setDiscountedPrice(data.price - (data.price * random) / 100);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[prevIndex]);
  };

  const handleNextImage = () => {
    const currentIndex = product.images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[nextIndex]);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-white min-h-screen">
      {isloggedIn ? <NavbarLoggedIn /> : <Navbar />}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
              <div className="relative h-[500px] flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 ease-out"
                />
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-full shadow-lg hover:from-gray-900 hover:to-black transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-full shadow-lg hover:from-gray-900 hover:to-black transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex gap-3 p-4 justify-center bg-white">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedImage === img
                        ? "border-blue-500 scale-110 shadow-md"
                        : "border-gray-200 hover:scale-105 hover:shadow-sm"
                    }`}
                  />
                ))}
              </div>
            </div>


            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between transform hover:scale-[1.01] transition-transform duration-300">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  {product.Productname}
                </h1>
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-3xl font-extrabold text-blue-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ${product.price.toFixed(0)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  {product.description}
                </p>
                <div className="space-y-4 text-gray-700 text-lg">
                  <p>
                    <span className="font-semibold text-gray-900">Seller:</span>{" "}
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {product.seller.SellerDetails.BussinessName}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">SKU:</span>{" "}
                    <span className="bg-gray-100 px-2 py-1 rounded-md text-sm font-mono text-gray-800">
                      {product.SKU}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Condition:</span>{" "}
                    {product.condition === "New" ? (
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                        New 
                      </span>
                    ) : (
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">
                        Used – {product.monthsUsed} months
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <button className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2">
                  Add to Cart
                </button>
                <button className="px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-lg font-semibold rounded-xl shadow-md hover:from-gray-200 hover:to-gray-300 transition-all duration-200 flex items-center justify-center gap-2">
                  <span>❤️</span> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;