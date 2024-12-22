import { useEffect, useState } from "react";
import { Heading, Button } from "@radix-ui/themes";
import api from "../utils/axios";
import Select from "react-select";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const tagStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#121212",
      borderColor: state.isFocused ? "#3b82f6" : "#374151",
      color: "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#121212",
      borderRadius: "0.375rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0044b3"
        : state.isFocused
        ? "#000000"
        : "#121212",
      color: state.isSelected ? "#f9fafb" : "#d1d5db",
      cursor: "pointer",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      color: "#d1d5db",
      borderRadius: "0.375rem",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#d1d5db",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#9ca3af",
      "&:hover": {
        backgroundColor: "#ef4444",
        color: "#ffffff",
      },
    }),
  };

  const getTags = async () => {
    const response = await api.get("blogs/tags/");
    setTags(response.data);
    setOptions(
      response.data.map((tag) => {
        return { value: tag.name, label: tag.name, id: tag.id };
      })
    );
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagIds = selectedTags.map((tag) => {
      return tag.id;
    });
    try {
      const response = await api.post("blogs/create/", {
        title: title,
        content: description,
        tags: tagIds,
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

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Tags
          </label>
          <Select
            isMulti
            name="tags"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            styles={tagStyles}
            onChange={(selectedOptions) => {
              setSelectedTags(selectedOptions || []);
            }}
          />
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
        {preview &&
          {
            /* <div className="mt-4">
            <p className="text-gray-300 mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div> */
          }}

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
