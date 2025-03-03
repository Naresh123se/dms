import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Truck, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { clearCart } from "@/app/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = totalPrice * 0.13;
  const orderTotal = totalPrice + shipping + tax;

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      dispatch(clearCart());
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center transform transition-all duration-300 scale-100 hover:scale-105">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order is on its way!
          </p>
          <p className="text-gray-500 mb-8">
            Check your email for order details.
          </p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-200 transform hover:-translate-y-1"
          >
            Shop More
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Add some items to your cart to proceed with checkout.
          </p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 pt-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-5 text-center tracking-tight">
        Checkout
      </h1>
      <ScrollArea className="h-[calc(100vh-150px)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b border-gray-100 pb-4"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={item.images[0]?.url}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 mt-6 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <p>Tax (13%)</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900 pt-3 border-t border-gray-200">
                    <p>Total</p>
                    <p>${orderTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Shipping & Payment
                </h2>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                  <p>Free shipping on orders over $100</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="h-5 w-5 mr-2 text-indigo-600" />
                  <p>All major credit cards accepted</p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email is invalid",
                          },
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        {...register("address", {
                          required: "Address is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        {...register("city", {
                          required: "City is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          State
                        </label>
                        <input
                          id="state"
                          {...register("state", {
                            required: "State is required",
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                            errors.state ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.state && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="zipCode"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          ZIP Code
                        </label>
                        <input
                          id="zipCode"
                          {...register("zipCode", {
                            required: "ZIP code is required",
                          })}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                            errors.zipCode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.zipCode && (
                          <p className="mt-2 text-xs text-red-500">
                            {errors.zipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Payment
                  </h2>
                  {/* <div className="grid grid-cols-1 gap-6 mb-8">
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      {...register("cardName", {
                        required: "Name on card is required",
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardName && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.cardName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^\d{16}$/,
                          message: "Card number must be 16 digits",
                        },
                      })}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Expiration Date
                      </label>
                      <input
                        id="expDate"
                        {...register("expDate", {
                          required: "Expiration date is required",
                          pattern: {
                            value: /^\d{2}\/\d{2}$/,
                            message: "Use format MM/YY",
                          },
                        })}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.expDate ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.expDate && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.expDate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        CVV
                      </label>
                      <input
                        id="cvv"
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: "CVV must be 3 or 4 digits",
                          },
                        })}
                        placeholder="XXX"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                          errors.cvv ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.cvv && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div> */}
                  <Button>Khalti</Button>

                  <div className="flex justify-between items-center">
                    <Link
                      to="../cart"
                      className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
                    >
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-200 transform hover:-translate-y-1 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting
                        ? "Processing..."
                        : `Pay $${orderTotal.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Checkout;
