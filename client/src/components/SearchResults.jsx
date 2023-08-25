
import { useSearchParams, Link, createSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { useGetAllProductQuery } from "../redux/productApi";
import { useGetProductCategoriesQuery } from "../redux/categoryApi";
import { Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

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

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const { data: { products: myproducts } = {} } = useGetAllProductQuery();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");

  const getSearchResults = () => {
    const searchTerm = searchParams.get("searchTerm");

    if (myproducts) {
      let categoryResults = myproducts;

      if (category) {
        categoryResults = myproducts.filter((product) => product.category === category||subcategory);
      }
// console.log("categoryResults",categoryResults)
      if (subcategory) {
        categoryResults = categoryResults.filter(
          (product) => product.subcategory || product.category === subcategory
        );
      }

      if (category==="All" && searchTerm) {
        const results = myproducts.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
        console.log(results)
      } else {
        setProducts(categoryResults);
      }
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [searchParams, myproducts]);

  const { data: { categories } = {} } = useGetProductCategoriesQuery();
  const selectedCategoryItem = categories?.find(
    (categoryItem) => categoryItem.title === category
  );
  const subcategories = selectedCategoryItem ? selectedCategoryItem.subcategories : [];

  const navigate = useNavigate();

  const searchCategory = (category, subcategory) => {
    navigate({
      search: `${createSearchParams({
        category: category || "",
        subcategory: subcategory || "",
        searchTerm: "",
        ratings: selectedRatings.toString(),
        price: selectedPrice,
      })}`,
    });
  };

  const ratings = parseInt(searchParams.get("ratings")) || 0;
  const price = searchParams.get("price") || "";

  const [selectedRatings, setSelectedRatings] = useState(ratings);
  const [selectedPrice, setSelectedPrice] = useState(price);

  const filteredProducts = products
    ?.filter((product) => product.rating ||0 >= selectedRatings)
    ?.filter((product) => {
      if (!selectedPrice) return true;
      const productPrice = product.price;
      const [min, max] = selectedPrice.split("-");
      return productPrice >= min && productPrice <= max;
    });

  const renderRatingIcons = (ratingValue) => {
    const filledCount = Math.floor(ratingValue);
    const remainder = ratingValue - filledCount;

    const icons = [];

    for (let i = 0; i < 5; i++) {
      if (i < filledCount) {
        icons.push(
          <StarIcon
            key={i}
            style={{ fontSize: isMobile ? "13px" : "15px" }}
            className="text-yellow-300"
          />
        );
      } else if (i === filledCount && remainder >= 0.25 && remainder <= 0.75) {
        icons.push(
          <StarHalfIcon
            key={i}
            style={{ fontSize: isMobile ? "13px" : "15px" }}
            className="text-yellow-300"
          />
        );
      } else {
        icons.push(
          <StarIcon
            key={i}
            style={{ opacity: 0.5, fontSize: isMobile ? "13px" : "15px" }}
            className="text-gray-400"
          />
        );
      }
    }

    return icons;
  };

  const toggleCategoriesDisplay = () => {
    setShowAllCategories(!showAllCategories);
  };

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [numDisplayedCategories, setNumDisplayedCategories] = useState(6);

  const setfilter = (category) => {
    if (category) {
      const results = myproducts?.filter((pro) => pro.category === category);
      setProducts(results);
    }
  };
  const dispatch=useDispatch()
  //ad to cart
  const addItemToCart = (data) => {
   
      dispatch(addToCart(data));
      toast.success(`${data.title.slice(0, 30) + "..."} added to cart.`);
      
    
  };

  return (
    <>
      {!products ||
        (products.length === 0 && (
          <h1 className="p-6 md:p-5 font-bold text-center text-xl md:text-2xl text-green-500">
            <span onClick={()=>navigate(-1)} className="text-rose-600 p-3 cursor-pointer">
              <ArrowBackIcon fontSize="small" />
              Back
            </span>
            Search/{<span>{category}</span>} -NO PRODUCTS FOUND FOR THIS CATEGORY!😭
          </h1>
        ))}
      <div className="p-3 md:p-10 container flex justify-between items-start">
        <ul className="categoryBox">
          {!categories && (
            <h1 className="text-center font-thin text-1xl pt-10 md:text-3xl">
              OOPS! NO Categories FOUND!
            </h1>
          )}
          <Typography className="m-[20px]">
            <Link to="/products" className="text-[12px] md:text-[15px]">
              <h1 className="text-[12px] md:text-[15px] font-bold my-4">
                {category} Categories
              </h1>
            </Link>
          </Typography>
          {subcategories &&
            subcategories
              .slice(0, showAllCategories ? subcategories.length : numDisplayedCategories)
              .map((subcategory, i) => (
                <li
                  className="category-link list-disc text-[13px] md:text-[15px]"
                  key={i}
                  onClick={() => {
                    setfilter(subcategory);
                    searchCategory(category, subcategory);
                  }}
                >
                  {subcategory}
                </li>
              ))}
          {subcategories.length > numDisplayedCategories && (
            <li
              className="category-link list-disc text-[12px] md:text-[15px] cursor-pointer text-blue-500"
              onClick={toggleCategoriesDisplay}
            >
              {showAllCategories ? "Show Less" : "Show More"}
            </li>
          )}
          <div>
            <h1 className="text-[13px] md:text-[15px] font-bold my-4">
              Filter by ratings
            </h1>
            <ul className="space-y-2">
              {ratingsOptions.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer ${
                    selectedRatings === option.value ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedRatings(option.value)}
                >
                  {renderRatingIcons(option.value)}
                </li>
              ))}
            </ul>
            <h1 className="text-[13px] md:text-[16px] font-bold my-4">Filter by price</h1>
            <ul className="space-y-2">
              {priceOptions.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer text-[8px] md:text-[15px] ${
                    selectedPrice === option.value ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedPrice(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </ul>
        <div className="pt-4 h-auto">
          {!filteredProducts && (
            <h1 className="p-6 md:p-20 font-bold text-center text-xl md:text-2xl text-green-500">
              No PRODUCTS FOUND
            </h1>
          )}
          {filteredProducts &&
            filteredProducts.map((product, key) => (
              <Link key={key} to="#">
                <div className="p-10 h-auto w-fit grid grid-cols-12 rounded mt-1 mb-1 gap-5 md:gap-8 lg:gap-10 relative">
                  <div className="p-3 w-auto h-auto  col-span-12 md:col-span-2 bg-gray-200 md:m-1">
                    <img
                      className="m-auto w-full h-full object-contain cover-full card-hover"
                      src={product.image_small || product?.images[0]?.url}
                      alt="Search result product"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100">
                    <div className="font-medium text-black p-2">
                      <ProductDetails product={product} ratings={true} />
                      <div className="text-xl xl:text-2xl pt-1">
                        {GB_CURRENCY.format(product.price)}
                      </div>
                      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 absolute bottom-12 right-16">
                        Add To Cart
                      </button> */}
                      <Tooltip title="Add To Cart" placement="top" >
                        <button onClick={()=>addItemToCart(product)} className="bg-gray-400 hover:bg-gray-600  font-semibold px-[6px] py-[3px] md:py-2 md:px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 absolute bottom-12 right-16 mt-[10px] md:my-0">
                          <ShoppingCartIcon className="text-green-400" style={{fontSize:isMobile?"14px":"18px"}} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
