"use client";
import { useAppSelector } from "@/redux/store";

const DashboardContent = () => {
  const { user } = useAppSelector((state) => state.userReducer.value);

  return (
    <div className="py-12 px-6 text-white">
      <h2 className="text-4xl font-bold mb-8 ">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#212121] p-8 rounded-lg ">
          <p className="text-xl font-semibold mb-4">Name</p>
          <p>{user?.fullName}</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-lg ">
          <p className="text-xl font-semibold mb-4">Email</p>
          <p>{user?.email}</p>
        </div>
        {/* <div className="bg-[#212121] p-8 rounded-lg ">
          <p className="text-xl font-semibold mb-4">Number of orders to do</p>
          <p>10</p>
        </div>
        <div className="bg-[#212121] p-8 rounded-lg ">
          <p className="text-xl font-semibold mb-4">Number of chats unread</p>
          <p>2</p>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardContent;
