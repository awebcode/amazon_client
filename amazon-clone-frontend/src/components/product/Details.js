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
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
 import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Details = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetProductDetailsQuery(id);
  const [currentImage,setCurrentImage]=useState("")
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Start with quantity 1

  useEffect(() => {
    if (data?.product) {
      setProduct(data.product);
    }
    if (data?.product?.images[0]?.url) {
      setCurrentImage(data?.product?.images[0]?.url);
    }
  }, [data]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = {
        ...product,
        quantity: quantity,
      };
      dispatch(addToCart(productWithQuantity));
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
              {data?.product?.images?.map((v, i) => {
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
          <h1 className="text-2xl font-semibold mb-2">{data?.product?.title}</h1>
          <p className="text-gray-600 mb-4">{data?.product?.desc}</p>
          <div className="text-sm md:text-base text-blue-500 font-semibold mb-2">
            FREE Delivery
          </div>
          <div className="text-base md:text-lg text-green-700 font-semibold mb-2">
            In Stock
          </div>
          <div className="text-base md:text-lg mb-4">
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
          <Link to={"/checkout"}>
            <button onClick={handleAddToCart} className="btn">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
