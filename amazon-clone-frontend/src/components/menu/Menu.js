import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../../redux/auth';
import { useEffect, useState } from 'react';


export default function DropdownProfile() {
    const { data, isLoading } = useMeQuery();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Initial check on component mount
      handleResize();

      // Add event listener for window resize
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isMobile]);
  return (
    <Dropdown>
      <MenuButton className="mt-2">
        <Tooltip title="Your Profile" placement='top'>
          <Avatar
            src={data?.user?.avatar?.url}
            className="h-full w-full object-contain"
            style={{
              height: isMobile ? "22px" : "32px",
              width: isMobile ? "22px" : "32px",
            }}
          />
        </Tooltip>
      </MenuButton>
      <Menu className="bg-white p-2" style={{ zIndex: "1000" }}>
        <MenuItem className="m-3 text-[18px] cursor-pointer">
          <Link to="/account">My account</Link>
        </MenuItem>
        <MenuItem className="m-3 text-[18px] cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </MenuItem>
        <MenuItem className="block md:hidden m-3 text-[18px] cursor-pointer">
          <Link to="/cart">Cart</Link>
        </MenuItem>
        <MenuItem className="block md:hidden m-3 text-[18px] cursor-pointer">
          <Link to="/wishlist">Wishlist</Link>
        </MenuItem>
        <MenuItem className="block md:hidden m-3 text-[18px] cursor-pointer">
          <Link to="/message">Message</Link>
        </MenuItem>
        <MenuItem className="m-3 text-[18px] cursor-pointer">
          <Link to="/orders">My Orders</Link>
        </MenuItem>
        <MenuItem className="m-3 text-[18px] cursor-pointer">
          <Link to="/notifications">Notifications</Link>
        </MenuItem>
        <MenuItem className="m-3 text-[18px] cursor-pointer">
          <Link to="settings">Settings</Link>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
