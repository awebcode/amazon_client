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
      <div className="min-w-[1000px] max-w-[1500px] m-auto pt-8">
        <div className="grid grid-cols-8 gap-10">
          {/* Products */}
          <div className="col-span-6 bg-white">
                      <div className="text-2xl xl:text-3xl m-4">Wishlist</div>
                      {products.length===0 &&<h1 className="text-center font-semibold text-xl">No Items To Wishlist</h1>}
            {products.map((product) => {
              return (
                <div key={product._id}>
                  <div className="grid grid-cols-12 divide-y divide-gray-400 mr-4">
                    <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                      <div className="col-span-2 flex items-center">
                        <Link to={`/product/${product._id}`}>
                          <img
                            className="p-4 m-auto"
                            src={product.image_small || product.images[0]?.url}
                            alt="Checkout product"
                          />
                        </Link>
                      </div>
                      <div className="col-span-6">
                        <div className="font-medium text-black mt-2">
                          <Link to={`/product/${product._id}`}>
                            <ProductDetails product={product} ratings={false} />
                          </Link>
                        </div>
                        <div>
                          <button
                            className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2 mb-1 cursor-pointer"
                            onClick={() => dispatch(removeFromWishlist(product._id))}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                        {GB_CURRENCY.format(product.price)}
                      </div>
                      <button className="btn" onClick={() => { addItemToCart(product); navigate("/cart");}}>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="text-lg xl:text-xl text-right mb-4 mr-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">{GB_CURRENCY.format(subtotal)}</span>
            </div> */}
          </div>
          {/* Checkout */}
          {/* <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for <span className="font-bold">FREE DELIVERY</span>.
              Delivery Details
            </div>
            <div className="text-base xl:text-lg mb-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">{GB_CURRENCY.format(subtotal)}</span>
            </div>
            <button className="btn">Proceed to Checkout</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WishList;
