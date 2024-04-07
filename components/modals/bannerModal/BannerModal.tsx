import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { toast } from "react-toastify";
import UploadImage from "@/components/forms/uploadImage/uploadImage";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Banner from "@/services/banner";


export interface IBanner {
    _id?: string;
    imageUrl : string;
}
interface BannerModalProps {
  loading: boolean;
  isOpen: boolean;
  currentBanner: IBanner | null;
  setCurrentBanner: (value: IBanner | null) => void;
  closeModal: () => void;
  handleGetAllBanner: () => void;
}

const initialBanner = {
  imageUrl: "",
};

function BannerModal({
  loading,
  isOpen,
  closeModal,
  currentBanner,
  setCurrentBanner,
  handleGetAllBanner,
}: BannerModalProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bannerData, setBannerData] = useState<IBanner>(initialBanner);
  const [loadingS, setLoading] = useState(false);
  const [flavours, setFlavours] = useState<string[]>([""]);
  const handleFieldChange = (e: any) => {
    setBannerData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNewBannerItem = async (e: any) => {
    try {
      if (!selectedFile
      ) {
        toast.error("Please fill required fields");
        return;
      }
      e.preventDefault();
      setLoading(true);
      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      formData.append("thumbnail", selectedFile);
      const data = await Banner.addMenuItem(formData, token);
      console.log(data)
      if (data.status === 200) {
        closeModal();
        setCurrentBanner(null);
        setBannerData(initialBanner);
        toast.success("Banner Item Added");
        setSelectedFile(null);
        handleGetAllBanner();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleUpdateBannerItem = async (e: any) => {
    try {
      if (
            !selectedFile
      ) {
        toast.error("Please fill required fields");
        return;
      }
      e.preventDefault();
      setLoading(true);

      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      if (selectedFile) {
        formData.append("thumbnail", selectedFile);
      }
      const data = await Banner.updateBannerItem(
        bannerData._id ?? "",
        formData,
        token
      );
      if (data.status === 200) {
        closeModal();
        toast.success("Banner Item Updated");
        setCurrentBanner(null);
        setBannerData(initialBanner);
        setSelectedFile(null);
        handleGetAllBanner();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (currentBanner) {
      setBannerData(currentBanner);
    }

    return () => {
      setBannerData(initialBanner);
      setSelectedFile(null);
    };
  }, [currentBanner]);

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
        {loading ? (
          <p className="text-white font-bold my-2">Loading....</p>
        ) : (
          <PerfectScrollbar>
            <div className="max-h-[calc(100vh-90px)] overflow-y-auto no-scrollbar text-white px-5">
              <h1 className="mx-auto my-3 text-2xl text-center">
                {currentBanner ? "Update Banner Item" : "Add New Item"}
              </h1>

              <div className="mb-6 w-full">
                <p className="text-gray-400 font-bold my-1">Upload Image:</p>
                <UploadImage
                  image={bannerData.imageUrl}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
                onClick={
                  currentBanner ? handleUpdateBannerItem : handleAddNewBannerItem
                }
              >
                {loadingS ? (
                  <>Please Wait...</>
                ) : (
                  <>{currentBanner ? "Edit" : "Add"}</>
                )}
              </button>
            </div>
          </PerfectScrollbar>
        )}
      </div>
    </Modal>
  );
}

export default BannerModal;
