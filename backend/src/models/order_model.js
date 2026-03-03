import mongoose, { mongo, Schema } from "mongoose";
const orderSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      requred: true,
      trim: true,
    },
    items: {
      type: Array,
      requred: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Noua", "In curs", "Finalizata"],
      default: "Noua",
    },
  },
  {
    timestamps: true,
  },
);
export const Order = mongoose.model("Order", orderSchema);
