import { ProductBadge, ProductRatings } from "./";

const ProductDetails = ({ product, ratings }) => {
  return (
    <div className="mb-1">
      <div className="text-[12px] md:text-2xl font-medium mb-1">{product.title}</div>
      <div className="text-sm xl:text-base mb-1">
        Brand: <span className="text-green-400">{product.brand}</span>
      </div>
      {ratings && (
        <div className="text-sm xl:text-base mb-1">
          <ProductRatings avgRating={product.avgRating || 0} ratings={product.ratings || 0} />
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
