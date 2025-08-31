import ProductCard from "./ProductCard";

const ProductGrid = ({ products = [], title = "Products" }) => {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        {title}
      </h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </section>
  );
};

export default ProductGrid;
