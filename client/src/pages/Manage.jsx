import api from "../utils/axios";
import { useEffect, useState } from "react";
import ManageBlogCard from "../components/Card/ManageBlogCard";

const Manage = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await api.get("blogs/my-blogs/");
      setBlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <main className="grid grid-cols-3 gap-4 my-10 mx-8">
        {blogs.map((blog, index) => (
          <ManageBlogCard key={index} blog={blog} onDelete={fetchBlogs} />
        ))}
      </main>
    </>
  );
};
export default Manage;
