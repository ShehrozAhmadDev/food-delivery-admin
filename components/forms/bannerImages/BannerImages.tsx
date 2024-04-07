import React, { useEffect, useState } from "react";
import BannerModal, { IBanner } from "@/components/modals/bannerModal/BannerModal";
import DeleteBannerModal from "@/components/modals/deleteBannerModal/DeleteBannerModal";
import BannerService from "@/services/banner";
import BannerCard from "@/components/BannerCard/BannerCard";

function BannerSection() {
  const [banners, setBanners] = useState([]);
  const [bannerModal, setBannerModal] = useState(false);
  const [deleteBannerModal, setDeleteBannerModal] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<IBanner|null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await BannerService.getAllBannerItems();
      if (data?.status === 200) {
        setBanners(data.banner);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openBannerModal = (banner = null) => {
    setCurrentBanner(banner);
    setBannerModal(true);
  };

  const openDeleteBannerModal = (banner: IBanner) => {
    setCurrentBanner(banner);
    setDeleteBannerModal(true);
  };

  return (
    <div className="mx-auto">
      <div className="flex w-full justify-between text-white">
        <h2 className="text-2xl font-bold my-8">Banner Cards</h2>
        <span className="flex items-center space-x-1">
          <h3 className="font-bold">Total Banners: </h3>
          <p>{banners?.length}</p>
        </span>
      </div>
      <div className="w-full flex justify-end py-3">
        <button
          onClick={() => openBannerModal()}
          className="text-white bg-gradient-to-r from-red-600 to-red-400 rounded-lg hover:opacity-70 transition duration-300 p-2 w-[200px]"
        >
          Add Banner
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {banners?.map((banner, index) => (
          <BannerCard
            key={index}
            banner={banner}
            onEdit={() => openBannerModal(banner)}
            onDelete={() => openDeleteBannerModal(banner)}
          />
        ))}
      </div>
      <BannerModal
        isOpen={bannerModal}
        closeModal={() => {
          setCurrentBanner(null);
          setBannerModal(false);
        }}
        loading={false}
        setCurrentBanner={setCurrentBanner}
        currentBanner={currentBanner}
        handleGetAllBanner={fetchBanners}
      />
      <DeleteBannerModal
        isOpen={deleteBannerModal}
        closeModal={() => {
          setCurrentBanner(null);
          setDeleteBannerModal(false);
        }}
        setCurrentBanner={setCurrentBanner}
        currentBanner={currentBanner}
        handleGetAllBanner={fetchBanners}
      />
    </div>
  );
}

export default BannerSection;
