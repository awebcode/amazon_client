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
import { useGetAllProductQuery } from "../../redux/productApi";
import CsideProduct from "./CsideProduct";
const categories = [
  {
    name: "Electronics",
    subcategories: [
      "Computers",
      "Computer Parts",
      "Mobile",
      "Computer Peripherals",
      "Networking Devices",
      "Storage Devices",
      "Audio and Headphones",
      "Phone Accessories",
      "Phone Parts",
      "Wearable Technology",
      "Smart Home Devices",
      "Home Entertainment",
      "Camera and Photography",
      "Video Games and Consoles",
      "Electronic Gadgets",
      "Power and Charging",
      "Office Electronics",
      "Car Electronics",
      "Home Appliances",
      "Drones and Robotics",
    ],
  },
  {
    name: "Medicine",
    subcategories: [
      "Pain Relief",
      "Cold and Flu",
      "Digestive Health",
      "Allergy Medications",
      "Vitamins and Supplements",
      "First Aid",
      "Skin Care",
      "Eye Care",
      "Respiratory Medications",
      "Heart Health",
      "Diabetes Care",
      "Women's Health",
      "Men's Health",
      "Children's Health",
      "Digestive Aids",
      "Antacids",
      "Antibiotics",
      "Antifungal Medications",
      "Anti-Inflammatory Drugs",
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
      "Anklets",
      "Brooches",
      "Pendants",
      "Lockets",
      "Charms",
      "Chokers",
      "Bangles",
      "Cufflinks",
      "Body Jewelry",
      "Wedding and Engagement",
      "Fine Jewelry",
      "Costume Jewelry",
      "Personalized Jewelry",
      "Vintage Jewelry",
      "Handmade Jewelry",
      "Jewelry Accessories",
    ],
  },
  {
    name: "food",
    subcategories: [
      "Bakery",
      "Dairy Products",
      "Canned Foods",
      "Snack Foods",
      "Frozen Foods",
      "Beverages",
      "Cereals and Breakfast Foods",
      "Condiments and Sauces",
      "Baking Supplies",
      "Spices and Seasonings",
      "Sweets and Desserts",
      "Fresh Produce",
      "Meat and Poultry",
      "Seafood",
      "Health Foods",
      "Gluten-Free Foods",
      "Organic Foods",
      "Gourmet Foods",
      "International Cuisine",
      "Ready-to-Eat Meals",
    ],
  },
  {
    name: "sports",
    subcategories: [
      "Athletic Apparel",
      "Footwear",
      "Sports Equipment",
      "Team Sports",
      "Individual Sports",
      "Outdoor Recreation",
      "Fitness Accessories",
      "Exercise Machines",
      "Gymnastics and Yoga",
      "Water Sports",
      "Winter Sports",
      "Camping Gear",
      "Hiking and Climbing",
      "Biking",
      "Running and Jogging",
      "Sports Nutrition",
      "Recovery and Wellness",
      "Sports Memorabilia",
      "Fan Gear",
      "Sports Technology",
    ],
  },
  {
    name: "cosmetic",
    subcategories: [
      "Makeup",
      "Skincare",
      "Haircare",
      "Fragrances",
      "Nail Care",
      "Bath and Body",
      "Personal Care",
      "Beauty Tools",
      "Lip Care",
      "Eye Care",
      "Facial Masks",
      "Sunscreen and Tanning",
      "Beauty Accessories",
      "Cosmetic Bags",
      "Travel Kits",
      "Men's Grooming",
      "Natural and Organic",
      "Anti-Aging",
      "Cruelty-Free",
      "Dermatologist-Recommended",
    ],
  },
  //
  {
    name: "books",
    subcategories: [
      "Fiction",
      "Non-Fiction",
      "Mystery",
      "Thriller",
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Historical Fiction",
      "Biography",
      "Autobiography",
      "Self-Help",
      "Travel",
      "Cookbooks",
      "Children's Books",
      "Young Adult",
      "Horror",
      "Poetry",
      "Graphic Novels",
      "Classics",
      "Educational",
    ],
  },
  {
    name: "dress",
    subcategories: [
      "Casual Dresses",
      "Formal Dresses",
      "Party Dresses",
      "Wedding Dresses",
      "Maxi Dresses",
      "Midi Dresses",
      "Mini Dresses",
      "Summer Dresses",
      "Winter Dresses",
      "Evening Dresses",
      "Cocktail Dresses",
      "Prom Dresses",
      "Bridesmaid Dresses",
      "Little Black Dresses",
      "Floral Dresses",
      "Printed Dresses",
      "Wrap Dresses",
      "Sundresses",
      "Bodycon Dresses",
      "A-line Dresses",
    ],
  },
  {
    name: "the fine art",
    subcategories: [
      "Fan Art Prints",
      "Fan Art Posters",
      "Fan Art Stickers",
      "Fan Art Pins",
      "Fan Art Keychains",
      "Fan Art T-Shirts",
      "Fan Art Hoodies",
      "Fan Art Mugs",
      "Fan Art Phone Cases",
      "Fan Art Laptop Stickers",
      "Fan Art Digital Downloads",
      "Fan Art Plushies",
      "Fan Art Enamel Pins",
      "Fan Art Wall Decals",
      "Fan Art Canvas Prints",
      "Fan Art Embroidery",
      "Fan Art Jewelry",
      "Fan Art Sketchbooks",
      "Fan Art Calendars",
      "Fan Art Stationery",
    ],
  },
  {
    name: "Furniture",
    subcategories: [
      "Living Room Furniture",
      "Bedroom Furniture",
      "Dining Room Furniture",
      "Home Office Furniture",
      "Outdoor Furniture",
      "Sofas and Couches",
      "Chairs and Recliners",
      "Tables",
      "Beds and Mattresses",
      "Dressers and Wardrobes",
      "Desks and Workstations",
      "Bookcases and Shelving",
      "Cabinets and Storage",
      "Bar and Counter Stools",
      "Benches and Ottomans",
      "Kids' Furniture",
      "Furniture Sets",
      "Futons and Sofa Beds",
      "TV Stands and Media Centers",
      "Bean Bags and Floor Chairs",
    ],
  },
  {
    name: "music",
    subcategories: [
      "Instruments",
      "Sheet Music",
      "Audio Equipment",
      "Music Accessories",
      "CDs and Vinyl Records",
      "Digital Downloads",
      "Music Books",
      "Music Lessons",
      "Concert Tickets",
      "Music Merchandise",
      "Music Memorabilia",
      "Music Streaming Services",
      "Music Production Equipment",
      "DJ Equipment",
      "Karaoke Machines",
      "Headphones and Earbuds",
      "Speakers and Sound Systems",
      "Music Apparel",
      "Music Festivals",
      "Music Software",
    ],
  },
  {
    name: "vihicles",
    subcategories: [
      "Cars",
      "Motorcycles",
      "Trucks",
      "SUVs",
      "Vans",
      "RVs and Campers",
      "Boats",
      "ATVs and UTVs",
      "Bicycles",
      "Scooters",
      "Electric Vehicles",
      "Classic Cars",
      "Commercial Vehicles",
      "Auto Parts",
      "Auto Accessories",
      "Tires and Wheels",
      "Car Electronics",
      "Car Care Products",
      "Vehicle Rentals",
      "Vehicle Services",
    ],
  },
  {
    name: "Business products",
    subcategories: [
      "Office Supplies",
      "Business Software",
      "Printers and Scanners",
      "Office Furniture",
      "Business Books",
      "Stationery",
      "Conference and Presentation",
      "Office Electronics",
      "Desk Accessories",
      "Calendars and Planners",
      "Business Cards",
      "Storage and Organization",
      "Business Forms",
      "Office Decor",
      "Writing Instruments",
      "Shipping and Packaging",
      "Business Services",
      "Business Training",
      "Office Technology",
      "Business Consulting",
    ],
  },
  {
    name: "others",
    subcategories: [
      "Miscellaneous",
      "Unclassified",
      "Random",
      "Others",
      "Specialty",
      "Uncategorized",
      "Not Specified",
      "Unique",
      "General",
      "Various",
      "Misc",
      "Extra",
      "Diverse",
      "Etcetera",
      "Varied",
      "Different",
      "Assorted",
      "Mixed",
      "Additional",
      "Beyond",
    ],
  },
];

