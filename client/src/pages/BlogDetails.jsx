import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useParams } from "react-router";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await api.get("blogs/" + id);
        setBlog(response.data);
      } catch (error) {
        console.log("nigga");
      }
    }
    fetchBlogDetails();
  }, []);

  const blogLikeHandler = () => {
    try {
      api.post(`blogs/${id}/like/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>{blog.title}</h1>
      <button onClick={blogLikeHandler}>Like</button>
      <p>{blog.content}</p>
    </>
  );
};
export default BlogDetails;
