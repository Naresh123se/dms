import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/app/slices/cartSlice";
import { ScrollArea } from "../ui/scroll-area";
import {BillGenerated} from "./BillGenerated";

const Cart = () => {
  const nav = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (_id) => {
    dispatch(removeFromCart({ _id }));
  };

  const handleUpdateQuantity = (_id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ _id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            to="../"
            className="inline-block bg-[#1E3A8A] text-white px-6 py-3 rounded-md font-medium hover:bg-[#1E3A8A]/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Your Shopping Cart
      </h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src={item.images[0]?.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item._id, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 hover:text-[#1E3A8A]/90"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1 text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item._id, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 hover:text-[#1E3A8A]/90"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item._id)}
                          className="font-medium text-[#1E3A8A]/90 hover:text-indigo-500 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleClearCart}
                className="text-sm font-medium text-[#1E3A8A]/90 hover:text-indigo-500 flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
              <button
                type="button"
                onClick={() => nav("../checkout")}
                className="bg-[#1E3A8A]/90 text-white px-6 py-3 rounded-md font-medium hover:bg-[#1E3A8A]/90 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>
      <BillGenerated />
    </div>
  );
};

export default Cart;
