import { useState } from "react";
import "./App.css";
import Cart from "./components/cart/Cart";
import ConfirmationPopup from "./components/confirmation-popup/ConfirmationPopup";
import ProductCard from "./components/product-card/ProductCard";
import productList from "./db/data.json";
import useCartStore from "./store/useCartStore";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const { resetCart } = useCartStore();

  const confirmOrder = () => {
    setOpenModal(true);
  };
  
  const closeModal = () => {
    setOpenModal(false);
    resetCart();
  }

  return (
    <div className="font-red-hat min-h-screen min-w-screen bg-rose-100 relative pb-6">
      <section className="h-full flex flex-col justify-center md:flex-row flex-wrap md:gap-6 max-w-max mx-auto">
        <section className="mt-12">
          <h6 className="font-bold text-3xl text-rose-900">Desserts</h6>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {productList.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
        <section className="mt-10">
          <Cart confirmOrder={confirmOrder} />
        </section>
      </section>
      {openModal && <ConfirmationPopup closeModal={closeModal}/>}
    </div>
  );
}

export default App;
