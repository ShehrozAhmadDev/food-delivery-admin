import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";
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
    logo: <GoListUnordered />,
  },
  {
    title: "Menu",
    link: "/admin/menu",
    logo: <GoListUnordered />,
  },
  {
    title: "AddOn",
    link: "/admin/addon",
    logo: <GoListUnordered />,
  },
];
