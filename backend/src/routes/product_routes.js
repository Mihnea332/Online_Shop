import express from "express";
import { Product } from "../models/product_model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import auth from "../middleware/auth.js"; // <-- ADAUGĂ ACEST IMPORT

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Eroare la server", error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, description, variants, images, category } = req.body;
    const productName = name.trim().replace(/\s+/g, "_").toLowerCase();
    const targetFolder = `Online_Shop/${productName}`;
    const uploadedImagesUrls = [];

    for (const imageRaw of images) {
      const uploadResponse = await cloudinary.uploader.upload(imageRaw, {
        folder: targetFolder,
      });
      uploadedImagesUrls.push(uploadResponse.secure_url);
    }

    const newProduct = new Product({
      name,
      description,
      variants,
      images: uploadedImagesUrls,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Date invalide", error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description, variants, images, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, variants, images, category },
      { new: true },
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Produsul nu a fost găsit" });
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Eroare la actualizare", error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produsul nu a fost găsit" });
    }

    const productName = product.name.trim().replace(/\s+/g, "_").toLowerCase();
    const targetFolder = `Online_Shop/${productName}`;

    await cloudinary.api.delete_resources_by_prefix(targetFolder + "/");

    try {
      await cloudinary.api.delete_folder(targetFolder);
    } catch (folderErr) {}

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produs și imagini șterse cu succes! 🌸" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Eroare la ștergere", error: error.message });
  }
});

export default router;
