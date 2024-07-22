import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import moment from "moment";
import Menu from "@/services/menu";
import MenuModal from "@/components/modals/menuModal/menuModal";
import Image from "next/image";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import DeleteMenuModal from "@/components/modals/deleteMenuModal/DeleteMenuModal";

export interface IMenu {
  _id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  createdAt?: Date | string;
  category: string;
  isFeatured: boolean;
  sizes: { size: string; price: number }[];
  quantities: { quantity: number; price: number }[];
  flavours: string[];
  quantity: number;
  price: number;
}

function MenuSection() {
  let token = Cookie?.get("token");
  const [menuData, setMenuData] = useState<IMenu[]>([]);
  const [menuModal, setMenuModal] = useState<boolean>(false);
  const [deleteMenuModal, setDeleteMenuModal] = useState<boolean>(false);

  const [currentMenu, setCurrentMenu] = useState<IMenu | null>(null);

  const handleGetAllMenu = async () => {
    try {
      const data = await Menu.getAllMenuItems(token);
      console.log(data);
      if (data?.status === 200) {
        setMenuData(data.menu);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllMenu();
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex w-full justify-between text-white">
        <h2 className="text-2xl font-bold my-8">Menu Table</h2>
        <span className="flex items-center space-x-1">
          <h3 className="font-bold">Total Items: </h3>
          <p>{menuData?.length}</p>
        </span>
      </div>
      <div className="w-full flex justify-end py-3">
        <button
          onClick={() => {
            setCurrentMenu(null);
            setMenuModal(true);
          }}
          className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2 w-[200px]"
        >
          Add Menu
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-transparent overflow-hidden shadow-md rounded-md border border-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {menuData?.map((menu) => (
              <tr
                key={menu._id}
                className="hover:bg-gray-600 hover:cursor-pointer"
              >
                <td className="py-4 px-6">
                  <Image
                    src={menu.imageUrl ?? ""}
                    alt="menu-image"
                    width={40}
                    height={40}
                  ></Image>
                </td>
                <td className="py-4 px-6">{menu?.name}</td>
                <td className="py-4 px-6">{menu?.description}</td>
                <td className="py-4 px-6">{menu?.category}</td>
                <td className="py-4 px-6">{menu.price}</td>
                <td className="py-4 px-6">
                  {menu?.createdAt
                    ? moment(menu?.createdAt).format("MMM DD, YYYY")
                    : "N/A"}
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setCurrentMenu(menu);
                        setMenuModal(true);
                      }}
                      className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentMenu(menu);
                        setDeleteMenuModal(true);
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
      <MenuModal
        loading={false}
        isOpen={menuModal}
        closeModal={() => {
          setCurrentMenu(null);
          setMenuModal(false);
        }}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        handleGetAllMenu={handleGetAllMenu}
      />
      <DeleteMenuModal
        isOpen={deleteMenuModal}
        closeModal={() => {
          setCurrentMenu(null);
          setDeleteMenuModal(false);
        }}
        currentMenu={currentMenu}
        setCurrentMenu={setCurrentMenu}
        handleGetAllMenu={handleGetAllMenu}
      />
    </div>
  );
}

export default MenuSection;
