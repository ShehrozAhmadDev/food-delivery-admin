import { IAddOnItem, IMenuItem, IOrders } from "@/hooks/orders/useOrders";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import parse from "html-react-parser";
import { statuses } from "@/constants/statuses";
import Cookie from "js-cookie";
import Project from "@/services/orders";
import { toast } from "react-toastify";
import Link from "next/link";
import Orders from "@/services/orders";

interface ShowOrderModalProps {
  loading: boolean;
  isOpen: boolean;
  currentOrder: IOrders | null;
  closeModal: () => void;
  getAllOrders: () => void;
}

function ShowOrderModal({
  loading,
  isOpen,
  closeModal,
  currentOrder,
  getAllOrders,
}: ShowOrderModalProps) {
  const [selectedStatus, setSelectedStatus] = useState("");

  const updateCurrentOrderStatus = async () => {
    const token = Cookie.get("token");
    try {
      const data = await Orders.updateOrderStatus(
        selectedStatus,
        currentOrder?._id,
        token
      );
      if (data?.status === 200) {
        getAllOrders();
        closeModal();
        toast.success("Status have been updated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentOrder) {
      setSelectedStatus(currentOrder?.status);
    }
  }, [currentOrder]);
  const calculateTotalPrice = (
    cartItems: {
      menuItemId: IMenuItem;
      quantity: number;
      addOns: IAddOnItem[];
    }[]
  ) => {
    return cartItems.reduce((total, cartItem) => {
      return total + cartItem.menuItemId.price * cartItem.quantity;
    }, 0);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Cancel Subscription Modal"
      className="absolute top-1/2 left-1/2 transform focus:outline-none -translate-x-1/2 -translate-y-1/2 bg-[#2f2f2f] p-10 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm flex justify-center items-center"
      ariaHideApp={false}
    >
      {currentOrder && (
        <div className="w-[600px]">
          {loading ? (
            <p className="text-white font-bold my-2">Loading....</p>
          ) : (
            <div className="max-h-[calc(100vh-190px)] overflow-y-auto  text-white">
              <div className="w-full flex justify-between">
                <span className="flex space-x-2 items-center text-lg">
                  <h1 className="text-xl font-bold">Title: </h1>
                  <p>{currentOrder?.phone}</p>
                </span>
                <span className="flex space-x-2 text-sm items-center">
                  <label className="font-bold">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent focus:outline-none p-1 rounded-lg border border-white"
                  >
                    {statuses.map((status) => (
                      <option
                        key={status?.key}
                        value={status?.value}
                        className="bg-black"
                      >
                        {status?.key}
                      </option>
                    ))}
                  </select>
                </span>
              </div>

              {currentOrder.items.length > 0 ? (
                <div>
                  {currentOrder.items.map((cartItem, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-[#2f2f2f] rounded-md flex items-center"
                    >
                      <img
                        src={cartItem.menuItemId.imageUrl}
                        alt={cartItem.menuItemId.name}
                        className="w-16 h-16 object-contain rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {cartItem.menuItemId.name}
                        </h3>
                        <p className="text-gray-200">
                          {cartItem.menuItemId.description}
                        </p>
                        <p className="text-gray-200 mt-1">
                          Quantity: {cartItem.quantity} - Total: $
                          {cartItem.menuItemId.price * cartItem.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      Total Price: ${calculateTotalPrice(currentOrder.items)}
                    </p>
                    {/* Add checkout or place order button here */}
                  </div>
                </div>
              ) : (
                <p>Your cart is empty.</p>
              )}

              <span className=" text-lg">
                <h1 className="text-xl font-bold">Address: </h1>
                <div className="ml-4">
                  {parse(currentOrder?.address)}, {currentOrder.city}
                </div>
              </span>
            </div>
          )}
          {currentOrder?.status !== selectedStatus && (
            <div className="flex justify-end mt-5">
              <button
                onClick={updateCurrentOrderStatus}
                className="text-white bg-gradient-to-r from-orange-500 to-yellow-300 rounded-lg hover:opacity-70 transition duration-300 p-2 w-[200px]"
              >
                Save
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

export default ShowOrderModal;
