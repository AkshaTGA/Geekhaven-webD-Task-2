const CategorySection = () => {
  const categories = [
    { name: "Electronics", img: "https://img.icons8.com/color/96/laptop.png" },
    { name: "Fashion", img: "https://img.icons8.com/color/96/t-shirt.png" },
    { name: "Home", img: "https://img.icons8.com/color/96/sofa.png" },
    { name: "Books", img: "https://img.icons8.com/color/96/books.png" },
    { name: "Sports", img: "https://img.icons8.com/color/96/basketball.png" },
    { name: "Toys", img: "https://img.icons8.com/color/96/teddy-bear.png" },
    {
      name: "Groceries",
      img: "https://img.icons8.com/color/96/shopping-cart.png",
    },
    { name: "Beauty", img: "https://img.icons8.com/color/96/makeup.png" },
    { name: "Automotive", img: "https://img.icons8.com/color/96/car.png" },
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-gray-50">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <h2 className="relative text-3xl font-extrabold text-center text-gray-800 mb-10">
        Shop by Category
      </h2>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white shadow-sm rounded-xl p-6 hover:shadow-md transition cursor-pointer w-40"
          >
            <img src={cat.img} alt={cat.name} className="w-16 h-16 mb-3" />
            <p className="text-gray-700 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
