import React, { useState, useEffect } from "react";
import "./product.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/productApi";
import { uploadFile } from "../../utils/upload";

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdating = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    tag: "",
    category: "",
    images: [],
  });

  const { title, desc, tag, category, images } = formData;

  const { data: initialProductData } = useGetProductDetailsQuery(id, {
    skip: !isUpdating,
  });

  useEffect(() => {
    if (initialProductData) {
      setFormData(initialProductData.product);
    }
  }, [initialProductData]);

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

  const [updateMutation, { isLoading, isError }] = useUpdateProductMutation();

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      let newImages = images.filter((img) => !img.url); // Filter out already uploaded images
      let uploadedNewImages = [];
      if (newImages.length > 0) {
        uploadedNewImages = await uploadFile(newImages);
      }

      const updatedProductData = {
        title,
        desc,
        tag,
        category,
        images: [
          ...initialProductData.product.images,
          ...uploadedNewImages.map((image) => ({ url: image })),
        ], // Combine old and new images
        id: id,
      };

      const response = await updateMutation(updatedProductData);

      if (response.data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="create-product-container">
      <div className="create-product-form">
        <h2>Edit Product</h2>
        <form onSubmit={handleProductUpdate} encType="multipart/form-data">
          {/* Input fields */}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Product Title"
            required
          />
          <input
            type="text"
            name="desc"
            value={desc}
            onChange={handleInputChange}
            placeholder="Product Description"
            required
          />
          <input
            type="text"
            name="tag"
            value={tag}
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
            {/* Render previous images */}
            {initialProductData?.product?.images?.map((image, index) => (
              // console.log(imag)
              <img
                key={index}
                src={image.url.url}
                alt={`Previous ${index}`}
                className="preview-image"
              />
            ))}

            {/* Render new images */}
                      {images?.map((image, index) => {
                          
                          return (
                            !image.url && (
                              <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                                className="preview-image"
                              />
                            )
                          );
                      }
                
              
            )}
            
          </div>
          <button className="create-product-btn" type="submit">
            {isLoading
              ? isUpdating
                ? "Updating Product..."
                : "Creating Product..."
              : isUpdating
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
