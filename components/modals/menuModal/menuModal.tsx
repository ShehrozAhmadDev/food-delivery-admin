import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import { IMenu } from "@/components/sections/menuSection/MenuSection";
import Menu from "@/services/menu";
import { toast } from "react-toastify";
import UploadImage from "@/components/forms/uploadImage/uploadImage";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MdDelete } from "react-icons/md";

interface MenuModalProps {
  loading: boolean;
  isOpen: boolean;
  currentMenu: IMenu | null;
  setCurrentMenu: (value: IMenu | null) => void;
  closeModal: () => void;
  handleGetAllMenu: () => void;
}

const initialMenu = {
  name: "",
  description: "",
  category: "",
  isFeatured: false,
  price: "",
  quantity: 1,
};

function MenuModal({
  loading,
  isOpen,
  closeModal,
  currentMenu,
  setCurrentMenu,
  handleGetAllMenu,
}: MenuModalProps) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [menuData, setMenuData] = useState<IMenu>(initialMenu);
  const [loadingS, setLoading] = useState(false);
  const [flavours, setFlavours] = useState<string[]>([""]);
  const handleFieldChange = (e: any) => {
    setMenuData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddNewMenuItem = async (e: any) => {
    try {
      if (
        !menuData.name ||
        (!menuData.description && !menuData.category && menuData.price)
      ) {
        toast.error("Please fill required fields");
        return;
      }
      e.preventDefault();
      setLoading(true);
      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      formData.append("name", menuData.name);
      formData.append("description", menuData.description);
      formData.append("category", menuData.category);
      formData.append("isFeatured", menuData.isFeatured);
      formData.append("quantity", menuData.quantity);
      formData.append("price", menuData.price);
      formData.append("thumbnail", selectedFile);
      const data = await Menu.addMenuItem(formData, token);
      if (data.status === 200) {
        closeModal();
        setCurrentMenu(null);
        setMenuData(initialMenu);
        toast.success("Menu Item Added");
        setSelectedFile(null);
        handleGetAllMenu();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleUpdateMenuItem = async (e: any) => {
    try {
      if (
        !menuData.name ||
        (!menuData.description && !menuData.category && menuData.price)
      ) {
        toast.error("Please fill required fields");
        return;
      }
      e.preventDefault();
      setLoading(true);

      const token = Cookie.get("token");
      console.log(selectedFile);
      const formData: any = new FormData();
      formData.append("name", menuData.name);
      formData.append("description", menuData.description);
      formData.append("category", menuData.category);
      formData.append("isFeatured", menuData.isFeatured);
      formData.append("quantity", menuData.quantity);
      formData.append("price", menuData.price);
      if (selectedFile) {
        formData.append("thumbnail", selectedFile);
      }
      const data = await Menu.updateMenuItem(
        menuData._id ?? "",
        formData,
        token
      );
      if (data.status === 200) {
        closeModal();
        toast.success("Menu Item Updated");
        setCurrentMenu(null);
        setMenuData(initialMenu);
        setSelectedFile(null);
        handleGetAllMenu();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleFlavourChange = (flavour: string, index: number) => {
    const flavoursCopy = [...flavours];
    flavoursCopy[index] = flavour;
    setFlavours(flavoursCopy);
  };

  const addFlavour = () => {
    setFlavours([...flavours, ""]);
  };

  const deleteFlavour = (index: number) => {
    // Use slice instead of splice
    const flavoursCopy = [
      ...flavours.slice(0, index),
      ...flavours.slice(index + 1),
    ];
    setFlavours(flavoursCopy);
  };
  useEffect(() => {
    if (currentMenu) {
      setMenuData(currentMenu);
      if (currentMenu.flavours) setFlavours(currentMenu.flavours);
    }

    return () => {
      setMenuData(initialMenu);
      setSelectedFile(null);
    };
  }, [currentMenu]);

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
        {loading ? (
          <p className="text-white font-bold my-2">Loading....</p>
        ) : (
          <PerfectScrollbar>
            <div className="max-h-[calc(100vh-90px)] overflow-y-auto no-scrollbar text-white px-5">
              <h1 className="mx-auto my-3 text-2xl text-center">
                {currentMenu ? "Update Menu Item" : "Add New Item"}
              </h1>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Name:</p>
                <input
                  placeholder="Name"
                  value={menuData.name}
                  name="name"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Description:</p>
                <textarea
                  placeholder="Description"
                  value={menuData.description}
                  name="description"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Category:</p>
                <input
                  placeholder="Category"
                  value={menuData.category}
                  name="category"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                />
              </div>
              <div className="mb-6 w-full">
                <p className="text-gray-400 font-bold my-1">Upload Image:</p>
                <UploadImage
                  image={menuData.imageUrl}
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                />
              </div>

              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Price:</p>
                <input
                  placeholder="Price"
                  value={menuData.price}
                  name="price"
                  type="number"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Quantity:</p>
                <input
                  placeholder="Quantity"
                  value={menuData.quantity}
                  name="quantity"
                  type="number"
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                />
              </div>
              <div className="mb-6">
                <p className="text-gray-400 font-bold my-1">Flavours:</p>
                <div className="flex flex-col gap-3">
                  {flavours.map((flavour, index) => (
                    <div className="flex gap-2 items-center">
                      <input
                        placeholder="Add Flavour"
                        value={flavour}
                        name="flavour"
                        type="text"
                        onChange={(e) => {
                          handleFlavourChange(e.target.value, index);
                        }}
                        className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
                      />
                      <button
                        className="bg-gradient-to-r from-red-600 to-red-400 p-2 rounded-md hover:opacity-80"
                        onClick={() => {
                          deleteFlavour(index);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="bg-gradient-to-r from-red-600 to-red-400 py-2 px-2 mt-3 rounded-md hover:opacity-80"
                  onClick={addFlavour}
                >
                  Add +
                </button>
              </div>
              <div className=" w-full mb-6">
                <p className="text-gray-400 font-bold my-1">
                  Do you want to feature this item?
                </p>
                <div className="relative">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={menuData.isFeatured}
                      name="isFeatured"
                      onChange={(e: any) => {
                        setMenuData((prevData) => ({
                          ...prevData,
                          [e.target.name]: e.target.checked,
                        }));
                      }}
                    />
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div
                      className={`toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transform ${
                        menuData.isFeatured
                          ? "translate-x-full"
                          : "translate-x-0"
                      }`}
                    ></div>
                    <div className="ml-3 text-gray-700 font-medium">
                      {menuData.isFeatured ? "Yes" : "No"}
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-400 py-3 rounded-md hover:opacity-80 transition-all duration-300"
                onClick={
                  currentMenu ? handleUpdateMenuItem : handleAddNewMenuItem
                }
              >
                {loadingS ? (
                  <>Please Wait...</>
                ) : (
                  <>{currentMenu ? "Edit" : "Add"}</>
                )}
              </button>
            </div>
          </PerfectScrollbar>
        )}
      </div>
    </Modal>
  );
}

export default MenuModal;
