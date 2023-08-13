
// export default SearchResults;
import { useSearchParams, Link, createSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDetails } from "./";
import { GB_CURRENCY } from "../utils/constants";
import { useGetAllProductQuery } from "../redux/productApi";
import { useGetProductCategoriesQuery } from "../redux/categoryApi";
import { Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  { value: "100-500", label: "$100 - $500" },
  { value: "500-1000", label: "$500 - $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "2000-10000", label: "$2000 - $10000" },
  { value: "10000-1000000", label: "$10000 - $1000000" },
  // ... Other options
];
const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const { data: { products: myproducts } = {} } = useGetAllProductQuery();
  const category = searchParams.get("category");

  const getSearchResults = () => {
    const searchTerm = searchParams.get("searchTerm");

    if (myproducts) {
      const categoryResults = category
        ? myproducts.filter((product) => product.category === category)
        : myproducts;

      if (searchTerm) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
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

  const searchCategory = (category) => {
    navigate({
      //  pathname: "search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: ``,
        ratings: `${selectedRatings.toString()}`,
        price: `${selectedPrice}`,
      })}`,
    });
  };

  const ratings = parseInt(searchParams.get("ratings")) || 0;
  const price = searchParams.get("price") || "";

  const [selectedRatings, setSelectedRatings] = useState(ratings);
  const [selectedPrice, setSelectedPrice] = useState(price);

  const filteredProducts = products
    ?.filter((product) => product.rating >= selectedRatings)
    ?.filter((product) => {
      if (!selectedPrice) return true;
      const productPrice = product.price;
      const [min, max] = selectedPrice.split("-");
      return productPrice >= min && productPrice <= max;
    });
  console.log("filtedProducts", filteredProducts,products)
  useEffect(() => {
   
  }, [selectedPrice,selectedRatings])
  const setfilter = (category) => {
    if (category) {
    const results=  products?.filter((pro) => 
         pro.category===category
      )
      setProducts(results)
      
      }
  }
  return (
    <>
      {!products ||
        (products.length === 0 && (
          <h1 className="p-6 md:p-20 font-bold text-center text-xl md:text-2xl text-green-500">
            <Link to="/products" className="text-purple-500">
              {" "}
              <ArrowBackIcon fontSize="small" />
              Back
            </Link>{" "}
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
            <Link to="/products" className="text-[12px] md:text-xl">
              All {category} Categories
            </Link>
          </Typography>
          {subcategories &&
            subcategories.map((category, i) => (
              <li
                className="category-link list-disc text-[8px] md:text-[16px]"
                key={i}
                onClick={() => {
                  setfilter(category);
                  searchCategory(category);
                }}
              >
                {category}
              </li>
            ))}
          {/* Ratings Filter */}
          <div>
            {/* Ratings Filter */}
            <ul className="space-y-2">
              {ratingsOptions.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer ${
                    selectedRatings === option.value ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedRatings(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>

            {/* Price Range Filter */}
            <ul className="space-y-2">
              {priceOptions.map((option) => (
                <li
                  key={option.value}
                  className={`cursor-pointer ${
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
          {products &&
            products.map((product, key) => {
              return (
                <Link key={key} to={`/product/${product._id}`}>
                  <div className="p-10 h-auto w-fit grid grid-cols-12 rounded mt-1 mb-1 gap-5 md:gap-8 lg:gap-10">
                    <div className="p-3 w-auto h-auto m-auto md:w-[240px] md:h-[240px] col-span-12 md:col-span-2 bg-gray-200  md:m-1">
                      <img
                        className="m-auto w-full h-full"
                        src={product.image_small || product?.images[0]?.url}
                        alt="Search result product"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100 ">
                      <div className="font-medium text-black p-2">
                        <ProductDetails product={product} ratings={true} />

                        <div className="text-xl xl:text-2xl pt-1">
                          {GB_CURRENCY.format(product.price)}
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
