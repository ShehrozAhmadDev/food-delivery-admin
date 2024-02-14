import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import Orders from "@/services/orders";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface IMenuItem{
  _id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  isFeatured: boolean;
  createdAt?: Date | string;
  quantity: number;
  imageUrl?: string;
}

export interface IAddOnItem{
  
}
export interface IOrders {
  _id: string;
  startTime: string | Date;
  endTime: string | Date;
  address: string;
  city: string;
  status: string;
  phone: string;
  items: {menuItemId: IMenuItem, quantity: number, addOns: IAddOnItem[]}[]
  createdBy: IUser;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function useOrders() {
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrders | null>(null);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleOrdersClick = (item: IOrders) => {
    setCurrentOrder(item);
    setShowOrderModal(true);
  };

  const getAllOrders = async () => {
    const token = Cookie.get("token");
    try {
      setLoading(true);
      const data = await Orders.getAllOrders(token);
      console.log(data)
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return {
    loading,
    orders,
    currentOrder,
    showOrderModal,

    setShowOrderModal,
    handleOrdersClick,
    getAllOrders,
  };
}
