import React from 'react';
import { Package2, Truck, CreditCard, Clock } from 'lucide-react';


export default function OrderCard({ order }) {
  const date = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" /> {date}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            order.status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {order.orderItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
              <p className="text-sm font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">₹{order.taxPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">₹{order.shippingPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{order.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-500" />
          <span>{order.paymentMethod}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package2 className="w-4 h-4 text-gray-500" />
          <span>{order.isPaid ? 'Paid' : 'Unpaid'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-gray-500" />
          <span>{order.isDelivered ? 'Delivered' : 'Pending'}</span>
        </div>
      </div>
    </div>
  );
}