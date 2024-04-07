import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import Banner from "@/services/banner";
import { toast } from "react-toastify";
import { IBanner } from "../bannerModal/BannerModal";

interface IDeleteBannerModalProps {
  isOpen: boolean;
  currentBanner: IBanner | null;
  closeModal: () => void;
  setCurrentBanner: (value: IBanner | null) => void;
  handleGetAllBanner: () => void;
}

function DeleteBannerModal({
  isOpen,
  closeModal,
  currentBanner,
  handleGetAllBanner,
}: IDeleteBannerModalProps) {
  let token = Cookie?.get("token");

  const handleDeleteBannerItem = async (e: any) => {
    try {
      e.preventDefault();
      const data = await Banner.deleteBannerItem(currentBanner?._id, token);
      console.log(data);
      if (data.status === 200) {
        closeModal();
        toast.success("Banner Item Deleted");
        handleGetAllBanner();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Banner"
      className="absolute top-1/2 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-black p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="w-[600px]">
        <h1>Are you sure you want to delete this Banner item?</h1>
        <div className="flex items-center space-x-2 justify-end w-full">
          <button
            onClick={handleDeleteBannerItem}
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

export default DeleteBannerModal;
