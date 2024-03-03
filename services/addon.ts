import { IAddOn } from "@/components/sections/addonSection/AddOnSection";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Addon = {
  getAllAddonItems: async (token: string | undefined) => {
    return axios
      .get(
        `${baseUrl}/addon`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => toast.error(error?.response?.data?.message));
  },
  addAddonItem: async (
    addonItem: IAddOn,
    token?: string
  ) => {
    return axios
      .post(
        `${baseUrl}/addon/`,
        addonItem,
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
  updateAddonItem: async (
    addonId: string,
    addonItem: IAddOn,
    token?: string
  ) => {
    return axios
      .put(
        `${baseUrl}/addon/${addonId}`,
        addonItem,
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
  deleteAddonItem: async (
    addonId?: string,
    token?: string
  ) => {
    return axios
      .delete(
        `${baseUrl}/addon/${addonId}`,
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

export default Addon;
