import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IBanner } from "../modals/bannerModal/BannerModal";


interface BannerCardProps {
    banner: IBanner | null;
    onEdit: ()=>void;
    onDelete: ()=>void
}
const BannerCard = ({ banner, onEdit, onDelete }: BannerCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <FaEdit />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900 transition duration-300"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
      {banner && 
      <img
        src={banner.imageUrl}
        alt={"Banner"}
        className="w-full h-40 object-cover mb-4"
      />
    }
    </div>
  );
};

export default BannerCard;
