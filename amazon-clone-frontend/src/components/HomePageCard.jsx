import { EyeIcon, HeartIcon, ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import "./card.css"
import { addToCart, addToWishlist, removeFromCart, removeFromWishlist } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReactHtmlParser from "react-html-parser";
import ShoppingCartIconFill from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
const HomePageCard = ({ data, title, img, description, ratings, price, lessPrice, sold,inStock }) => {
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
     toast.warning(`${data.title} is already in the cart.`);
     Navigate("/cart");
   } else {
     dispatch(addToCart(data));
     toast.success(`${data.title} added to cart.`);
     Navigate("/cart");
   }
 };

 const addItemToWishlist = () => {
   if (isItemInWishList) {
     toast.warning(`${data.title} already  added to wishlist.`);
     Navigate("/wishlist");
   } else {
     dispatch(addToWishlist(data));
     toast.success(`${data.title} added to wishlist.`);
     Navigate("/wishlist");
   }
  };
  
  const removeItemFromWishlist = () => {
    
      dispatch(removeFromWishlist(data._id));
      toast.warning(`${data.title} removed from wishlist.`);
    
  };
  const removeItemFromCart = () => {
    dispatch(removeFromCart(data._id));
    toast.warning(`${data.title} removed from cart.`);
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
       <div className="card-x h-[200px] w-full  md:h-[480px] bg-white z-30  relative shadow-md rounded-md overflow-hidden transition transform hover:scale-105">
         <div className="m-auto flex items-center  ml-[-8px] h-[100px] w-full md:h-[180px]  md:w-full p-4">
           <img
             className="object-contain h-[100%] w-full"
             src={img[0].url || img}
             alt="Home card"
           />
         </div>

         <div className="text-[10px] md:text-lg xl:text-xl font-semibold ml-4 mt-2 md:mt-4">
           <Link to={`/product/${data._id}`}>
             {isMobile
               ? title.slice(0, 60) + " See More..."
               : title.slice(0, 150) + " See More..."}
           </Link>
         </div>

         <div className="truncate md:truncate-none text-[8px] md:text-xs xl:text-sm font-light ml-4">
           <h3>
             <Link to={`/product/${data._id}`}>
               {isMobile
                 ? ReactHtmlParser(description.slice(0, 40) + " see more...")
                 : ReactHtmlParser(description.slice(0, 130) + " see more...")}
             </Link>
           </h3>
         </div>

         {/* <div className="text-[10px] md:text-lg xl:text-xl font-semibold mt-2 ml-4 md:ml-4 md:mt-4">
           <StarIcon className="h-[12px] md:h-[25px] mb-1 md:mb-3 text-[10px] md:text-[16px]" />{" "}
           {ratings}5 Ratings
         </div> */}

         <div className="text-[10px] md:text-lg xl:text-xl font-light md:ml-4 m-2 md:mt-3 flex justify-between p-2 md:p-5">
           <span>
             Price: $<b>{price}</b>
             <sup>{lessPrice}</sup>
           </span>
           <span>
             InStock: $
             <b className={`${inStock > 0 ? "text-green-500" : "text-red-500"}`}>
               {inStock ? inStock : 0}
             </b>
           </span>
         </div>

         <div className="card-hover absolute z-50 right-[10px] top-[30%] cursor-pointer">
           <div className="flex flex-col font-bold">
             <Link to={`/product/${data._id}`}>
               <EyeIcon className="h-[16px] md:h-[38px] mb-1 md:mb-3 text-[16px]" />
             </Link>
             {isItemInWishList ? (
               <HeartIcon
                 className="h-[16px] md:h-[38px] mb-1 md:mb-3 text-[38px] text-rose-600"
                 onClick={removeItemFromWishlist}
               />
             ) : (
               <HeartIcon
                 className="h-[16px] md:h-[38px] mb-1 md:mb-3 text-[38px] outline-red-600"
                 onClick={addItemToWishlist}
               />
             )}
             {isItemInCart ? (
               <ShoppingCartIcon
                 className="h-[16px] md:h-[38px] mb-1 md:mb-3  text-rose-600"
                 onClick={removeItemFromCart}
               />
             ) : (
               <ShoppingCartIcon
                 className="h-[16px] md:h-[38px] mb-1 md:mb-3"
                 onClick={addItemToCart}
               />
             )}
           </div>
         </div>
       </div>
     </div>
   );
};

export default HomePageCard;
