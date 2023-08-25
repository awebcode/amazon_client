
import React, { useRef, useEffect } from "react";
 // Make sure to import the CSS file for Cside2
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Cside2 = ({
  category,
  open,
  setOpen,
  searchCategory,
  sidebarRef,
    subcategories,
  toggle
}) => {
  const subCategorySidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      subCategorySidebarRef.current &&
      !subCategorySidebarRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div
       className={`sub-category-sidebar ${open ? "open" : "close"}`}
      //  ref={subCategorySidebarRef}
    >
      <div className="category-header">
        <ChevronLeftIcon onClick={() => toggle([])} className="backIcon" />
        {category}
      </div>
      <ul className="sub-category-list">
        {subcategories.map((subcategory, subIndex) => (
          <li
            className="sub-category-item"
            key={subIndex}
            onClick={() => {
              searchCategory(category,subcategory);
               setOpen(false);
            }}
          >
           {subcategory}
          </li>
        ))}
      </ul>
      <CloseIcon onClick={() => {toggle([]);setOpen(false);}} className="closeIcon" />
    </div>
  );
};

export default Cside2;
