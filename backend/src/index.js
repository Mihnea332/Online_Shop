import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});
const startServer = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    await connectDB();
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });
    const port = process.env.PORT || 5000;
    app.listen(process.env.port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch (error) {
    console.log("MONGODB connection failed", err);
  }
};
startServer();
