import React from "react";
import useCartStore from "../../store/useCartStore";
import { useState } from "react";
import { useEffect } from "react";

const ConfirmationPopup = ({closeModal}) => {
  const { cartList } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cartList.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price || 0),
      0
    );
    setTotal(totalAmount);
  }, [cartList]);

  return (
    <div className="fixed inset-0 flex justify-center items-end sm:items-center h-full w-full z-50 bg-black/50">
      <div className="bg-rose-50 rounded-lg p-7 w-full max-w-110">
        <img src="/images/icon-order-confirmed.svg" alt="icon order confirmed" className="h-9 w-9" />
        <div className="mt-3">
          <p className="text-rose-900 font-bold text-3xl w-48 sm:w-full">Order Confirmed</p>
          <p className="text-rose-400 text-xs mt-2">
            We hope you enjoy your food!
          </p>
        </div>
        <div className="bg-rose-100 rounded-md mt-6 p-4">
          {cartList.map((item, index) => (
            <>
              <div key={index} className="flex justify-between items-center">
                <div className="flex  gap-3">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="h-9 w-9 rounded-sm"
                  />
                  <div className="font-semibold text-xs flex flex-col gap-1 ">
                    <p>{item.name}</p>
                    <div className="flex gap-3">
                      <span className="text-brown">{item.quantity}x</span>
                      <span className="text-rose-400">@${item.price}</span>
                    </div>
                  </div>
                </div>
                <span className="text-rose-900 text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <div className="border-t border-rose-300/20 w-full my-3"></div>
            </>
          ))}

          <div className="flex justify-between mt-5 mb-1">
            <p className="text-xs">Order Total</p>
            <p className="font-bold text-rose-900">${total.toFixed(2)}</p>
          </div>
        </div>
        <button className="bg-brown transition-all hover:bg-[#952C0C] text-rose-50 w-full text-sm py-2 rounded-full mt-6 cursor-pointer" onClick={closeModal}>
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
