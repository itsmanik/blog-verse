import classes from "./CreateBlog.module.css";
import { useState } from "react";
import { Heading, Button } from "@radix-ui/themes";
import api from "../utils/axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("blogs/create/", {
        title: title,
        content: description,
      });
      if (response.status === 201) {
        alert("Blog created successfully");
      }
    } catch (error) {
      alert("error creating blog");
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="blog-form-container m-8">
      <Heading size={"7"} className="mb-4">
        Create a new blog
      </Heading>
      <form className="blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="mb-2"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter blog description"
            rows="5"
            className="mb-2"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-6"
          />
        </div>
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <button type="submit" className="bg-primaryColor px-4 py-2 rounded-lg">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
