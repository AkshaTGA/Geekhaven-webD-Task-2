const ProductCard = ({ sku, name, price, condition, monthsUsed, img }) => {
  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
      <img
        src={img}
        alt={name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">SKU: {sku}</p>
        <h3 className="text-gray-700 font-semibold text-lg">{name}</h3>
        <p className="text-indigo-600 font-bold mt-1">{price}</p>
        <p className="text-sm text-gray-600 mt-2">
          Condition:{" "}
          <span className="font-medium">
            {condition === "new"
              ? "Brand New"
              : `Used (${monthsUsed} months)`}
          </span>
        </p>
        <button className="mt-3 w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
