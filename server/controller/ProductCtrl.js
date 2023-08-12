import { Product } from "../Model/ProductModel.js";

import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary"; // Import cloudinary properly

export const createProduct = async (req, res, next) => {
  try {

   
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    //product.save()
    console.log(product)
    return res
      .status(201)
      .json({ success: true, msg: "Product Created Successfully", product });
  } catch (error) {
    // return res.status(500).json({ success: false, msg: error });
    console.log(error)
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const resultPerpage = 8;
    const productsCount = await Product.countDocuments();
console.log(req.query)
    const apiFeatures = new ApiFeatures(
      Product.find(), //{user:req.user._id} for only user her own data
      req.query
    )
       .search()
      .filter()
      .sorting()

      .pagination(resultPerpage);
    const products = await apiFeatures.query;
    //  console.log(products)
    let filteredProductsCount = products.length;
    res.status(200).json({
      success: true,

      msg: "All Products",
      resultPerpage,
      products,
      productsCount,
      filteredProductsCount,
      
    });
  } catch (error) {
    console.log(error)
    return next(new ErrorHandler(error.message, 500));
  }
};
//get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.msg });
  }
};
//get user product
export const getAllUserProduct =async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id })
    res.status(200).json({success:true,products})
  } catch (error) {
    res.status(500).json({ success: false, msg: error.msg });
  }
}
// Delete Product

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //Deleting Images From Cloudinary
  for (let i = 0; i < product.images?.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i]?.public_id);
  }

  await product.deleteOne()
  res.status(200).json({
    success: true,
    msg: "Product Delete Successfully",
  });
};
// Update Product -- Admin

export const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
console.log("update",product)
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //   // Images Start Here
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // if (images !== undefined) {
  //   // Deleting Images From Cloudinary
  //   for (let i = 0; i < product.images.length; i++) {
  //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  //   }

  //   const imagesLinks = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const result = await cloudinary.v2.uploader.upload(images[i], {
  //       folder: "products",
  //     });

  //     imagesLinks.push({
  //       public_id: result.public_id,
  //       url: result.secure_url,
  //     });
  //   }

  //   req.body.images = imagesLinks;
  // }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
};
//details product
export const getProductDetails = async (req, res, next) => {
 try {
   const product = await Product.findById(req.params.id).populate("user");

   if (!product) {
     return next(new ErrorHandler("Product not found", 404));
   }

   res.status(200).json({
     success: true,
     product,
   });
 } catch (error) {
   console.log(error.msg);
  return next(new ErrorHandler(error.message, 500));
 }
};
