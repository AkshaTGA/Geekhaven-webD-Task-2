import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carosal = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-[500px] flex-shrink-0 group"
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transition transform hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-indigo-500 hover:text-white transition transform hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 w-full flex justify-center space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-indigo-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carosal;
