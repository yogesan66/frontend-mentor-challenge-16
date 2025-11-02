import React from "react";
import useCartStore from "../../store/useCartStore";
import { useState } from "react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Cart = ({confirmOrder}) => {
  const { cartList, removeCartItem } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = cartList.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.price || 0),
      0
    );
    setTotal(totalAmount);
  }, [cartList]);

  return (
    <div className="bg-rose-50 p-4 rounded-lg w-72">
      <p className="font-bold text-lg text-brown">
        Your Cart ({cartList.length})
      </p>

      {cartList.length > 0 && (
        <>
          {cartList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b-[0.05rem] border-b-rose-100"
            >
              <div className="font-semibold text-xs flex flex-col gap-1">
                <p>{item.name}</p>
                <div className="flex gap-3">
                  <span className="text-brown">{item.quantity}x</span>
                  <span className="text-rose-400">@${item.price}</span>
                  <span className="text-rose-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
              <span
                className="rounded-full h-4 w-4 border border-rose-400 transition-all hover:border-rose-900  text-rose-400 hover:text-rose-900 flex justify-center items-center cursor-pointer"
                onClick={() => removeCartItem(item.name)}
              >
                <RxCross2 />
              </span>
            </div>
          ))}

          <div className="flex justify-between py-4">
            <p className="text-xs">Order Total</p>
            <p className="font-bold text-rose-900">${total.toFixed(2)}</p>
          </div>
          <div className="bg-rose-100 py-3 rounded-md text-xs text-rose-900 flex items-center justify-center mb-4">
            <img
              src="/images/icon-carbon-neutral.svg"
              alt="icon carbon neutral"
              className="mr-1 h-4 w-4"
            />
            This is a{" "}
            <span className="font-semibold mr-1 ml-1"> carbon-neutral </span>{" "}
            delivery
          </div>
          <button className="bg-brown transition-all hover:bg-[#952C0C] text-rose-50 w-full text-sm py-2 rounded-full cursor-pointer" onClick={confirmOrder}>
            Confirm Order
          </button>
        </>
      )}

      {cartList.length === 0 && (
        <div className="flex flex-col justify-center items-center py-3">
          <img src="/images/illustration-empty-cart.svg" alt="empty cart" />
          <p className="text-rose-500 text-xs font-semibold">
            Your added items will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
