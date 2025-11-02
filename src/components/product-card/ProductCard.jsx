import React from "react";
import { useState } from "react";
import useCartStore from "../../store/useCartStore";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const { addCartItem, cartList, updateQantity } = useCartStore();
  const cartItem = cartList.find((p) => p.name === product.name);
  const quantity = cartItem?.quantity || 0;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSrc =
    windowWidth > 1024
      ? product.image.desktop
      : windowWidth > 768
      ? product.image.tablet
      : product.image.mobile;

  const addProduct = () => {
    addCartItem({
      ...product,
      price: product.price.toFixed(2),
      id: Date.now(),
      quantity: 1,
    });
  };
  return (
    <div className="select-none">
      <div className="h-44 relative">
        <img
          src={imageSrc}
          className={`rounded-lg aspect-square h-full w-full ${
            quantity > 0 ? "outline-2 outline-brown rounded-lg" : ""
          }`}
        />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 ">
          {quantity === 0 && (
            <button
              className="flex gap-1 text-[0.7rem] text-rose-900 hover:text-brown transition-all font-semibold bg-rose-50 px-5 py-2 rounded-full border border-rose-300 hover:border-brown justify-center items-center w-max cursor-pointer"
              onClick={() => addProduct()}
            >
              <img
                src="/images/icon-add-to-cart.svg"
                alt="add-to-card-icon"
                className="h-[0.9rem]"
              />{" "}
              <p>Add to Cart</p>
            </button>
          )}
          {quantity > 0 && (
            <div className="flex text-[0.7rem] font-semibold bg-brown px-2 justify-between py-2 rounded-full items-center w-32 text-rose-50">
              <span className="hover:bg-rose-50 hover:text-brown border border-rose-50 h-4 w-4 flex justify-center items-center rounded-full cursor-pointer transition-all" onClick={() => updateQantity(product.name, quantity - 1)}>
               <FaMinus />
              </span>

              {quantity}
              <span className="hover:bg-rose-50 hover:text-brown border border-rose-50 h-4 w-4 flex justify-center items-center rounded-full cursor-pointer transition-all" onClick={() => updateQantity(product.name, quantity + 1)}>
                <IoMdAdd />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col text-sm gap-0.5 mt-7">
        <span className="text-rose-500 text-xs">{product.category}</span>
        <span className="text-rose-900 font-semibold">{product.name}</span>
        <span className="text-xs font-semibold text-brown">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
