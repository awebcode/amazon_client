import React, { useEffect, useState } from "react";
import { useGetAllProductQuery, useGetProductDetailsQuery } from "../../redux/productApi";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import ReactImageMagnify from "react-image-magnify";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import HomePageCard from "../HomePageCard";
import ReactPaginate from "react-js-pagination";
import Review from "./Review";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";
import { Rating } from "@material-ui/lab";
import { useMeQuery } from "../../redux/auth";
const Details = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetProductDetailsQuery(id);
  const [currentImage, setCurrentImage] = useState("");
  const dispatch = useDispatch();
  const { data: products, isLoading: isLoading2 } = useGetAllProductQuery();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Start with quantity 1
 const {data:userData}=useMeQuery()
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
  //filter simil products
  const similarProducts =
    products &&
    products.products?.filter((product) => {
      return (
        (product.category === data?.product?.category ||
          product.brand === data?.product?.brand ||
          product.type === data?.product?.type) && // Modify this condition as needed
        product._id !== data?.product?._id // Exclude the current product
      );
    });
  //pagintaion for product
  const similarProductsPerPage = 4;
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastProduct = activePage * similarProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - similarProductsPerPage;
  const currentSimilarProducts =
    similarProducts && similarProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  //review
  const [open, setOpen] = useState(false);
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const [reviews, setReviews] = useState([]);
  const getReview = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/review/${id}`,
        {
          withCredentials: true, // Include credentials
        }
      );
      setReviews(data.reviews); // Replace with your API endpoint
    } catch (error) {
      console.error("Error getting review:", error);
      toast.error("Error getting review");
    }
  };
  // console.log("Reviews", reviews);
  useEffect(() => {
    getReview();
  }, [reviews]);
  const options = {
    size: "large",
    value: data && data.product?.ratings||4,
    readOnly: true,
    precision: 0.5,
  };
  //pagination for review
   const similarReviewPerPage = 2;
   const [activePageReview, setActivePageReview] = useState(1);

   const handlePageReviewChange = (pageNumber) => {
     setActivePageReview(pageNumber);
   };

   const indexOfLastReview = activePageReview * similarReviewPerPage;
   const indexOfFirstReview = indexOfLastReview - similarReviewPerPage;
   const currentPageReviews =
     reviews &&
     reviews
       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
       .slice(indexOfFirstReview, indexOfLastReview);

  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="w-full">
            {" "}
            {/* //h-[300px] md:h-[400px] */}
            {/* <img
              className="w-full h-full object-contain"
              src={currentImage} //data?.product?.images[0]?.url
              alt=""
            /> */}
            <ReactImageMagnify
              // className="w-full h-full object-contain cursor-pointer"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: currentImage,
                  height: 100,
                  width: 100,
                },
                largeImage: {
                  src: currentImage,
                  width: isMobile ? 480 : 950,
                  height: isMobile ? 700 : 1700,
                },
                enlargedImagePosition: isMobile ? "over" : "",
                lensStyle: {
                  background: "hsla(0, 0%, 100%, .3)",
                  border: "1px solid #ccc",
                },
              }}
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
                  <SwiperSlide
                    className="h-[50px] w-[50px] cursor-pointer border border-gray-300 py-[5px] my-[5px]  rounded-lg"
                    key={i}
                  >
                    <img
                      src={v?.url}
                      alt=""
                      onClick={() => setCurrentImage(v?.url)}
                      className="w-full h-full object-contain cursor-pointer"
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
          <div className="detailsBlock-2">
            <Rating {...options} size="small"/>
            {/* {console.log(data?.product)} */}
            <span className="detailsBlock-2-span">
              {" "}
              ({data && data.product?.numOfReviews} Reviews)
            </span>
          </div>
          <div className="text-sm md:text-base text-blue-500 font-semibold mb-2">
            FREE Delivery
          </div>
          <div className="text-base md:text-lg text-green-700 font-semibold mb-2">
            In Stock: <b className="text-black font-thin">{data?.product?.stock}</b>
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
          <button
            onClick={submitReviewToggle}
            className="btn bg-green-400 hover:bg-rose-300 duration-300"
          >
            Submit Review
          </button>
        </div>
      </div>
      <div className="p-4 m-6">
        <Review
          product={data?.product}
          open={open}
          setOpen={setOpen}
          submitReviewToggle={submitReviewToggle}
        />
        {reviews &&reviews.length>0 && reviews ? (
          <>
            <div className="reviews">
              {currentPageReviews &&
                currentPageReviews.map((review) => (
                  <ReviewCard key={review._id} review={review} getReview={getReview} />
                ))}
            </div>
            {currentPageReviews && currentPageReviews.length < reviews.length && (
              <div className="w-screen flex justify-center items-center mt-4">
                <ReactPaginate
                  activePage={activePageReview}
                  activeLinkClass="page_active"
                  itemsCountPerPage={similarReviewPerPage}
                  totalItemsCount={reviews && reviews.length}
                  pageRangeDisplayed={3}
                  onChange={handlePageReviewChange}
                  itemClass="pagination-item"
                  linkClass="pagination-link"
                  prevPageText="Previous"
                  nextPageText="Next"
                />
              </div>
            )}
          </>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </div>
      <div className="relative">
        <h1 className="custom_border text-2xl md:text-5xl p-2 md:py-6 m-2 md:my-10 ml-0 font-bold">
          Also you like
        </h1>
        {!currentSimilarProducts &&
          (isLoading2 ? (
            <h2 className="text-center font-bold">Loading.........</h2>
          ) : (
            <h2 className="text-center font-bold">No Products Available</h2>
          ))}
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-1 md:gap-5">
        {currentSimilarProducts &&
          currentSimilarProducts.map((data, i) => {
            return (
              <HomePageCard
                data={data}
                key={i}
                sold={data.sold}
                title={data.title}
                description={data.description}
                img={data.images}
                price={data.price}
                ratings={data.ratings}
                lessPrice={data.lessPrice}
                inStock={data.inStock}
              />
            );
          })}
        {currentSimilarProducts &&
          currentSimilarProducts.length < similarProducts?.length && (
            <div className="w-screen flex justify-center items-center mt-4">
              <ReactPaginate
                activePage={activePage}
                activeLinkClass="page_active"
                itemsCountPerPage={similarProductsPerPage}
                totalItemsCount={similarProducts?.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="pagination-item"
                linkClass="pagination-link"
                prevPageText="Previous"
                nextPageText="Next"
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default Details;
