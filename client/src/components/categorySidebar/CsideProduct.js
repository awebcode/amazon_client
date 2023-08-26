import React, { useRef, useEffect } from "react";
// Make sure to import the CSS file for Cside2
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const CsideProduct = ({
  category,
  open,
  setOpen,
  searchCategory,
  sidebarRef,
  subcategories,
  toggle,
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
const groupedSubcategories = {};

const uniqueSubcategories = [...new Set(subcategories.map(vx => vx.category))];
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
        {uniqueSubcategories.length > 0 ? (
          uniqueSubcategories.map((vx, i) => {
            return (
              <li
                className="sub-category-item"
                key={i}
                onClick={() => {
                  searchCategory(vx);
                  setOpen(false);
                }}
              >
                {vx}
              </li>
            );
          })
        ) : (
          <h2 onClick={()=> setOpen(false)}>No Item Found</h2>
        )}
      </ul>
      <CloseIcon
        onClick={() => {
          toggle([]);
          setOpen(false);
        }}
        className="closeIcon"
      />
    </div>
  );
};

export default CsideProduct;
