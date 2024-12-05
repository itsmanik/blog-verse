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
      }
    } catch (error) {
      alert("Error creating blog");
    }

    // Reset form fields
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-customGray rounded-lg shadow-lg">
      <Heading size="7" className="mb-6 text-center text-gray-200">
        Create a New Blog
      </Heading>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full px-4 py-2 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Blog Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter blog description"
            rows="5"
            className="w-full px-4 py-2 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        {/* <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div> */}

        {/* Image Preview */}
        {preview && (
          {/* <div className="mt-4">
            <p className="text-gray-300 mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div> */}
        )}

        {/* Submit Button */}
        <Button
          as="button"
          type="submit"
          variant="primary"
          size="large"
          className="w-full text-lg"
        >
          Create Blog
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
