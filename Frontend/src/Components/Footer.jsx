const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10 text-center text-gray-600 text-sm">
      <p>© {new Date().getFullYear()} Geekhaven-Shop. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-3">
        <a href="#" className="hover:text-indigo-600">About</a>
        <a href="#" className="hover:text-indigo-600">Contact</a>
        <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;
