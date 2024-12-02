import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../utils/axios";
import { Grid, Box } from "@radix-ui/themes";
import BlogCard from "../components/Card/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("blogs/");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const context = useContext(AuthContext);
  return (
    <div>
      <main className="grid grid-cols-3 gap-4 my-10 mx-8">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </main>
    </div>
  );
};
export default Home;
