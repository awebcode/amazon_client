import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { removeFromCart, decrementInCart, incrementInCart, removeFromWishlist, addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const WishList = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.wishlist.wishlist.products);
  const itemsNumber = useSelector((state) => state.wishlist.wishlist.productsNumber);
  const subtotal = useSelector((state) =>
    state.wishlist.wishlist.products.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );
  const dispatch = useDispatch();
const addItemToCart = (data) => {
  // if (isItemInCart) {
  //   toast.warning(`${data.title} is already in the cart.`);
  // } else {
    dispatch(addToCart(data));
    toast.success(`${data.title} added to cart.`);
  // }
};
  return (
    <div className="h-auto bg-amazonclone-background">
      <div className="m-auto pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Products */}
          {products.length === 0 && (
            <h1 className="text-center font-semibold text-xl">No Items To Wishlist</h1>
          )}
          {products.map((product) => {
            return (
              <div key={product._id} className="bg-white p-4 rounded-md">
                <div className="text-xl font-medium">
                  <Link to={`/product/${product._id}`}>
                    <img
                      className="p-2 m-auto max-h-36 md:max-h-44"
                      src={product.image_small || product.images[0]?.url}
                      alt="Checkout product"
                    />
                  </Link>
                </div>
                <div className="mt-2">
                  <Link to={`/product/${product._id}`}>
                    <ProductDetails product={product} ratings={false} />
                  </Link>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="text-sm font-semibold text-blue-500 cursor-pointer"
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                  >
                    Delete
                  </button>
                  <div className="text-lg font-semibold">
                    {GB_CURRENCY.format(product.price)}
                  </div>
                </div>
                <div className="mt-2">
                  <button
                    className="btn w-full"
                    onClick={() => {
                      addItemToCart(product);
                      navigate("/cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