const CategorySidebar = ({
  setOpen,
  user,
  open,
  filteredCategory,
  filteredType,
  filteredSort,
}) => {
  const navigate = useNavigate();
  const [openSubcategories, setOpenSubcategories] = useState([]);
  const [openSubcategories2, setOpenSubcategories2] = useState(false);
  const { data, isLoading, isError } = useGetProductCategoriesQuery();
  const { data: data2 } = useGetAllProductQuery();
console.log("categories",data)
  const subcategory = data.categories.find((d) => d.title === filteredCategory);
  const subcategoryType = data.categories.find((d) => d.type === filteredType);
  
  const getCategoryData = () => {
    if (filteredSort && filteredType && filteredCategory) {
      return data2.products.filter(
        (d) =>
          d.sort === filteredSort &&
          d.type === filteredType &&
          d.category === filteredCategory
      );
    } else if (filteredSort && filteredCategory) {
      return data2.products.filter(
        (d) => d.sort === filteredSort && d.category === filteredCategory
      );
    } else if (filteredType && filteredCategory) {
      return data2.products.filter(
        (d) => d.type === filteredType && d.category === filteredCategory
      );
    } else if (filteredType && filteredSort) {
      return data2.products.filter(
        (d) => d.type === filteredType && d.sort === filteredSort
      );
    } else if (filteredType) {
      return data2.products.filter((d) => d.type === filteredType);
    } else if (filteredSort) {
      return data2.products.filter((d) => d.sort === filteredSort);
    } else if (filteredCategory) {
      return data2.products.filter((d) => d.category === filteredCategory);
    } else {
      return null;
    }
    
  };

  const subcategoryXX = getCategoryData();
  console.log("subcategory", subcategoryXX);
  //console.log("filterdsubcategorsi", subcategory.subcategories);
  const [openSubCategorySidebar, setOpenSubCategorySidebar] = useState(false);

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

  const searchCategory = (category, subcategory) => {
    navigate({
      pathname: "search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: ``,
        subcategory: subcategory || "",
      })}`,
    });
  };
  const searchSubCategory = (subcategory) => {
    const categoryWithSubcategory =
      data &&
      data.categories.find((category) =>
        category.subcategories.some(
          (s) => s === subcategory || subcategory === category.title
        )
      );
    //|| subcategory === category.title
    if (categoryWithSubcategory) {
      console.log("categoryWithSubcategory", categoryWithSubcategory.title);

      navigate({
        pathname: "search",
        search: createSearchParams({
          category: categoryWithSubcategory.title || "",
          searchTerm: "",
          subcategory: subcategory || "",
        }).toString(),
      });
    } else {
      // Handle the case when the subcategory is not found.
      console.log("Subcategory not found.");
      // You can provide an appropriate error message or take other actions here.
    }
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
          <Link to="/profile">Account</Link>
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
            {/* {console.log("s", subcategory)} */}
            {subcategoryXX && open && (
              <>
                <CsideProduct
                  category={filteredCategory &&filteredCategory||filteredSort ||filteredType}
                  // key={i}
                  open={openSubCategorySidebar}
                  toggle={setOpenSubcategories}
                  setOpen={setOpen}
                  searchCategory={searchSubCategory}
                  sidebarRef={sidebarRef}
                  subcategories={subcategoryXX}
                />
              </>
            )}
            {open && !subcategoryXX && subcategory && (
              <Cside2
                category={subcategory.title}
                key={index}
                open={openSubCategorySidebar}
                toggle={setOpenSubcategories}
                setOpen={setOpen}
                searchCategory={searchCategory}
                sidebarRef={sidebarRef}
                subcategories={subcategory.subcategories}
              />
            )}
            {openSubcategories &&
              openSubcategories.includes(category.name) &&
              category.subcategories.length > 0 && (
                <ul className="sub-category-list">
                  <Cside2
                    category={category.name}
                    key={index}
                    open={openSubCategorySidebar}
                    toggle={setOpenSubcategories}
                    setOpen={setOpen}
                    searchCategory={searchCategory}
                    sidebarRef={sidebarRef}
                    subcategories={category.subcategories}
                  />
                </ul>
              )}
          </li>
        ))}
      </ul>
      c
      <CloseIcon
        onClick={() => setOpen(false)}
        className="closeIcon"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default CategorySidebar;
