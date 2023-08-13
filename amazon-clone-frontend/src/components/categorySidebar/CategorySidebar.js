import React, { useEffect, useRef } from "react";
import "./category.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useGetProductCategoriesQuery } from "../../redux/categoryApi";
const categories = [
  {
    name: "Electronics",
    subcategories: [],
  },
  {
    name: "Medicince",
    subcategories: ["food", "sports"],
  },
  {
    name: "Jewellery",
    subcategories: ["cosmetic"],
  },
  {
    name: "cosmetic",
    subcategories: ["book", "the fine arts"],
  },
  {
    name: "Furniture",
    subcategories: [],
  },
  {
    name: "music",
    subcategories: [],
  },
  {
    name: "vihicles",
    subcategories: [],
  },
  {
    name: "Business products",
    subcategories: [],
  },
  {
    name: "others",
    subcategories: [],
  },
];

const CategorySidebar = ({ setOpen, user,open }) => {
  const navigate = useNavigate();
  const [openSubcategories, setOpenSubcategories] = useState([]);
  const { data, isLoading, isError } = useGetProductCategoriesQuery();

  

  const toggleSubcategories = (categoryName) => {
    setOpenSubcategories((prevOpenSubcategories) => {
      if (prevOpenSubcategories.includes(categoryName)) {
        return prevOpenSubcategories.filter((name) => name !== categoryName);
      } else {
        return [...prevOpenSubcategories, categoryName];
      }
    });
  };

  const searchCategory = (category) => {
    navigate({
      pathname: "search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: ``,
      })}`,
    });
  };

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className={`category-sidebar ${open ? 'open' : 'close'}`} ref={sidebarRef}>
      <div className="category-head">
        <Avatar src={user?.avatar?.url} />
        {user ? (
          <Link to="/account">Account</Link>
        ) : (
          <Link to="/signin">Hello, Sign In</Link>
        )}
      </div>
      <div className="category-header">Digital Content & Devices</div>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li className="category-item" key={index}>
            <div
              onClick={() => {
                toggleSubcategories(category.name);
                // navigate("/products");
                searchCategory(category.name);
                setOpen(false);
              }}
              className="category-title"
            >
              {category.name}{" "}
              <span>
                {category.subcategories.length > 0 && (
                  <ChevronRightIcon
                    className={`arrow-icon h-[12px] ${
                      openSubcategories.includes(category.name) ? "arrow-open" : ""
                    }`}
                  />
                )}
              </span>
            </div>
            {openSubcategories.includes(category.name) &&
              category.subcategories.length > 0 && (
                <ul className="sub-category-list">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li
                      className="sub-category-item"
                      key={subIndex}
                      onClick={() => {
                        searchCategory(subcategory);
                        setOpen(false);
                      }}
                    >
                      {subcategory}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
      <CloseIcon onClick={() => setOpen(false)} className="closeIcon" />
    </div>
  );
};

export default CategorySidebar;
