import moment from "moment";
import ShowOrderModal from "@/components/modals/showOrderModal/showOrderModal";
import useOrders from "@/hooks/orders/useOrders";

const ListOrders = () => {
  const {
    loading,
    orders,
    currentOrder,
    showOrderModal,

    setShowOrderModal,
    handleOrdersClick,
    getAllOrders,
  } = useOrders();
  console.log(orders);
  return (
    <>
      <div className="w-full text-white">
        <h2 className="text-4xl font-bold mb-8 text-white">Orders</h2>

        <div className="flex gap-5">
          <div
            className={`h-[calc(100vh-150px)] overflow-y-auto pr-5 w-full flex flex-col gap-2 transition-all duration-300 `}
          >
            {loading ? (
              <p className="text-white font-bold my-2">Loading....</p>
            ) : orders?.length === 0 ? (
              <p className="text-white font-bold my-2 p-4">No Orders to show</p>
            ) : (
              <div className="p-4">
                {/* <div className="grid grid-cols-3 gap-10 gap-x-20">
                  {orders?.map((order) => (
                    <div
                      className={`text-white bg-[#212121] items-center cursor-pointer hover:opacity-75 transition-all duration-300 p-4 rounded-lg`}
                      onClick={() => handleOrdersClick(order)}
                    >
                      <span className="w-full flex justify-between">
                        <p className="text-sm capitalize font-bold">
                          Order# {order?._id}
                        </p>
                        <p
                          className={`${
                            order?.status === "on-route"
                              ? " bg-blue-500"
                              : order?.status === "pending"
                              ? "bg-gray-500"
                              : order?.status === "delivered"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } py-1 px-2 rounded-2xl text-xs flex items-center justify-center`}
                        >
                          {order?.status}
                        </p>
                      </span>
                      <p>Rs: {order.price}</p>

                      <p className="text-sm mt-2">
                        by {order?.createdBy?.fullName}
                      </p>
                      <p className="text-white/[.70] text-xs mt-2">
                        {moment(order?.createdAt).format("MMM DD, YYYY")}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <ShowOrderModal
        loading={loading}
        isOpen={showOrderModal}
        closeModal={() => setShowOrderModal(false)}
        currentOrder={currentOrder}
        getAllOrders={getAllOrders}
      />
    </>
  );
};

export default ListOrders;
