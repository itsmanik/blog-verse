const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] text-[#afafaf] py-4 text-center">
      <p className="text-sm">© 2024 Your Website. All Rights Reserved.</p>
      <div className="mt-2 space-x-4">
        <a
          href="https://instagram.com/underlogs"
          className="hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://twitter.com"
          className="hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/manik-hilalpuree"
          className="hover:text-gray-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
export default Footer;
