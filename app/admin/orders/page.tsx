"use client";
import ListOrders from "@/components/sections/listOrders/listOrders";
import Sidebar from "@/components/sidebar/sidebar";
import { useState } from "react";

const ChatPage = () => {
  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] p-6">
        <ListOrders />
      </div>
    </div>
  );
};

export default ChatPage;
