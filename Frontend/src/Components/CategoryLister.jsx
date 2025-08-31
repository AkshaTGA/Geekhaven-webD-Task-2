import { useState } from "react";
import { createPortal } from "react-dom";

const CategoryLister = () => {
  const categories = [
    { name: "Electronics", sub: ["Mobiles", "Laptops", "Headphones", "Cameras"] },
    { name: "Fashion", sub: ["Men", "Women", "Kids", "Accessories"] },
    { name: "Home", sub: ["Furniture", "Kitchen", "Decor"] },
    { name: "Books", sub: ["Fiction", "Non-Fiction", "Comics"] },
    { name: "Sports", sub: ["Cricket", "Football", "Fitness"] },
    { name: "Toys", sub: ["Action Figures", "Educational", "Board Games"] },
    { name: "Groceries", sub: ["Fruits", "Vegetables", "Snacks", "Beverages"] },
    { name: "Beauty", sub: ["Makeup", "Skincare", "Haircare"] },
    { name: "Automotive", sub: ["Car Accessories", "Bike Accessories", "Oils"] },
  ];

  const [hovered, setHovered] = useState(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (idx, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    setHovered(idx);
  };

  const handleMouseLeave = () => setHovered(null);

  return (
    <div className="w-full bg-gray-100 py-3 shadow-sm overflow-x-auto whitespace-nowrap relative">
      <div className="max-w-7xl mx-auto flex gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="relative inline-block"
            onMouseEnter={(e) => handleMouseEnter(idx, e)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="px-4 py-2 font-medium text-gray-700 hover:text-blue-600 rounded-md transition">
              {cat.name}
            </button>
          </div>
        ))}
      </div>

      {hovered !== null &&
        createPortal(
          <div
            className="bg-white shadow-lg rounded-md min-w-[150px] z-50"
            style={{ position: "absolute", top: coords.top, left: coords.left }}
            onMouseEnter={() => setHovered(hovered)}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="flex flex-col">
              {categories[hovered].sub.map((sub, i) => (
                <li
                  key={i}
                  className="px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition"
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CategoryLister;
