import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import User from "@/services/user";
import { userI } from "@/redux/features/user-slice";
import moment from "moment";

function UserSection() {
  let token = Cookie?.get("token");
  const [userData, setUserData] = useState<userI[]>([]);

  const handleGetAllUsers = async () => {
    try {
      const data = await User.getUsers(token);
      if (data?.status === 200) {
        setUserData(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex w-full justify-between text-white">
        <h2 className="text-2xl font-bold my-8">Users Table</h2>
        <span className="flex items-center space-x-1">
          <h3 className="font-bold">Total Users: </h3>
          <p>{userData?.length}</p>
        </span>
      </div>
      <table className="min-w-full bg-transparent overflow-hidden shadow-md rounded-md border border-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Verified</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {userData?.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-600 hover:cursor-pointer"
            >
              <td className="py-4 px-6">{user?.fullName}</td>
              <td className="py-4 px-6">{user?.email}</td>
              <td className="py-4 px-6">{user?.verified ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserSection;
