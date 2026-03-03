import { Order } from "../models/order_model.js";
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Comanda a fost trimisa cu succes!",
      order: savedOrder,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Eroare la trimiterea comenzii", error: error.message });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Eroare la preluarea comenzilor",
      error: error.message,
    });
  }
};
export { createOrder, getAllOrders };
