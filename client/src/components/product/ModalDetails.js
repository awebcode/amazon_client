// import React, { useEffect, useState } from "react";
// import { useGetProductDetailsQuery } from "../../redux/productApi";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";

// const Details = () => {
//   const { id } = useParams();
//   //   const { id } = router.params;
//   const { data, isLoading, isFetching } = useGetProductDetailsQuery(id);
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState("1");
//   const dispatch = useDispatch();

//   const getProduct = () => {

//       setProduct(data?.product);
//       console.log(product);

//   };
// const addQuantityToProduct = () => {
//   setProduct(product);

//   return product;
// };

//   useEffect(() => {
//     getProduct();
//   }, [data,product]);

//   return (
//     <div>
//       <div className="container relative flex items-center justify-between p-16">
//         <div className="flex[50%] w-[80%] h-[80% ">
//           <img className="w-[100%] h-[100%]" src={data?.product?.images[0]?.url} alt="" />
//         </div>
//         <div>
//           <h1>{data?.product?.title}</h1>
//           <p>{data?.product?.desc}</p>
//          <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
//                 FREE Delivery
//               </div>
//               <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
//                 In Stock
//               </div>
//               <div className="text-base xl:text-lg mt-1">
//                 Quantity:
//                 <select
//                   onChange={(e) => setQuantity(e.target.value)}
//                   className="p-2 bg-white border rounded-md focus:border-indigo-600"
//                 >
//                   <option>1</option>
//                   <option>2</option>
//                   <option>3</option>
//                 </select>
//               </div>
//               <Link to={"/checkout"}>
//                 <button
//                   onClick={() => dispatch(addToCart(addQuantityToProduct()))}
//                   className="btn"
//                 >
//                   Add to Cart
//                 </button>
//               </Link>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/productApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LoveIcon from "@mui/icons-material/Favorite";
import { Tooltip } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/24/outline";
const ModalDetails = ({ data, isMobile, setIsMobile }) => {
  const [currentImage, setCurrentImage] = useState("");
  const dispatch = useDispatch();
  const [isLoved, setIsLoved] = useState(false);
  const [product, setProduct] = useState(data);
  const [quantity, setQuantity] = useState(1); // Start with quantity 1

  useEffect(() => {
    if (data?.images[0]?.url) {
      setCurrentImage(data?.images[0]?.url);
    }
  }, [data]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };
  const isItemInCart = useSelector((state) =>
    state.cart.cart.products.some((item) => item._id === product._id)
  );
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!isItemInCart && product) {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };
      dispatch(addToCart(productWithQuantity));
      toast.success(`${product.title.slice(0, 30) + "..."} added to cart`);
    } else {
      toast.warn(`${product.title.slice(0, 30) + "..."} already added to cart`);
      //  navigate("/cart");
    }
  };
  //exitsitem
 

 useEffect(() => {
   // Retrieve "loved" state from local storage on component mount
   const lovedState = localStorage.getItem(`loved_${data._id}`);
   setIsLoved(lovedState === "true");
 }, [data._id]);

 const handleLoveClick = () => {
   const newLovedState = !isLoved;
   setIsLoved(newLovedState);
     if (newLovedState) {
       toast.success("Love Added!")
     } else {
          toast.warning("Love Removed!");
   }
   // Save "loved" state to local storage
   localStorage.setItem(`loved_${data._id}`, newLovedState.toString());
 };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8  items-center">
        <div>
          <div className="w-full h-[300px] md:h-[400px]">
            <img
              className="w-full h-full object-contain"
              src={currentImage} //data?.product?.images[0]?.url
              alt=""
            />
          </div>
          <div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {data?.images?.map((v, i) => {
                return (
                  <SwiperSlide className="h-[50px] w-[50px]" key={i}>
                    <img
                      src={v?.url}
                      alt=""
                      onClick={() => setCurrentImage(v?.url)}
                      className="w-full h-full object-contain"
                    />
                  </SwiperSlide>
                );
              })}
              ...
            </Swiper>
          </div>
        </div>
        <div>
          <h1 className="text-[16px] md:text-[20px] font-semibold mb-2">
            {data?.title.slice(0, 200) + "..."}
          </h1>

          <div className="text-sm md:text-base text-blue-500 font-semibold mb-2">
            FREE Delivery
          </div>
          <div className="text-[10px] md:text-[16px] text-green-500 font-semibold mb-2">
            <b>stock</b> <span className="text-rose-500">({data.inStock})</span>
          </div>
          <div className="text-[10px] md:text-[13px]  font-light  flex justify-between items-center py-2">
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
          <div className="flex items-center justify-between text-[10px] md:text-[16px] mb-4">
            <div>
              Quantity:
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="p-2 bg-white border rounded-md focus:border-indigo-600 ml-2"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
           
              {isLoved ? (
                <LoveIcon
                  style={{ fontSize: isMobile ? "16px" : "28px" }}
                  className="cursor-pointer  h-[16px] w-[16px] md:h-[28px] md:w-[28px]"
                  onClick={handleLoveClick}
                />
              ) : (
                <HeartIcon
                  style={{ fontSize: isMobile ? "16px" : "28px" }}
                  className="cursor-pointer  h-[16px] w-[16px] md:h-[28px] md:w-[28px]"
                  onClick={handleLoveClick}
                />
              )}
           
          </div>
          <Link to={"#"}>
            <button onClick={handleAddToCart} className="btn">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
