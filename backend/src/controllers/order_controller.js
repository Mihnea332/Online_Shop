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
const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({
        message: "Comanda negasita",
      });
    res.status(200).json({
      message: "Comanda a fost stearsa",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Noua", "In curs", "Finalizata"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Status invalid" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Comanda negasita" });
    }

    return res.status(200).json({
      message: "Status actualizat cu succes",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Eroare la actualizare",
      error: error.message,
    });
  }
};
export { createOrder, getAllOrders, deleteOrder, updateOrderStatus };
