import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "./";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CategorySidebar from "./categorySidebar/CategorySidebar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useUserContext } from "../redux/UserContext";
import { useGetProductCategoriesQuery } from "../redux/categoryApi";
import axios from "axios";
const NavBar = () => {
  const cart = useSelector((state) => state.cart.cart.productsNumber);
  const wishlist = useSelector((state) => state.wishlist.wishlist.productsNumber);
  const [sidebar, setSidebar] = useState(false)
  const { user } = useUserContext();
  const { data, isLoading, isError } = useGetProductCategoriesQuery();
  
  return (
    <header className="bg-amazonclone">
      <div className="flex justify-between items-center py-2 px-4 md:px-10 lg:px-16 xl:px-20">
        {/* Left */}
        <div className="flex items-center">
          <Link to={"/"}>
            {user?.avatar?.url ? (
              <img
                className="h-6 w-6 md:h-9 md:w-9 rounded"
                src={user?.avatar?.url}
                alt="Amazon logo"
              />
            ) : (
              <span className="text-2xl text-white">Amazon</span>
            )}
          </Link>
          <div className="ml-3 hidden md:block text-white">
            <div className="text-xs md:text-sm">Deliver to {user?.name}</div>
            <div className="text-sm md:text-base font-bold">United Kingdom</div>
          </div>
        </div>
        {/* Middle */}
        <div className=" md:flex flex-grow items-center ml-4">
          <Search />
        </div>
        {/* Right */}

        <div className="flex items-center text-white">
          <div className="pr-4 pl-4 hidden md:block">
            <div className="text-xs xl:text-sm">
              {user ? (
                <span>{user?.email}</span>
              ) : (
                <Link to="/signin">Hello, sign in</Link>
              )}
            </div>
            <div className="text-sm xl:text-base font-bold">Accounts & Lists</div>
          </div>
          <div className="pr-4 pl-4 hidden md:block">
            <div className="text-xs xl:text-sm">
              <Link to="/products">Products</Link>
            </div>
            <div className="text-sm xl:text-base font-bold">& Orders</div>
          </div>

          <Link to={"/message"} className="ml-2 mr-4 md:mr-6 lg:mr-8 xl:mr-10">
            {/* ... Message icon ... */}
            <div className="flex pr-3 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-[16px] md:h-[28px] text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

              <div className="relative">
                <div className="absolute text-[12px] md:text-[13px] right-[-25px] top-[-14px] font-bold m-2 text-orange-400">
                  20
                </div>
              </div>
              {/* <div className="mt-7 text-xs xl:text-sm font-bold">Wishlist</div> */}
            </div>
          </Link>
          <Link to={"/wishlist"} className="ml-2 mr-4 md:mr-6 lg:mr-8 xl:mr-10">
            {/* ... Wishlist icon and count ... */}
            <div className="flex pr-3 pl-3">
              <HeartIcon className="h-[16px] md:h-[28px]  text-white" />
              <div className="relative">
                <div className="absolute text-[12px] md:text-[13px] right-[-20px] top-[-16px] font-bold m-2 text-orange-400">
                  {wishlist}
                </div>
              </div>
              {/* <div className="mt-7 text-xs xl:text-sm font-bold">Wishlist</div> */}
            </div>
          </Link>
          <Link to={"/cart"} className="ml-2 mr-4 md:mr-6 lg:mr-8 xl:mr-10">
            {/* ... Cart icon and count ... */}
            <div className="flex pr-3 pl-3">
              <ShoppingCartIcon className="h-[16px] md:h-[28px] text-white" />
              <div className="relative">
                <div className="absolute right-[-25px] top-[-18px] font-bold m-2 text-orange-400 text-[12px] md:text-[13px]">
                  {cart}
                </div>
              </div>
              {/* <div className="mt-7 text-xs xl:text-sm font-bold">Cart</div> */}
            </div>
          </Link>
        </div>
      </div>
      <div className="flex bg-amazonclone-light_blue text-white text-xs md:text-sm py-2 px-4 md:px-10 lg:px-16 xl:px-20 space-x-3">
        <div className="flex items-center">
          {sidebar ? (
            <CloseIcon onClick={() => setSidebar(false)} className="h-6 w-6" />
          ) : (
            <MenuIcon onClick={() => setSidebar(true)} className="h-6 w-6" />
          )}
          <span onClick={() => setSidebar(!sidebar)} isOpen={sidebar} className="ml-2">
            All
          </span>
          {sidebar && <CategorySidebar setOpen={setSidebar} user={user} />}
        </div>
        <div>Today's Deals</div>
        <div>
          <Link to="/products">Products</Link>
        </div>
        <div>Customer Service</div>
        <div>Registry</div>
        <div>Gift Cards</div>
        <div>Sell</div>
      </div>
    </header>
  );
};

export default NavBar;
