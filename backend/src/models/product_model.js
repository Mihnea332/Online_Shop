import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    variants: [variantSchema],
    images: [{ type: String }],
    category: { type: String, default: "Generale" },
  },
  { timestamps: true },
);
export const Product = mongoose.model("Product", productSchema);
