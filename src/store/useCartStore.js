import { create } from "zustand";

const useCartStore = create((set) => ({
  cartList: [],
  addCartItem: (item) =>
    set((state) => ({
      cartList: [...state.cartList, item],
    })),
  updateQantity: (name, quantity) =>
    set((state) => ({
      cartList: state.cartList
        .map((p) =>
          p.name === name ? { ...p, quantity: Math.max(0, quantity) } : p
        )
        .filter((p) => p.quantity > 0),
    })),
  removeCartItem: (name) => set((state) => ({
    cartList: state.cartList.filter(p => p.name != name)
  })),
  resetCart: () => 
    set(() => ({
        cartList: []
    }))
}));

export default useCartStore;
