import { Link } from "react-router";

const Welcome = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r flex items-center justify-center">
      <div className="text-center text-gray-300 px-6">
        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold mb-4 text-gray-100">
          Welcome to Your <span className="text-[#9d56f3]">Blogging Space</span>
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
          Share your thoughts, connect with others, and explore a world of
          stories. Start your blogging journey with us today!
        </p>
        <Link to="/register">
          <button className="bg-primaryColor text-white hover:bg-[#43157b] px-8 py-4 rounded-full font-semibold shadow-lg transition duration-300">
            Sign Up Now
          </button>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Dark Themed Blurred Elements */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-indigo-800 rounded-full blur-3xl opacity-20 transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
