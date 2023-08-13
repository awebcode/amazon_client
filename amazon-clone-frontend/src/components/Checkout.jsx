import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { removeFromCart, decrementInCart, incrementInCart } from "../redux/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.cart.products);
  const itemsNumber = useSelector((state) => state.cart.cart.productsNumber);
  const subtotal = useSelector((state) =>
    state.cart.cart.products.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );
  const dispatch = useDispatch();

  return (
    <div className="bg-amazonclone-background min-h-screen p-4 sm:p-6 md:p-8">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Products */}
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
            {products.map((product) => (
              <div key={product._id} className="mb-6">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-3 lg:col-span-2 mb-4 md:mb-0">
                    <Link to={`/product/${product._id}`}>
                      <img
                        className="w-full h-auto"
                        src={product.image_small || product.images[0]?.url}
                        alt="Checkout product"
                      />
                    </Link>
                  </div>
                  <div className="col-span-12 md:col-span-9 lg:col-span-10">
                    <div className="font-medium text-black mb-2">
                      <Link to={`/product/${product._id}`}>
                        <ProductDetails product={product} ratings={false} />
                      </Link>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <button
                        className="text-sm text-blue-500 font-semibold cursor-pointer"
                        onClick={() => dispatch(removeFromCart(product._id))}
                      >
                        Delete
                      </button>
                      <div className="grid grid-cols-3 w-20 text-center">
                        <div
                          className="bg-gray-400 rounded cursor-pointer"
                          onClick={() => dispatch(decrementInCart(product._id))}
                        >
                          -
                        </div>
                        <div className="bg-gray-200">{product.quantity}</div>
                        <div
                          className="bg-gray-400 rounded cursor-pointer"
                          onClick={() => dispatch(incrementInCart(product._id))}
                        >
                          +
                        </div>
                      </div>
                    </div>
                    <div className="text-lg md:text-xl font-semibold">
                      {GB_CURRENCY.format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-lg md:text-xl text-right mb-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">{GB_CURRENCY.format(subtotal)}</span>
            </div>
          </div>
          {/* Checkout */}
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-green-800 mb-2">
              Your order qualifies for{" "}
              <span className="font-semibold">FREE DELIVERY</span>. Delivery Details
            </div>
            <div className="text-base md:text-lg mb-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">{GB_CURRENCY.format(subtotal)}</span>
            </div>
            <button className="btn w-full" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
