import mongoose, { mongo, Schema } from "mongoose";
const orderSchema = new Schema(
  {
    customer: {
      customerName: { type: String, required: true, trim: true },
      phoneNumber: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      block: { type: String, trim: true },
      number: { type: String, required: true },
      description: { type: String, required: true },
    },
    items: [
      {
        id: { type: Number },
        name: { type: String, required: true },
        variantName: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    total: {
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
