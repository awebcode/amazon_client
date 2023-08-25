
import { configureStore, createSlice } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";
import { api, auth } from "./auth";
import { Product, productApi } from "./productApi";
import { createProductReducer, getproductsReducer } from "./reducer";
import { Categories } from "./categoryApi";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "../reducers/orderReducer";
const initialState = {
  cart: {
    products: [],
    productsNumber: 0,
  },
  wishlist: {
    products: [],
    productsNumber: 0,
  },
  order: {
    shippingInfo:[]
  }
};

// Cart Slice and Reducer
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = state.cart.products.find(
        (product) => product._id === action.payload._id
      );
      if (productToAdd) {
        productToAdd.quantity += parseInt(action.payload.quantity);
      } else {
        state.cart.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity),
        });
      }
      state.cart.productsNumber += parseInt(action.payload.quantity);
    },
    removeFromCart: (state, action) => {
      const productToRemove = state.cart.products.find(
        (product) => product._id === action.payload
      );
      state.cart.productsNumber -= productToRemove?.quantity;
      const d=state.cart.products = state.cart.products.filter(
        (product) => product._id !== action.payload
      );
      console.log("x",d)
    },
    incrementInCart: (state, action) => {
      const itemInc = state.cart.products.find((item) => item._id === action.payload);
      if (itemInc.quantity >= 1) {
        itemInc.quantity = itemInc.quantity + 1;
        state.cart.productsNumber += 1;
      }
    },
    decrementInCart: (state, action) => {
      const itemDec = state.cart.products.find((item) => item._id === action.payload);
      if (itemDec.quantity === 1) {
        state.cart.products = state.cart.products.filter((item) => item._id !== action.payload);
      } else {
        itemDec.quantity--;
        state.cart.productsNumber -= 1;
      }
    },
    loadCartFromLocalStorage: (state, action) => {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart) {
        state.cart = savedCart;
      }
      const savedOrder = JSON.parse(localStorage.getItem("shippingInfo"));
      if (savedOrder) {
        state.order.shippingInfo = savedOrder;
      }
    },
  },
});

// Wishlist Slice and Reducer
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productToAdd = state.wishlist.products.find(
        (product) => product._id === action.payload._id
      );
      if (!productToAdd) {
        state.wishlist.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity),
        });
      }
      state.wishlist.productsNumber = state.wishlist.products.length;
    },
    removeFromWishlist: (state, action) => {
      state.wishlist.products = state.wishlist.products.filter(
        (product) => product._id !== action.payload
      );
      state.wishlist.productsNumber = state.wishlist.products.length;
    },
    loadWishlistFromLocalStorage: (state, action) => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
      if (savedWishlist) {
        state.wishlist = savedWishlist;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementInCart,
  decrementInCart,
  loadCartFromLocalStorage,
} = cartSlice.actions;

export const { addToWishlist, removeFromWishlist, loadWishlistFromLocalStorage } =
  wishlistSlice.actions;

// Combine reducers
const rootReducer = {
  cart: cartSlice.reducer,
  wishlist: wishlistSlice.reducer,
};

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
    [auth.reducerPath]: auth.reducer,
    [Product.reducerPath]: Product.reducer,
    [Categories.reducerPath]: Categories.reducer,
    createProduct: createProductReducer,
    products: getproductsReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer, // Include the auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      Product.middleware,
      Categories.middleware
    ), // Include the auth middleware
});
store.dispatch(loadCartFromLocalStorage()); // Load cart data
store.dispatch(loadWishlistFromLocalStorage()); // Load wishlist data

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart.cart));
  localStorage.setItem("wishlist", JSON.stringify(store.getState().wishlist.wishlist));
   if (JSON.stringify(store.getState())?.newOrder?.order?.success) {
     localStorage.removeItem("cart");
     localStorage.removeItem("wishlist");
   }
});

export default store;
