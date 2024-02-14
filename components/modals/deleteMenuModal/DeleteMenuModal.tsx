import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { IMenu } from "@/components/sections/menuSection/MenuSection";
import Menu from "@/services/menu";
import { toast } from "react-toastify";

interface IDeleteMenuModalProps {
  isOpen: boolean;
  currentMenu: IMenu | null;
  closeModal: () => void;
  setCurrentMenu: (value: IMenu | null) => void;
  handleGetAllMenu: () => void;
}

function DeleteMenuModal({
  isOpen,
  closeModal,
  currentMenu,
  handleGetAllMenu,
}: IDeleteMenuModalProps) {
  let token = Cookie?.get("token");

  const handleDeleteMenuItem = async (e: any) => {
    try {
      e.preventDefault();
      const data = await Menu.deleteMenuItem(currentMenu?._id, token);
      console.log(data);
      if (data.status === 200) {
        closeModal();
        toast.success("Menu Item Deleted");
        handleGetAllMenu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Menu"
      className="absolute top-1/2 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-black p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="w-[600px]">
        <h1>Are you sure you want to delete this menu item?</h1>
        <div className="flex items-center space-x-2 justify-end w-full">
          <button
            onClick={handleDeleteMenuItem}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteMenuModal;
