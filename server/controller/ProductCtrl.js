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

  

    const apiFeatures = new ApiFeatures(
      Product.find(), //{user:req.user._id} for only user her own data
      req.query
    )
      .search()
      .filter() // Pass the filter here
      .sorting()
      .pagination(resultPerpage);

    const products = await apiFeatures.query;
    let filteredProductsCount = products.length;
      // console.log(products)
    res.status(200).json({
      success: true,
      msg: "All Products",
      resultPerpage,
      products,
      productsCount,
      filteredProductsCount,
    });
  } catch (error) {
    console.log(error);
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
//review
// Create New Review or Update the review
export const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
console.log(req.body)
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
    product.ratings = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,message:"Review saved successfully"
  });
}

// Get All Reviews of a product
export const getProductReviews = async (req, res, next) => {
  try {
  
   const product = await Product.findById(req.params.id).populate("reviews.user");

   if (!product) {
     return res.status(404).json({ message: "Product not found" });
   }

   res.status(200).json({
     success: true,
     reviews: product.reviews,
   });
 } catch (error) {
  console.log(error)
 }
}
export const deleteReview = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const updatedReviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId.toString()
    );

    let newRatings = 0;
    let numOfReviews = 0;

    if (updatedReviews.length > 0) {
      const totalRatings = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
      newRatings = totalRatings / updatedReviews.length;
      numOfReviews = updatedReviews.length;
    }

    await Product.updateOne(
      { _id: productId },
      {
        $set: {
          ratings: newRatings,
          numOfRatings: numOfReviews,
          reviews: updatedReviews,
        },
      }
    );

    return res.json({ success: true });
  } catch (error) {
    console.error(error);

    if (error.errors) {
      const validationErrors = Object.keys(error.errors).map(
        (field) => error.errors[field].message
      );
      return res.status(400).json({ success: false, errors: validationErrors });
    }

    return res
      .status(500)
      .json({ success: false, message: "An error occurred while deleting the review" });
  }
};