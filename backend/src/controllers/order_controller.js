import "../config/env.js";
import { Order } from "../models/order_model.js";
import { Product } from "../models/product_model.js"; // <-- ADAUGĂ ACEST IMPORT
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE;

const getPayPalAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || "Eroare la autentificare Paypal");
  }
  return data.access_token;
};
const createPayPalOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Comanda nu contine produse" });
    }

    let calculatedTotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await Product.findOne({ name: item.name });
      if (!product) {
        return res.status(400).json({
          message: `Produsul "${item.name}" nu exista in baza de date`,
        });
      }

      let realPrice;
      if (item.variantName) {
        const variant = product.variants.find(
          (v) => v.name === item.variantName,
        );
        if (!variant) {
          return res.status(400).json({
            message: `Varianta "${item.variantName}" nu exista pentru produsul "${item.name}"`,
          });
        }
        realPrice = variant.price;
      } else {
        if (!product.variants || product.variants.length === 0) {
          return res.status(400).json({
            message: `Produsul "${item.name}" nu are variante configurate`,
          });
        }
        realPrice = product.variants[0].price;
      }

      const clientPrice = Number(item.price);
      if (
        Number.isNaN(clientPrice) ||
        Math.abs(clientPrice - realPrice) > 0.01
      ) {
        return res.status(400).json({
          message: `Pretul trimis pentru "${item.name}" nu corespunde cu pretul real`,
        });
      }

      const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
      calculatedTotal += realPrice * quantity;

      verifiedItems.push({
        id: item.id,
        name: product.name,
        variantName: item.variantName || undefined,
        price: realPrice,
        quantity,
      });
    }

    const newOrder = new Order({
      customer,
      items: verifiedItems,
      total: calculatedTotal,
      paymentMethod: "paypal",
      paymentStatus: "Neplatita",
    });
    const savedOrder = await newOrder.save();

    const accessToken = await getPayPalAccessToken();

    const paypalResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: savedOrder._id.toString(),
              amount: {
                currency_code: "EUR",
                value: calculatedTotal.toFixed(2),
              },
            },
          ],
          application_context: {
            return_url: `https://online-shop-44y1-nine.vercel.app/checkout-success?order_id=${savedOrder._id.toString()}`,
            cancel_url: `https://online-shop-44y1-nine.vercel.app/payment-failed?order_id=${savedOrder._id.toString()}`,
            user_action: "PAY_NOW",
          },
        }),
      },
    );

    const paypalData = await paypalResponse.json();

    if (!paypalResponse.ok) {
      return res.status(400).json({
        message: "Eroare la crearea comenzii PayPal",
        error: paypalData,
      });
    }

    savedOrder.paypalOrderId = paypalData.id;
    await savedOrder.save();

    const approveLink = paypalData.links.find((link) => link.rel === "approve");

    res.status(201).json({
      message: "Comanda a fost salvată temporar, redirecționare...",
      order: savedOrder,
      url: approveLink.href,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Eroare la trimiterea comenzii", error: error.message });
  }
};
const capturePayPalOrder = async (req, res) => {
  try {
    const { paypalOrderId } = req.body;

    if (!paypalOrderId) {
      return res.status(400).json({ message: "Lipseste paypalOrderId" });
    }

    const accessToken = await getPayPalAccessToken();

    const captureResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok || captureData.status !== "COMPLETED") {
      await Order.findOneAndUpdate(
        { paypalOrderId },
        { paymentStatus: "Esuata" },
      );
      return res.status(400).json({
        message: "Plata nu a putut fi finalizata",
        error: captureData,
      });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { paypalOrderId },
      { paymentStatus: "Platita" },
      { new: true },
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "Comanda nu a fost gasita in baza de date." });
    }

    return res
      .status(200)
      .json({ message: "Plata confirmata", order: updatedOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Eroare la verificarea platii", error: error.message });
  }
};
const createOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Comanda nu contine produse" });
    }

    let calculatedTotal = 0;
    const verifiedItems = [];

    // Verificam fiecare produs comandat impotriva bazei de date
    for (const item of items) {
      const product = await Product.findOne({ name: item.name });

      if (!product) {
        return res.status(400).json({
          message: `Produsul "${item.name}" nu exista in baza de date`,
        });
      }

      let realPrice;

      if (item.variantName) {
        const variant = product.variants.find(
          (v) => v.name === item.variantName,
        );
        if (!variant) {
          return res.status(400).json({
            message: `Varianta "${item.variantName}" nu exista pentru produsul "${item.name}"`,
          });
        }
        realPrice = variant.price;
      } else {
        if (!product.variants || product.variants.length === 0) {
          return res.status(400).json({
            message: `Produsul "${item.name}" nu are variante configurate`,
          });
        }
        realPrice = product.variants[0].price;
      }

      // Comparam pretul trimis de client cu cel real din baza de date
      const clientPrice = Number(item.price);
      if (
        Number.isNaN(clientPrice) ||
        Math.abs(clientPrice - realPrice) > 0.01
      ) {
        return res.status(400).json({
          message: `Pretul trimis pentru "${item.name}" nu corespunde cu pretul real`,
        });
      }

      const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
      calculatedTotal += realPrice * quantity;

      verifiedItems.push({
        id: item.id,
        name: product.name,
        variantName: item.variantName || undefined,
        price: realPrice, // folosim pretul din DB, nu cel trimis de client
        quantity,
      });
    }

    const newOrder = new Order({
      customer,
      items: verifiedItems,
      total: calculatedTotal, // recalculat pe server, ignoram total-ul trimis de client
      paymentStatus: "Neplatita",
    });

    const savedOrder = await newOrder.save();

    const lineItems = verifiedItems.map((item) => {
      const displayName = item.variantName
        ? `${item.name} - ${item.variantName}`
        : item.name;
      return {
        price_data: {
          currency: "eur",
          product_data: { name: displayName },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "https://online-shop-44y1-nine.vercel.app/checkout-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: `https://online-shop-44y1-nine.vercel.app/payment-failed?order_id=${savedOrder._id.toString()}`,
      client_reference_id: savedOrder._id.toString(),
    });

    savedOrder.stripeSessionId = session.id;
    await savedOrder.save();

    res.status(201).json({
      message: "Comanda a fost salvată temporar, redirecționare...",
      order: savedOrder,
      url: session.url,
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
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const updatedOrder = await Order.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { paymentStatus: "Platita" },
        { new: true },
      );

      if (!updatedOrder) {
        return res
          .status(404)
          .json({ message: "Comanda nu a fost găsită în baza de date." });
      }

      return res
        .status(200)
        .json({ message: "Plata confirmată", order: updatedOrder });
    } else {
      return res.status(400).json({ message: "Plata nu a fost finalizată" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Eroare la verificarea plății", error: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  verifyPayment,
  createPayPalOrder,
  capturePayPalOrder,
};
