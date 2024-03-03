"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import MenuSection from "@/components/sections/menuSection/MenuSection";
import AddonSection from "@/components/sections/addonSection/AddOnSection";

const AddOn = () => {
  return (
    <div className="flex bg-[#0d0d10] text-black/[.80]">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[80%] p-6">
        <AddonSection />
      </div>
    </div>
  );
};

export default AddOn;
