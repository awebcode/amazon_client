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
import Cside2 from "./Cside2";
const categories = [
  {
    name: "Electronics",
    subcategories: [
      "Computers",
      "Smartphones",
      "Audio",
      "Cameras",
      "TVs",
      "Gaming Consoles",
      "Wearable Devices",
      "Home Appliances",
      "Printers",
      "Networking",
      "Tablets",
      "Monitors",
      "Headphones",
      "Speakers",
      "Laptops",
      "Drones",
      "Smart Home",
      "Accessories",
      "Fitness Trackers",
      "Projectors",
    ],
  },
  {
    name: "Medicince",
    subcategories: [
      "Pain Relief",
      "Cold and Flu",
      "Allergy Medications",
      "Digestive Health",
      "Vitamins and Supplements",
      "Cough and Throat",
      "Skin Care",
      "Eye Care",
      "Antibiotics",
      "First Aid",
      "Heart Health",
      "Diabetes Management",
      "Weight Management",
      "Gastrointestinal",
      "Respiratory Health",
      "Women's Health",
      "Men's Health",
      "Child Health",
      "Joint and Muscle Pain",
      "Sleep Aids",
    ],
  },
  {
    name: "Jewellery",
    subcategories: [
      "Necklaces",
      "Earrings",
      "Rings",
      "Bracelets",
      "Watches",
      "Anklets",
      "Brooches",
      "Charms",
      "Cufflinks",
      "Hair Accessories",
      "Body Jewelry",
      "Jewelry Sets",
      "Pendants",
      "Chains",
      "Beaded Jewelry",
      "Statement Jewelry",
      "Fine Jewelry",
      "Vintage Jewelry",
      "Handmade Jewelry",
      "Fashion Jewelry",
    ],
  },
  {
    name: "food",
    subcategories: [
      "Fruits",
      "Vegetables",
      "Dairy Products",
      "Bakery",
      "Meat and Poultry",
      "Seafood",
      "Grains and Cereals",
      "Snacks",
      "Beverages",
      "Sweets and Desserts",
      "Condiments",
      "Canned and Packaged Foods",
      "Frozen Foods",
      "Spices and Seasonings",
      "Healthy and Organic",
      "International Cuisine",
      "Gluten-Free",
      "Vegan and Plant-Based",
      "Ready-to-Eat Meals",
      "Cooking Ingredients",
    ],
  },
  {
    name: "sports",
    subcategories: [
      "Fruits",
      "Vegetables",
      "Dairy Products",
      "Bakery",
      "Meat and Poultry",
      "Seafood",
      "Grains and Cereals",
      "Snacks",
      "Beverages",
      "Sweets and Desserts",
      "Condiments",
      "Canned and Packaged Foods",
      "Frozen Foods",
      "Spices and Seasonings",
      "Healthy and Organic",
      "International Cuisine",
      "Gluten-Free",
      "Vegan and Plant-Based",
      "Ready-to-Eat Meals",
      "Cooking Ingredients",
    ],
  },
  {
    name: "cosmetic",
    subcategories: [
      "Lip Makeup",
      "Eye Makeup",
      "Face Makeup",
      "Foundation",
      "Concealers",
      "Blush and Bronzers",
      "Highlighters",
      "Mascara",
      "Eyeliners",
      "Eyebrow Products",
      "Makeup Brushes",
      "Nail Polish",
      "Skincare",
      "Cleansers",
      "Moisturizers",
      "Serums",
      "Sunscreen",
      "Face Masks",
      "Lip Care",
      "Body Care",
    ],
  },
  //
  {
    name: "books",
    subcategories: [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Historical Fiction",
      "Biography",
      "Self-Help",
      "Travel",
      "Cookbooks",
      "Memoirs",
      "Thrillers",
      "Horror",
      "Poetry",
      "Business",
      "Health and Wellness",
      "History",
      "Science",
      "Children's Books",
    ],
  },
  {
    name: "dress",
    subcategories: [
      "Casual Dresses",
      "Formal Dresses",
      "Maxi Dresses",
      "Mini Dresses",
      "Midi Dresses",
      "Evening Dresses",
      "Cocktail Dresses",
      "Summer Dresses",
      "Party Dresses",
      "Work Dresses",
      "Wrap Dresses",
      "Bodycon Dresses",
      "A-Line Dresses",
      "Shift Dresses",
      "Shirt Dresses",
      "Sundresses",
      "Boho Dresses",
      "Vintage Dresses",
      "Lace Dresses",
      "Floral Dresses",
    ],
  },
  {
    name: "the fine art",
    subcategories: [
      "Painting",
      "Drawing",
      "Sculpture",
      "Printmaking",
      "Photography",
      "Mixed Media",
      "Digital Art",
      "Ceramics",
      "Textile Art",
      "Collage",
      "Engraving",
      "Illustration",
      "Glass Art",
      "Metalwork",
      "Woodwork",
      "Calligraphy",
      "Cinema",
      "Performance Art",
      "Installation Art",
      "Conceptual Art",
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      "Living Room Furniture",
      "Bedroom Furniture",
      "Dining Room Furniture",
      "Outdoor Furniture",
      "Office Furniture",
      "Kitchen Furniture",
      "Bathroom Furniture",
      "Kids' Furniture",
      "Entryway Furniture",
      "Home Office Furniture",
      "Sofas and Couches",
      "Chairs",
      "Tables",
      "Beds",
      "Dressers and Chests",
      "Bookcases and Shelves",
      "Cabinets and Storage",
      "Desks",
      "Bar Furniture",
      "Benches and Ottomans",
    ],
  },
  {
    name: "music",
    subcategories: [
      "Rock",
      "Pop",
      "Hip Hop",
      "Electronic",
      "Jazz",
      "Classical",
      "Country",
      "R&B",
      "Reggae",
      "Metal",
      "Folk",
      "Blues",
      "Latin",
      "Indie",
      "Punk",
      "World Music",
      "Alternative",
      "Gospel",
      "Funk",
      "EDM",
    ],
  },
  {
    name: "vihicles",
    subcategories: [
      "Cars",
      "Trucks",
      "SUVs",
      "Motorcycles",
      "Bicycles",
      "RVs",
      "Boats",
      "ATVs",
      "Scooters",
      "Electric Vehicles",
      "Classic Cars",
      "Commercial Vehicles",
      "Jet Skis",
      "Trailers",
      "Farm Equipment",
      "Aircraft",
      "Snowmobiles",
      "Watercraft",
      "Golf Carts",
      "Tractors",
    ],
  },
  {
    name: "Business products",
    subcategories: [
      "Office Supplies",
      "Business Furniture",
      "Computers and Accessories",
      "Printers and Scanners",
      "Communication Devices",
      "Conference Equipment",
      "Presentation Tools",
      "Business Software",
      "Data Storage",
      "Networking Equipment",
      "Security Systems",
      "Point of Sale Systems",
      "Payment Processing",
      "Shipping and Packaging",
      "Business Books",
      "Stationery",
      "Office Decor",
      "Business Services",
      "Uniforms and Workwear",
      "Promotional Items",
    ],
  },
  {
    name: "others",
    subcategories: [
      "Miscellaneous",
      "Gifts and Occasions",
      "Craft Supplies",
      "Hobbies",
      "Home Improvement",
      "Party Supplies",
      "Pet Supplies",
      "Crafts and DIY",
      "Collectibles",
      "Art Supplies",
      "Novelties",
      "Seasonal Items",
      "Personal Care",
      "Travel Accessories",
      "Outdoor Gear",
      "Home Decor",
      "Entertainment",
      "Unique Finds",
      "Household Essentials",
      "Kitchen Gadgets",
    ],
  },
];

