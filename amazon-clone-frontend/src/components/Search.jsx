import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductCategoriesQuery } from "../redux/categoryApi";
import { useGetAllProductQuery } from "../redux/productApi";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [numToShow, setNumToShow] = useState(10000);
  const {
    data: productData,
    isLoading: productLoading,
    isError: productErr,
  } = useGetAllProductQuery();
  const products = productData?.products || [];
  const navigate = useNavigate();
  const { data, isLoading: categoryLoading, isError } = useGetProductCategoriesQuery();
  const categories = data?.categories || [];
  const suggestionContainerRef = useRef(null);

  useEffect(() => {
    if (category === "All") {
      if (searchTerm === "") {
        // setSuggestions(products.slice(0, numToShow));
      } else {
        const matchingSuggestions = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(matchingSuggestions.slice(0, numToShow));
      }
    } else {
      const matchingSuggestions = products.filter(
        (product) =>
          product.category === category &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(matchingSuggestions.slice(0, numToShow));
    }
  }, [searchTerm, category, products, numToShow]);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const filteredProducts = products.filter((product) => {
      if (category === "All") {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return (
          product.category === category &&
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });

    navigate(`/search-results?category=${category}&q=${searchTerm}`, {
      state: { filteredProducts },
    });
  };

  const handleInputFocus = () => {
    if (category === "All") {
      setSuggestions(products.slice(0, numToShow));
    }
  };

  

  const handleClickOutside = (event) => {
    if (
      suggestionContainerRef.current &&
      !suggestionContainerRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-auto md:w-[100%]">
      <div
        className="flex items-center h-6 md:h-10  bg-amazonclone-yellow rounded"
        ref={suggestionContainerRef}
      >
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="w-[50px] md:w-auto p-1 bg-gray-300 text-black border text-xs xl:text-sm text-[10px] md:text[25px]"
        >
          <option value="All">All</option>
          {categories.map((v, u) => (
            <option className="" value={v.title} key={u}>
              {v.title}
            </option>
          ))}
        </select>
        <input
          className="flex-grow items-center w-[50px] md:w-auto h-[100%] rounded-l text-black"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
        />
        <button onClick={onHandleSubmit} className="w-[16px] md:w-[45px]">
          <MagnifyingGlassIcon className="w-[100%] h-[27px] m-auto stroke-slate-900" />
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="h-[60vh]  overflow-y-scroll bg-indigo-50 text-black w-[150px] md:ml-32 md:overflow-y-scroll md:h-auto md:max-h-[60vh] md:w-[445px] text-[10px] md:text-[18px]  z-40 absolute mt-1">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion._id}
              onClick={() => {
                navigate(`/product/${suggestion._id}`);
                setSuggestions([]);
              }}
              className="cursor-pointer py-2 m-3 px-2 hover:bg-gray-2000 border-b border-slate-500 "
            >
              <Link to="#">{suggestion.title.slice(0, 60) + "    see more..."}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
