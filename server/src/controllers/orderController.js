import { asyncHandler } from "../middlewares/asyncHandler.js";
import Distributor from "../models/distributorModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
class OrderController {
  // static createOrder = asyncHandler(async (req, res, next) => {
  //   try {
  //     const { orderItems, shippingAddress, paymentMethod } = req.body;

  //     // orderItems is an array of objects with each object being name, quantity, image, price, product
  //     if (orderItems && orderItems.length === 0) {
  //       res.status(400);
  //       throw new Error("No order items");
  //     } else {
  //       // get the ordered items from our database
  //       const itemsFromDB = await Product.find({
  //         _id: { $in: orderItems.map((x) => x._id) },
  //       });

  //       // map over the order items and use the price from our items from database
  //       const dbOrderItems = orderItems.map((itemFromClient) => {
  //         const matchingItemFromDB = itemsFromDB.find(
  //           (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
  //         );
  //         return {
  //           ...itemFromClient,
  //           product: itemFromClient._id,
  //           price: matchingItemFromDB.price,
  //           _id: undefined,
  //         };
  //       });

  //       // calculate prices
  //       const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
  //         calcPrices(dbOrderItems);

  //       const order = new Order({
  //         orderItems: dbOrderItems,
  //         user: req.user._id,
  //         shippingAddress,
  //         paymentMethod,
  //         itemsPrice,
  //         taxPrice,
  //         shippingPrice,
  //         totalPrice,
  //       });

  //       const createdOrder = await order.save();

  //       res.status(201).json({
  //         success: true,
  //         message: "Order has been added Successfully",
  //         createdOrder,
  //       });
  //     }
  //   } catch (error) {
  //     return next(new ErrorHandler(error.message, 500));
  //   }
  // });

  static createOrder = asyncHandler(async (req, res, next) => {
    try {
      const { orderItems, shippingAddress, paymentMethod, distributor } =
        req.body;

      // Check if orderItems is empty
      if (!orderItems || orderItems.length === 0) {
        return next(new ErrorHandler("No order items", 400));
      }

      // Check if the distributor exists
      const distributorExists = await Distributor.findById(distributor);
      if (!distributorExists) {
        return next(new ErrorHandler("Distributor not found", 404));
      }

      // Check if the user is assigned to the distributor
      const userAssignedToDistributor = distributorExists.shopKeepers.includes(
        req.user._id
      );
      if (!userAssignedToDistributor) {
        return next(
          new ErrorHandler("You are not assigned to this distributor", 403)
        );
      }

      // Get the ordered items from the database
      const itemsFromDB = await Product.find({
        _id: { $in: orderItems.map((x) => x._id) },
        distributor: distributor,
      });

      // Check if all products are from the specified distributor
      if (itemsFromDB.length !== orderItems.length) {
        return next(
          new ErrorHandler(
            "Some products are not available from this distributor",
            400
          )
        );
      }

      // Map over the order items and use the price from our items from database
      const dbOrderItems = orderItems.map((itemFromClient) => {
        const matchingItemFromDB = itemsFromDB.find(
          (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        );

        // Check if the product is in stock
        if (matchingItemFromDB.countInStock < itemFromClient.qty) {
          return next(
            new ErrorHandler(
              `Not enough stock for ${matchingItemFromDB.name}`,
              400
            )
          );
        }

        return {
          ...itemFromClient,
          product: itemFromClient._id,
          price: matchingItemFromDB.price,
          distributor: distributor,
          _id: undefined,
        };
      });

      // Calculate prices
      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrices(dbOrderItems);

      // Create the order
      const order = new Order({
        orderItems: dbOrderItems,
        user: req.user._id,
        distributor: distributor,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      // Save the order
      const createdOrder = await order.save();

      // Update the stock for each product
      for (const item of dbOrderItems) {
        const product = await Product.findById(item.product);
        product.countInStock -= item.qty;
        await product.save();
      }

      res.status(201).json({
        success: true,
        message: "Order has been added successfully",
        createdOrder,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static generateBill = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static acceptOrder = asyncHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }
      order.status = "process";
      await order.save();
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  static makeOrderAsDelivered = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        return next(new ErrorHandler(error.message, 500));
      }
      order.status = "delivered";
      await order.save();
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
  // ********* FOR Shop keepers
  // ********* FOR Shops
  static getShopOrders = asyncHandler(async (req, res, next) => {
    try {
      // Fetch orders where the logged-in user is the 'user'
      const orders = await Order.find({ user: req.user._id })
        .populate("distributor", "name email") // Populate distributor details (only name and email)

      // Send the orders as a response
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  // ********* FOR Distributors
  static getDistributorsOrders = asyncHandler(async (req, res, next) => {
    try {
      // Fetch orders where the logged-in user is the 'distributor'
      const orders = await Order.find({ distributor: req.user._id })
        .populate("user", "name email") // Populate user details (only name and email)
        .populate("distributor", "name email"); // Populate distributor details (only name and email)

      // Send the orders as a response
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });

  // ********* FOR Admin (fetch all orders)
  static fetchAllOrders = asyncHandler(async (req, res, next) => {
    try {
      // Fetch all orders and populate both 'user' and 'distributor'
      const orders = await Order.find()
        .populate("user", "name email") // Populate user details (only name and email)
        .populate("distributor", "name email"); // Populate distributor details (only name and email)

      // Send the orders as a response
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  });
}
export default OrderController;