const CategorySidebar = ({ setOpen, user,open }) => {
  const navigate = useNavigate();
  const [openSubcategories, setOpenSubcategories] = useState([]);
  const { data, isLoading, isError } = useGetProductCategoriesQuery();

  const [openSubCategorySidebar,setOpenSubCategorySidebar]=useState(false)

  const toggleSubcategories = (categoryName) => {
    setOpenSubcategories((prevOpenSubcategories) => {
      if (prevOpenSubcategories.includes(categoryName)) {
        // If categoryName is already in prevOpenSubcategories, remove it
        return prevOpenSubcategories.filter((name) => name !== categoryName);
      } else {
        // If categoryName is not in prevOpenSubcategories, add it
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
    <div className={`category-sidebar ${open ? "open" : "close"}`} ref={sidebarRef}>
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
                searchCategory(category.name);
                // setOpenSubCategorySidebar(true)
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
            {openSubcategories && openSubcategories.includes(category.name) &&
              category.subcategories.length > 0 && (
                <ul className="sub-category-list">
                  <Cside2
                    category={category.name}
                    key={index}
                    open={openSubCategorySidebar}
                    toggle={setOpenSubcategories}
                    setOpen={setOpenSubCategorySidebar}
                    searchCategory={searchCategory}
                    sidebarRef={sidebarRef}
                    subcategories={category.subcategories}
                  />
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
