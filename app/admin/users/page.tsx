"use client";
import User from "@/services/user";
import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import UserSection from "@/components/sections/userSection/userSection";

const Users = () => {
  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] p-6">
        <UserSection />
      </div>
    </div>
  );
};

export default Users;
