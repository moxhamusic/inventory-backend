const express = require("express");
const router = express.Router();

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/inventoryController");

const {
  validateCreateItem,
  validateUpdateItem,
  validateIdParam,
} = require("../middleware/validation");

// GET /api/inventory        -> list all items (supports ?category=&minQuantity=&maxQuantity=&search=)
router.get("/", getAllItems);

// GET /api/inventory/:id    -> get single item
router.get("/:id", validateIdParam, getItemById);

// POST /api/inventory       -> create new item
router.post("/", validateCreateItem, createItem);

// PUT /api/inventory/:id    -> update existing item
router.put("/:id", validateIdParam, validateUpdateItem, updateItem);

// DELETE /api/inventory/:id -> delete item
router.delete("/:id", validateIdParam, deleteItem);

module.exports = router;
