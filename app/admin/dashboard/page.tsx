"use client";
import DashboardContent from "@/components/sections/dashboard/dashboard";
import Sidebar from "@/components/sidebar/sidebar";

const Dashboard = () => {
  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] p-6">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
