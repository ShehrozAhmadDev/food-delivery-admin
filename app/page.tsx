"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const router = useRouter();
  const items = [
    { title: "Login", link: "/login" },
    { title: "Users", link: "/admin/users" },
    { title: "Menu", link: "/admin/menu" },
    { title: "Orders", link: "/admin/orders" },
  ];
  return (
    <div className="w-screen mx-auto bg-[#0d0d10] h-screen justify-center items-center flex flex-col ">
      <h1 className="text-4xl font-bold mb-6 text-red-700">
        Food Delivery Admin App
      </h1>
      {items.map((item) => (
        <button
          onClick={() => router.push(item.link)}
          className="bg-transparent  my-2 border-red-700 border-2 rounded-lg text-red-700 font-semibold py-3 px-6 text-4xl hover:bg-red-700 hover:text-white hover:border-red-500 transition-all duration-300 ease-in-out"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default Home;
