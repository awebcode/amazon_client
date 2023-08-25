import React, { useState } from "react";
import "./product.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/productApi";
import axios from "axios"
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/action";
import { uploadFile } from "../../utils/upload";
const CreateProductComponent = () => {
   const [createProduct, { isLoading, isError }] = useCreateProductMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id}=useParams()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    images: [],
  });

  const { title, description, tags, category, images } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleProductCreation = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.set("title", title);
      // formData.set("desc", description);
      // formData.set("tag", tags);
      // formData.set("category", category);
        let media = [];
        const imgNewURL = images.filter((img) => !img.url);
        const imgOldURL = images.filter((img) => img.url);
        let uploadedImages = await uploadFile(imgNewURL)
      const formData = {
        title,
        desc: description,
        tag: tags,
        category,
        images: [...uploadedImages],
      };
      const response = await createProduct(formData);
      console.log(response)
       if (response.data.success) {
         navigate("/account");
       }

      // console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="create-product-container">
      <div className="create-product-form">
        <h2>Create Product</h2>
        <form onSubmit={handleProductCreation} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Product Title"
            required
          />
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Product Description"
            required
          />
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleInputChange}
            placeholder="Tags (optional)"
          />
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleInputChange}
            placeholder="Category (optional)"
          />
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageUpload}
            accept="image/*"
          />
          <div className="image-preview">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="preview-image"
              />
            ))}
          </div>
          <button className="create-product-btn" type="submit">
            {isLoading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductComponent;
