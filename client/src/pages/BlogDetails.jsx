import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useParams } from "react-router";

const BlogDetails = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await api.get("blogs/" + id);
        setBlog(response.data);
        setLikes(response.data.likes); // Assuming the API returns the initial likes
        setComments(response.data.comments || []); // Assuming the API returns comments
      } catch (error) {
        console.log(error);
      }
    }
    fetchBlogDetails();
  }, []);

  const blogDeleteHandler = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        await api.delete(`blogs/${id}`);
        alert("Blog deleted successfully!");
        // Redirect or handle after deletion
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await api.post(`blogs/${id}/comments`, {
          comment: newComment,
        });
        setComments([...comments, response.data]); // Assuming the API returns the new comment
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const blogLikeHandler = async () => {
    const res = await api.post(`blogs/${id}/like/`);
    const data = res.data;
    if (data.liked === true) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  return (
    <div className="min-h-screen text-gray-100">
      <div className="max-w-5xl mb-8 mx-auto bg-customGray mt-10 p-6 bg- rounded-lg shadow-lg">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt="Blog"
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl mb-2 font-bold">{blog.title}</h1>
          <button
            className="px-4 py-2 bg-black flex justify-center items-center text-white rounded-lg hover:bg-primaryColor transition"
            onClick={blogLikeHandler}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              aria-label="Number of likes"
              className="w-6 h-6 fill-current text-violet-600"
            >
              <path d="M126.638,202.672H51.986a24.692,24.692,0,0,0-24.242,19.434,487.088,487.088,0,0,0-1.466,206.535l1.5,7.189a24.94,24.94,0,0,0,24.318,19.78h74.547a24.866,24.866,0,0,0,24.837-24.838V227.509A24.865,24.865,0,0,0,126.638,202.672ZM119.475,423.61H57.916l-.309-1.487a455.085,455.085,0,0,1,.158-187.451h61.71Z"></path>
              <path d="M494.459,277.284l-22.09-58.906a24.315,24.315,0,0,0-22.662-15.706H332V173.137l9.573-21.2A88.117,88.117,0,0,0,296.772,35.025a24.3,24.3,0,0,0-31.767,12.1L184.693,222.937V248h23.731L290.7,67.882a56.141,56.141,0,0,1,21.711,70.885l-10.991,24.341L300,169.692v48.98l16,16H444.3L464,287.2v9.272L396.012,415.962H271.07l-86.377-50.67v37.1L256.7,444.633a24.222,24.222,0,0,0,12.25,3.329h131.6a24.246,24.246,0,0,0,21.035-12.234L492.835,310.5A24.26,24.26,0,0,0,496,298.531V285.783A24.144,24.144,0,0,0,494.459,277.284Z"></path>
            </svg>
            <p>&nbsp;&nbsp;{likes}</p>
          </button>
        </div>

        {/* Blog Metadata */}
        <div className="mb-6 text-gray-400">
          <p>
            <span className="font-semibold text-gray-300">Author:</span>{" "}
            {blog.author_username}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Posted on:</span>{" "}
            {new Date(blog.created_at).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Blog Content */}
        <p className="text-md text-gray-300 mb-6 whitespace-pre-line">
          {blog.content}
        </p>

        {/* Comment Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <div className="mb-4">
            <textarea
              className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg"
              rows="3"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              className="mt-2 px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-[#4a1689] transition"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
          <div>
            {comments.length > 0 ? (
              <ul className="space-y-3">
                {comments.map((comment, index) => (
                  <li
                    key={index}
                    className="bg-gray-700 p-3 rounded-lg text-gray-200 shadow"
                  >
                    {comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
