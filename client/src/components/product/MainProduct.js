import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";

import Pagination from "react-js-pagination";


import Typography from "@material-ui/core/Typography";

import {
  useParams,
  Link,
  useHistory,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getProduct } from "../../redux/action";
import HomePageCard from "../HomePageCard";
import { toast } from "react-toastify";
import axios from "axios";
import { useGetProductCategoriesQuery } from "../../redux/categoryApi";
import { useGetProductByFilterQuery } from "../../redux/productApi";

// const categories = [
//   "Electronics",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
// ];
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const ratingsOptions = [
  { value: 0, label: "All Ratings" },
  { value: 1, label: "1 Star" },
  { value: 2, label: "2 Stars" },
  { value: 3, label: "3 Stars" },
  { value: 4, label: "4 Stars" },
  { value: 5, label: "5 Stars" },
];

const priceOptions = [
  { value: "", label: "All Prices" },
  { value: "0-100", label: "$0 - $100" },
  { value: "100-500", label: "$100-$500" },
  { value: "500-1000", label: "$500-$1000" },
  { value: "1000-10000", label: "$1000 - $10000" },
  { value: "10000-10000000", label: "$10000- 10000000" },
];

const MainProducts = () => {
  //   const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading: categoryLoading, isError } = useGetProductCategoriesQuery();
  const categories = data?.categories;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0,25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);
  const [sort, setSort] = useState("");

  const [keywords, setKeyword] = useState("");

  const keyword = params.keyword; //this is for params search for /:keyword
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/products/${keywords}`);
    } else {
      navigate("/products");
    }
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
   console.log("newprice",newPrice)
   if (Array.isArray(newPrice) && newPrice.length === 2) {
     setPrice(newPrice);
   }
 };

  //   let count = filteredProductsCount;
  const [searchParams] = useSearchParams();
  const ratingss = parseInt(searchParams.get("ratings")) || 0;
  const prices = searchParams.get("price") || "";

  const [selectedRatings, setSelectedRatings] = useState(ratingss);
  const [selectedPrice, setSelectedPrice] = useState(prices);
 const getDefaultPriceRange = (selectedPrice) => {
   if (selectedPrice) {
     const [min, max] = selectedPrice.split("-");
     return [Number(min), Number(max)];
   } else {
     return [0, 10000000]; // Set a wide range by default
   }
 };

 // ...

 const selectedPriceArray = getDefaultPriceRange(selectedPrice); // Set a wide range by default
  const selectedMinPrice = selectedPriceArray[0];
  const selectedMaxPrice = selectedPriceArray[1];


  const { data: products, isLoading: loading } = useGetProductByFilterQuery({
    keyword,

    currentPage,

    category,
    
    rating: ratings,
    sort,
  });
  
  let productsx = products?.products;
  const [filPriceProduct, setfilPriceProduct] = useState([]);
const filterProductsByPrice = (priceRange) => {
  setSelectedPrice(priceRange);
  if (priceRange === "") {
   setfilPriceProduct(productsx);
  } else {
    const [min, max] = priceRange.split("-");
    const filteredProducts = productsx.filter(
      (product) => product.price >= min && product.price <= max
    );
    console.log(filteredProducts)
    setfilPriceProduct(filteredProducts);
  }
};

  useEffect(() => {}, [selectedMinPrice, selectedMaxPrice]);
  
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch("CLEAR_ERRORS");
  //   }

  //   dispatch(getProduct(keyword,sort,currentPage,price,ratings,category));
  // }, [dispatch, keyword, currentPage, sort,currentPage, ratings,price,category, toast, error]);

  ///filtering
  
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
  
  const renderRatingIcons = (ratingValue) => {
    const filledCount = Math.floor(ratingValue);
    const remainder = ratingValue - filledCount;

    const icons = [];

    for (let i = 0; i < 5; i++) {
      if (i < filledCount) {
        icons.push(
          <StarIcon
            key={i}
            style={{ fontSize: isMobile ? "8px" : "16px" }}
            className="text-yellow-300"
          />
        );
      } else if (i === filledCount && remainder >= 0.25 && remainder <= 0.75) {
        icons.push(
          <StarHalfIcon
            key={i}
            style={{ fontSize:isMobile?"8px":"16px" }}
            className="text-yellow-300"
          />
        );
      } else {
        icons.push(
          <StarIcon
            key={i}
            style={{ opacity: 0.5, fontSize: isMobile ? "8px" : "16px" }}
            className="text-gray-400"
          />
        );
      }
    }

    return icons;
  };

  return (
    <Fragment>
      {!products && !loading && (
        <h1 className="text-center font-thin text-5xl absolute left-[30%] p-10 md:font-5xl font-2xl ">
          NO PRODUCTS FOUND!
        </h1>
      )}
      {loading ? (
        <h1 className="text-center text-5xl font-thin p-6">Plese Wait......🥰</h1>
      ) : (
        <Fragment>
          <h2 className="text-center text-2xl md:text-5xl font-thin m-[20px]">
            Home/Products
          </h2>

          <div className="products grid grid-cols-2 xl:grid-cols-4 m-0 gap-3">
            {productsx?.length <= 0 ? (
              <h1 className="text-center font-thin text-5xl absolute left-[30%] ">
                NO PRODUCTS FOUND!
              </h1>
            ) : filPriceProduct && filPriceProduct.length > 0 ? (
              filPriceProduct.map((product, i) => (
                <HomePageCard
                  cls="cx"
                  key={product._id}
                  data={product}
                  sold={product.sold}
                  title={product.title}
                  description={product.description}
                  img={product.images}
                  price={product.price}
                  ratings={product.ratings}
                  lessPrice={product.lessPrice}
                  inStock={product.inStock}
                />
              ))
            ) : (
              <>
                {productsx.map((product, i) => (
                  <HomePageCard
                    cls="cx"
                    key={product._id}
                    data={product}
                    sold={product.sold}
                    title={product.title}
                    description={product.description}
                    img={product.images}
                    price={product.price}
                    ratings={product.ratings}
                    lessPrice={product.lessPrice}
                    inStock={product.inStock}
                  />
                ))}
              </>
            )}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            {/* <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            /> */}
            <div className="row sort my-5">
              <span className="mr-2 text-center text-[16px] md:text-2xl">Sort By:</span>
              <select
                className="text-sm border-b-2 border-indigo-400 py-1 px-2 focus:outline-none focus:border-indigo-600"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Newest</option>
                <option value="title">Title</option>
                <option value="-stock">Stock</option>
                <option value="-ratings">Ratings</option>
                <option value="-price">High-Low Price</option>
                <option value="price">Low-High Price</option>
              </select>
            </div>

            <Typography className="m-[20px]">
              <Link to="/products" className="text-[16px] md:text-2xl">
                Categories
              </Link>
            </Typography>

            <ul className="categoryBox">
              {!categories && (
                <h1 className="text-center font-thin text-1xl  pt-10 md:text-3xl">
                  OOPS! NO Categories FOUND!
                </h1>
              )}
              {categories &&
                categories.map((category, i) => (
                  <li
                    className="category-link list-none md:list-disc  text-[8px] md:text-[14px]"
                    key={i}
                    onClick={() => setCategory(category.title)}
                  >
                    {category.title}
                  </li>
                ))}
              <div>
                <h1 className="text-[12px] md:text-[14px]  font-bold my-4">
                  Filter by ratings
                </h1>
                {/* Ratings Filter */}
                <ul className="space-y-2">
                  {ratingsOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`cursor-pointer ${
                        selectedRatings === option.value ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        setSelectedRatings(option.value);
                        setRatings(option.value);
                      }}
                    >
                      {renderRatingIcons(option.value)}
                    </li>
                  ))}
                </ul>
                <h1 className="text-[12px] md:text-[16px]  font-bold my-4">
                  Filter by price
                </h1>
                {/* Price Range Filter */}
                <ul className="space-y-2">
                  {priceOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`cursor-pointer md:text-[10px] text-[8px]  ${
                        selectedPrice === option.value ? "font-bold" : ""
                      }`}
                      onClick={() => filterProductsByPrice(option.value)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            </ul>
            {/* Ratings Filter */}

            {/* <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset> */}
          </div>
          {products &&
            console.log(
              "page",

              products.products?.length
            )}
          {products.products?.length > 0 &&
            products?.resultPerpage <= products?.productsCount && ( //condition create by me
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={products?.resultPerpage}
                  totalItemsCount={products?.productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default MainProducts;
