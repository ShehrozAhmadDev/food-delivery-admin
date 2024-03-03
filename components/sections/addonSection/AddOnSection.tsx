import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import moment from "moment";
import Menu from "@/services/menu";
import MenuModal from "@/components/modals/menuModal/menuModal";
import Image from "next/image";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import DeleteMenuModal from "@/components/modals/deleteMenuModal/DeleteMenuModal";
import Addon from "@/services/addon";
import AddonModal from "@/components/modals/addonModal/addonModal";
import DeleteAddonModal from "@/components/modals/deleteAddonModal/DeleteAddonModal";

export interface IAddOn {
  _id?: string;
  name: string;
  description: string;
  price: number | string;
  imageUrl?: string;
  createdAt?: Date | string;
}

function AddonSection() {
  let token = Cookie?.get("token");
  const [addonData, setAddonData] = useState<IAddOn[]>([]);
  const [addonModal, setAddonModal] = useState<boolean>(false);
  const [deleteAddonModal, setDeleteAddonModal] = useState<boolean>(false);

  const [currentAddon, setCurrentAddon] = useState<IAddOn | null>(null);

  const handleGetAllAddon = async () => {
    try {
      const data = await Addon.getAllAddonItems(token);
      console.log(data);
      if (data?.status === 200) {
        setAddonData(data.addon);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllAddon();
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex w-full justify-between text-white">
        <h2 className="text-2xl font-bold my-8">Addon Table</h2>
        <span className="flex items-center space-x-1">
          <h3 className="font-bold">Total Items: </h3>
          <p>{addonData?.length}</p>
        </span>
      </div>
      <div className="w-full flex justify-end py-3">
        <button
          onClick={() => {
            setCurrentAddon(null);
            setAddonModal(true);
          }}
          className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2 w-[200px]"
        >
          Add Addon Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-transparent overflow-hidden shadow-md rounded-md border border-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {addonData?.map((addon) => (
              <tr
                key={addon._id}
                className="hover:bg-gray-600 hover:cursor-pointer"
              >
                <td className="py-4 px-6">
                  <Image
                    src={addon.imageUrl ?? ""}
                    alt="menu-image"
                    width={40}
                    height={40}
                  ></Image>
                </td>
                <td className="py-4 px-6">{addon?.name}</td>
                <td className="py-4 px-6">{addon?.description}</td>
                <td className="py-4 px-6">{addon.price}</td>
                <td className="py-4 px-6">
                  {addon?.createdAt
                    ? moment(addon?.createdAt).format("MMM DD, YYYY")
                    : "N/A"}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setCurrentAddon(addon);
                        setAddonModal(true);
                      }}
                      className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentAddon(addon);
                        setDeleteAddonModal(true);
                      }}
                      className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2 "
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddonModal
        loading={false}
        isOpen={addonModal}
        closeModal={() => {
          setCurrentAddon(null);
          setAddonModal(false);
        }}
        currentAddon={currentAddon}
        setCurrentAddon={setCurrentAddon}
        handleGetAllAddon={handleGetAllAddon}
      />
      <DeleteAddonModal
        isOpen={deleteAddonModal}
        closeModal={() => {
          setCurrentAddon(null);
          setDeleteAddonModal(false);
        }}
        currentAddon={currentAddon}
        setCurrentAddon={setCurrentAddon}
        handleGetAllAddon={handleGetAllAddon}
      />
    </div>
  );
}

export default AddonSection;
