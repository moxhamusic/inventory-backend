require("dotenv").config();
const express = require("express");
const cors = require("cors");

const inventoryRoutes = require("./routes/inventoryRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Core middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management System API is running",
  });
});

// Feature routes
app.use("/api/inventory", inventoryRoutes);

// 404 handler (must come after all valid routes)
app.use(notFoundHandler);

// Centralized error handler (must be the last app.use)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
