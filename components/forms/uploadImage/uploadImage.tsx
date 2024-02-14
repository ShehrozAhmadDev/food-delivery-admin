import Image from "next/image";
import { useState } from "react";

interface IUploadImageProps {
  image: any;
  selectedFile: any;
  setSelectedFile: any;
}

export const UploadImage = ({
  image,
  selectedFile,
  setSelectedFile,
}: IUploadImageProps) => {
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="relative">
      <label
        htmlFor="imageInput"
        className="block cursor-pointer w-full h-full bg-[#2f2f2f] border-dashed border-4 border-gray-500 rounded-md text-center"
      >
        {selectedFile ? (
          <Image
            width={200}
            height={200}
            src={URL.createObjectURL(selectedFile)}
            alt="Selected File"
            className="w-[200px] h-[200px] object-cover rounded-md"
          />
        ) : image ? (
          <Image
            width={200}
            height={200}
            src={image}
            alt="Selected File"
            className="w-[200px] h-[200px] object-cover rounded-md"
          />
        ) : (
          <div className="py-16">
            <p className="text-gray-400">Click to select an image</p>
          </div>
        )}
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default UploadImage;
