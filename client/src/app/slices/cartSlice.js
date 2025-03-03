import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage (if available)
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// Initial state for the cart
const initialState = {
  items: loadCartFromStorage(), // Load items from localStorage
};

// Save cart items to localStorage
const saveCartToStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

// Cart slice to handle adding/removing items
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload._id);
      saveCartToStorage(state.items); // Save updated cart to localStorage
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items); // Clear cart in localStorage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
