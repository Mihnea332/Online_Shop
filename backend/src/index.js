import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config();

// 1. Conectăm baza de date
// În serverless, e mai bine să apelăm funcția direct
connectDB().catch((error) => {
  console.log("MONGODB connection failed:", error.message);
});

// 2. Gestionăm erorile globale
app.on("error", (error) => {
  console.log("EXPRESS ERROR:", error);
});

// 3. Rulăm app.listen DOAR dacă suntem pe calculatorul nostru (local)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

// 4. IMPORTANT: Această linie lipsea și e motivul principal pentru eroare!
export default app;
