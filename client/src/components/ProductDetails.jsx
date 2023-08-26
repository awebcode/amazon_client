import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductBadge, ProductRatings } from "./";
import { toast } from "react-toastify";
import { Rating } from "@material-ui/lab";

const ProductDetails = ({ product, ratings }) => {
  const navigate = useNavigate();

  const brandNavigate = (brand) => {
    // Construct the search query string
    const searchQuery = `?brand=${brand}`;

    // Navigate to the search page with the search query
    navigate(`/search${searchQuery}`);

    // Show a toast notification
    // toast.success("Navigating to search page with brand filter");
  };
const options = {
  size: "large",
  value: (product?.ratings) || 0,
  readOnly: true,
  precision: 0.5,
};
  return (
    <div className="mb-1">
      <div className="text-[10px] md:text-[18px] font-medium mb-1">
        <Link to={`/product/${product._id}`}>{product.title}</Link>
      </div>
      <div
        className="text-sm xl:text-base mb-1"
        onClick={() => brandNavigate(product.brand)}
      >
        Brand:{" "}
        <Link to={`/search?brand=${product.brand}`} className="text-green-400">
          {product.brand}
        </Link>
      </div>
      {ratings && (
        // <div className="text-sm xl:text-base mb-1">
        //   <ProductRatings
        //     avgRating={product.numOfReviews || 0}
        //     ratings={product.ratings || 0}
        //   />
        // </div>
        <div className="detailsBlock-2">
          <Rating {...options} size="small" />
          {/* {console.log(data?.product)} */}
          <span className="detailsBlock-2-span"> ({product?.numOfReviews} Reviews)</span>
        </div>
      )}
      <div className="text-xs xl:text-sm font-bold mb-1">{product.attribute}</div>
      <div>
        <ProductBadge badge={product.badge} />
      </div>
    </div>
  );
};

export default ProductDetails;
