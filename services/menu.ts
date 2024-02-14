import { IMenu } from "@/components/sections/menuSection/MenuSection";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Menu = {
  getAllMenuItems: async (token: string | undefined) => {
    return axios
      .get(
        `${baseUrl}/menu`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  addMenuItem: async (
    menuItem: IMenu,
    token?: string
  ) => {
    return axios
      .post(
        `${baseUrl}/menu/`,
        menuItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  updateMenuItem: async (
    menuId: string,
    menuItem: IMenu,
    token?: string
  ) => {
    return axios
      .put(
        `${baseUrl}/menu/${menuId}`,
        menuItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  deleteMenuItem: async (
    menuId?: string,
    token?: string
  ) => {
    return axios
      .delete(
        `${baseUrl}/menu/${menuId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
};

export default Menu;
