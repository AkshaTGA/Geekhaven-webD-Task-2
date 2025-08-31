import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const image = product.images[0];
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition  flex flex-col"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={image}
        alt={product.Productname}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1">SKU: {product.SKU}</p>
        <h3 className="text-gray-700 font-semibold text-lg truncate">
          {product.Productname}
        </h3>
        <p className="text-indigo-600 font-bold mt-1">₹{product.price}</p>
        <p className="text-sm text-gray-600 mt-2">
          Condition:{" "}
          <span className="font-medium">
            {product.condition === "New"
              ? "New"
              : product.condition === "Refurbished"
              ? "Refurbished"
              : `Used (${product.monthsUsed} months)`}
          </span>
        </p>

        <button
          className="mt-2 cursor-pointer w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
