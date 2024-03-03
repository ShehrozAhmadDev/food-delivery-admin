import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { IAddOn } from "@/components/sections/addonSection/AddOnSection";
import Addon from "@/services/addon";

interface IDeleteAddonModalProps {
  isOpen: boolean;
  currentAddon: IAddOn | null;
  closeModal: () => void;
  setCurrentAddon: (value: IAddOn | null) => void;
  handleGetAllAddon: () => void;
}

function DeleteAddonModal({
  isOpen,
  closeModal,
  currentAddon,
  handleGetAllAddon,
}: IDeleteAddonModalProps) {
  let token = Cookie?.get("token");

  const handleDeleteAddonItem = async (e: any) => {
    try {
      e.preventDefault();
      const data = await Addon.deleteAddonItem(currentAddon?._id, token);
      console.log(data);
      if (data.status === 200) {
        closeModal();
        toast.success("Addon Item Deleted");
        handleGetAllAddon();
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
        <h1>Are you sure you want to delete this addon item?</h1>
        <div className="flex items-center space-x-2 justify-end w-full">
          <button
            onClick={handleDeleteAddonItem}
            className="w-full bg-gradient-to-r from-red-600 to-red-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="w-full bg-gradient-to-r from-red-600 to-red-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteAddonModal;
