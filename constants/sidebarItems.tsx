import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
import { MdDeliveryDining } from "react-icons/md";
import { PiCards } from "react-icons/pi";
import { LuMenuSquare } from "react-icons/lu";

import { HiOutlineUsers } from "react-icons/hi";

export const sideBarItems = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    logo: <MdOutlineDashboardCustomize />,
  },
  {
    title: "Users",
    link: "/admin/users",
    logo: <HiOutlineUsers />,
  },
  {
    title: "Orders",
    link: "/admin/orders",
    logo: <MdDeliveryDining />,
  },
  {
    title: "Menu",
    link: "/admin/menu",
    logo: <LuMenuSquare />,
  },
  {
    title: "Banners",
    link: "/admin/banner",
    logo: <PiCards />,
  },
  {
    title: "AddOn",
    link: "/admin/addon",
    logo: <GoListUnordered />,
  },
];
