import "./config/env.js";
import connectDB from "./config/database.js";
import app from "./app.js";
import { ensureDefaultAdmin } from "./controllers/user_controller.js";

await connectDB();
await ensureDefaultAdmin();

app.on("error", (error) => {
  console.log("EXPRESS ERROR:", error);
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}

export default app;
