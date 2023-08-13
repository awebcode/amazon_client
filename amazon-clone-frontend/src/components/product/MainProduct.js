import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";


import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";

import Typography from "@material-ui/core/Typography";

import { useParams, Link, useHistory, useNavigate } from "react-router-dom";
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

const MainProducts = () => {
//   const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading:categoryLoading, isError } = useGetProductCategoriesQuery();
  const categories = data?.categories;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
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
    setPrice(newPrice);
  };
//   let count = filteredProductsCount;
  const {data:products,isLoading:loading} = useGetProductByFilterQuery({
    keyword,
    sort,
   
    currentPage,
   
    category,
    
   
    
  });
  const productsx = products?.products;
  
 console.log(products)
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch("CLEAR_ERRORS");
  //   }

  //   dispatch(getProduct(keyword,sort,currentPage,price,ratings,category));
  // }, [dispatch, keyword, currentPage, sort,currentPage, ratings,price,category, toast, error]);

   
    
  return (
    <Fragment>
      {!products && (
        <h1 className="text-center font-thin text-5xl absolute left-[30%] p-10 md:font-5xl font-2xl ">
            NO PRODUCTS FOUND!
        </h1>
      )}
      {loading ? (
        <h1 className="text-center text-5xl font-thin p-6">Plese Wait......🥰</h1>
      ) : (
        <Fragment>
         
          <h2 className="productsHeading">Home/Products</h2>

          <div className="products grid grid-cols-2 xl:grid-cols-3 m-10 gap-3">
            {productsx?.length <= 0 ? (
              <h1 className="text-center font-thin text-5xl absolute left-[30%] ">
               NO PRODUCTS FOUND!
              </h1>
            ) : (
              productsx &&
              productsx.map((product, i) => (
                <HomePageCard
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
            )}
          </div>

          <div className="filterBox">
            {/* <Typography>Price</Typography>
            <Slider
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
                    className="category-link list-disc text-[8px] md:text-[16px]"
                    key={i}
                    onClick={() => setCategory(category.title)}
                  >
                    {category.title}
                  </li>
                ))}
            </ul>

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
          {/* {console.log(resultPerPage <= productsCount)} */}
          {products?.resultPerpage <= products?.productsCount && ( //condition create by me
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
