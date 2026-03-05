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
      required: true,
      trim: true,
    },
    items: [
      {
        nume: { type: String, required: true },
        pret: { type: Number, required: true },
        cantitate: { type: Number, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Noua", "In curs", "Finalizata"],
      default: "Noua",
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      block: {
        type: String,
        trim: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Order = mongoose.model("Order", orderSchema);
