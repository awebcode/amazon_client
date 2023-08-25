import { Link } from "react-router-dom";
import { ProductBadge, ProductRatings } from "./";

const ProductDetails = ({ product, ratings }) => {
  return (
    <div className="mb-1">
      <div className="text-[10px] md:text-[18px] font-medium mb-1">
        <Link to={`/product/${product._id}`}>{product.title}</Link>
      </div>
      <div className="text-sm xl:text-base mb-1">
        Brand: <span className="text-green-400">{product.brand}</span>
      </div>
      {ratings && (
        <div className="text-sm xl:text-base mb-1">
          <ProductRatings
            avgRating={product.avgRating || 0}
            ratings={product.ratings || 0}
          />
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