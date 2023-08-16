import { EyeIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import "./card.css"
import { addToCart, addToWishlist, removeFromCart, removeFromWishlist } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReactHtmlParser from "react-html-parser";
import ShoppingCartIconFill from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Tooltip } from "@mui/material";
import ModalProduct from "./product/ModalProduct";

const HomePageCard = ({cls, data, title, img, description, ratings, price, lessPrice, sold, inStock }) => {
  const [isOpen, setIsOpen] = useState(false);
 const dispatch = useDispatch();
  const Navigate = useNavigate();
 const isItemInCart = useSelector((state) =>
   state.cart.cart.products.some((item) => item._id === data._id)
 );
const isItemInWishList = useSelector((state) =>
  state.wishlist.wishlist.products.some((item) => item._id === data._id)
);

 const addItemToCart = () => {
   if (isItemInCart) {
     toast.warning(`${data.title.slice(0, 30) + "..."} is already in the cart.`);
    //  Navigate("/cart");
   } else {
     dispatch(addToCart(data));
     toast.success(`${data.title.slice(0,30)+"..."} added to cart.`);
    //  Navigate("/cart");
   }
 };

 const addItemToWishlist = () => {
   if (isItemInWishList) {
     toast.warning(`${data.title.slice(0,30)+"..."} already  added to wishlist.`);
    //  Navigate("/wishlist");
   } else {
     dispatch(addToWishlist(data));
     toast.success(`${data.title.slice(0,30)+"..."} added to wishlist.`);
    //  Navigate("/wishlist");
   }
  };
  
  const removeItemFromWishlist = () => {
    
      dispatch(removeFromWishlist(data._id));
      toast.warning(`${data.title.slice(0,30)+"..."} removed from wishlist.`);
    
  };
  const removeItemFromCart = () => {
    dispatch(removeFromCart(data._id));
    toast.warning(`${data.title.slice(0,30)+"..."} removed from cart.`);
  };
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Initial check on component mount
  handleResize();

  // Add event listener for window resize
  window.addEventListener("resize", handleResize);

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [isMobile]);
   return (
     <div className="border-spacing-2.5">
       <div
         className={`card-x h-auto w-full ${
           cls && "h-[315px] md:h-[380px] md:w-full"
         } md:h-[360px] bg-slate-50 z-30  relative shadow-md rounded-md overflow-hidden transition transform hover:scale-105`}
       >
         <div className="m-auto flex items-center  ml-[-8px] h-[180px] w-full md:h-[220px]  md:w-full p-4">
           <img
             className="object-contain h-[100%] w-full"
             src={img[0].url || img}
             alt="Home card"
           />
         </div>
         <div className="text-[8px] md:text-[14px]  font-semibold ml-4  cursor-pointer ">
           Brand: <span className="text-green-400">Asus</span>
         </div>
         <div className="text-[8px] md:text-[16px]  font-semibold ml-4">
           <Link to={`/product/${data._id}`}>
             {isMobile ? title.slice(0, 75) + "..." : title.slice(0, 45) + "..."}
           </Link>
         </div>

         {/* <div className="text-[8px] md:text-xs xl:text-sm font-light ml-4">
           <h3>
             <Link to={`/product/${data._id}`}>
               {isMobile
                 ? ReactHtmlParser(description.slice(0, 30) + "...")
                 : ReactHtmlParser(description.slice(0, 35) + "...")}
             </Link>
           </h3>
         </div> */}

         {/* <div className="text-[10px] md:text-lg xl:text-xl font-semibold mt-2 ml-4 md:ml-4 md:mt-4">
           <StarIcon className="h-[12px] md:h-[25px] mb-1 md:mb-3 text-[10px] md:text-[16px]" />{" "}
           {ratings}5 Ratings
         </div> */}
         <div className="text-[10px] md:text-[13px]  font-light ml-2 md:ml-1  flex justify-between items-center p-1 md:p-2">
           <div>
             <StarIcon
               style={{ fontSize: isMobile ? "10px" : "18px" }}
               className="text-yellow-300 text-[50px]  h-[10px] w-[10px] md:h-[14px] md:w-[14px]"
             />
             <StarIcon
               style={{ fontSize: isMobile ? "10px" : "18px" }}
               className="text-yellow-300  h-[10px] w-[10px] md:h-[14px] md:w-[14px]"
             />
             <StarIcon
               style={{ fontSize: isMobile ? "10px" : "18px" }}
               className="text-yellow-300  h-[10px] w-[10px] md:h-[14px] md:w-[14px]"
             />
             <StarIcon
               style={{ fontSize: isMobile ? "10px" : "18px" }}
               className="text-yellow-300  h-[10px] w-[10px] md:h-[14px] md:w-[14px]"
             />
             <StarHalfIcon
               style={{ fontSize: isMobile ? "10px" : "18px" }}
               className="text-yellow-300  h-[10px] w-[10px] md:h-[14px] md:w-[14px]"
             />
             <span>(15)</span>
           </div>
           <div>Sold: (36)</div>
         </div>
         <div className="text-[8px] md:text-[16px]  font-light ml-2 md:ml-2  flex justify-between items-center px-2">
           <span>
             price: $
             <b className="text-purple-500 text-[10px] md:text-[18px] ">{price}</b>
             <sup>
               <s className="text-red-500">$166</s>
               <sup>40%</sup>
             </sup>
           </span>
           <span>
             stock: $
             <b className={`${inStock > 0 ? "text-green-500" : "text-red-500"}`}>
               {inStock ? inStock : 0}
             </b>
           </span>
         </div>

         <div className="card-hover absolute z-50 right-[10px] top-[4%] cursor-pointer">
           <div className="flex flex-col font-bold">
             <Link onClick={() => setIsOpen(true)}>
               <Tooltip title="View This Product" placement="top">
                 <EyeIcon className="h-[16px] md:h-[28px] mb-1 md:mb-3 text-[16px]" />
               </Tooltip>
             </Link>
             {isOpen && <ModalProduct isOpen={isOpen} setIsOpen={setIsOpen} img={img} data={data} addItemToCart={addItemToCart} />}
             {isItemInWishList ? (
               <Tooltip placement="top" title="Item added to your wishlist">
                 <HeartIcon
                   className="h-[16px] md:h-[28px] mb-1 md:mb-3 text-[28px] text-rose-600"
                   onClick={removeItemFromWishlist}
                 />
               </Tooltip>
             ) : (
               <Tooltip placement="top" title="Add item to your wishList.">
                 <HeartIcon
                   className="h-[16px] md:h-[28px] mb-1 md:mb-3 text-[28px] outline-red-600"
                   onClick={addItemToWishlist}
                 />
               </Tooltip>
             )}
             {isItemInCart ? (
               <Tooltip placement="top" title="Item added to your cart.">
                 <ShoppingCartIcon
                   className="h-[16px] md:h-[28px] mb-1 md:mb-3  text-rose-600"
                   onClick={removeItemFromCart}
                 />
               </Tooltip>
             ) : (
               <Tooltip placement="top" title="Add item to your cart.">
                 <ShoppingCartIcon
                   className="h-[16px] md:h-[28px] mb-1 md:mb-3"
                   onClick={addItemToCart}
                 />
               </Tooltip>
             )}
           </div>
         </div>
       </div>
     </div>
   );
};

export default HomePageCard;
