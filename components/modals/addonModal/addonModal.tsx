import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { IAddOn } from "@/components/sections/addonSection/AddOnSection";
import Menu from "@/services/menu";
import { toast } from "react-toastify";
import UploadImage from "@/components/forms/uploadImage/uploadImage";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Addon from "@/services/addon";

interface AddonModalProps {
  loading: boolean;
  isOpen: boolean;
  currentAddon: IAddOn | null;
  setCurrentAddon: (value: IAddOn | null) => void;
  closeModal: () => void;
  handleGetAllAddon: () => void;
}

const initialAddon = {
  name: "",
  description: "",
  price: "",
};

function AddonModal({
  loading,
  isOpen,
  closeModal,
  currentAddon,
  setCurrentAddon,
  handleGetAllAddon,
}: AddonModalProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addonData, setAddonData] = useState<IAddOn>(initialAddon);
  const [loadingS, setLoading] = useState(false);
  const handleFieldChange = (e: any) => {
    setAddonData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNewAddonItem = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      formData.append("name", addonData.name);
      formData.append("description", addonData.description);
      formData.append("price", addonData.price);
      formData.append("thumbnail", selectedFile);
      const data = await Addon.addAddonItem(formData, token);
      if (data.status === 200) {
        closeModal();
        setCurrentAddon(null);
        setAddonData(initialAddon);
        toast.success("Addon Item Added");
        setSelectedFile(null);
        handleGetAllAddon();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleUpdateAddonItem = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);

      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      formData.append("name", addonData.name);
      formData.append("description", addonData.description);
      formData.append("price", addonData.price);
      formData.append("thumbnail", selectedFile);
      if (selectedFile) {
        formData.append("thumbnail", selectedFile);
      }
      const data = await Menu.updateMenuItem(
        addonData._id ?? "",
        formData,
        token
      );
      if (data.status === 200) {
        closeModal();
        toast.success("Menu Item Updated");
        setCurrentAddon(null);
        setAddonData(initialAddon);
        setSelectedFile(null);
        handleGetAllAddon();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentAddon) setAddonData(currentAddon);

    return () => {
      setAddonData(initialAddon);
      setSelectedFile(null);
    };
  }, [currentAddon]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Addon"
      className="absolute top-1/2 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-black p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      <div className="w-[600px]">
        {loading ? (
          <p className="text-white font-bold my-2">Loading....</p>
        ) : (
          <PerfectScrollbar>
            <div className="max-h-[calc(100vh-90px)] overflow-y-auto no-scrollbar text-white px-5">
              <h1 className="mx-auto my-3 text-2xl text-center">
                {currentAddon ? "Update Addon Item" : "Add New Item"}
              </h1>
              <form
                onSubmit={
                  currentAddon ? handleUpdateAddonItem : handleAddNewAddonItem
                }
              >
                <div className="mb-6">
                  <p className="text-gray-400 font-bold my-1">Name:</p>
                  <input
                    placeholder="Name"
                    value={addonData.name}
                    name="name"
                    onChange={handleFieldChange}
                    className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                    required
                  />
                </div>
                <div className="mb-6">
                  <p className="text-gray-400 font-bold my-1">Description:</p>
                  <textarea
                    placeholder="Description"
                    value={addonData.description}
                    name="description"
                    onChange={handleFieldChange}
                    className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                    required
                  />
                </div>
                <div className="mb-6 w-full">
                  <p className="text-gray-400 font-bold my-1">Upload Image:</p>
                  <UploadImage
                    image={addonData.imageUrl}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-gray-400 font-bold my-1">Price:</p>
                  <input
                    placeholder="Price"
                    value={addonData.price}
                    name="price"
                    type="number"
                    onChange={handleFieldChange}
                    className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
                >
                  {loadingS ? (
                    <>Please Wait...</>
                  ) : (
                    <>{currentAddon ? "Edit" : "Add"}</>
                  )}
                </button>
              </form>
            </div>
          </PerfectScrollbar>
        )}
      </div>
    </Modal>
  );
}

export default AddonModal;
