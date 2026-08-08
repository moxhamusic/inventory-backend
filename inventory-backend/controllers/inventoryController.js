const { inventory, getNextId } = require("../model/inventoryData");
const ApiError = require("../middleware/ApiError");

// GET /api/inventory
// Supports optional query params: category, minQuantity, maxQuantity, search
const getAllItems = (req, res, next) => {
  try {
    let result = [...inventory];
    const { category, minQuantity, maxQuantity, search } = req.query;

    // Filter by category (case-insensitive exact match)
    if (category) {
      result = result.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by quantity range
    if (minQuantity !== undefined) {
      const min = Number(minQuantity);
      if (Number.isNaN(min)) {
        throw new ApiError(400, "Query param 'minQuantity' must be a number");
      }
      result = result.filter((item) => item.quantity >= min);
    }

    if (maxQuantity !== undefined) {
      const max = Number(maxQuantity);
      if (Number.isNaN(max)) {
        throw new ApiError(400, "Query param 'maxQuantity' must be a number");
      }
      result = result.filter((item) => item.quantity <= max);
    }

    // Search by item name (partial, case-insensitive)
    if (search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/inventory/:id
const getItemById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const item = inventory.find((i) => i.id === id);

    if (!item) {
      throw new ApiError(404, `Item with id ${id} not found`);
    }

    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// POST /api/inventory
const createItem = (req, res, next) => {
  try {
    const { name, category, quantity, price } = req.body;

    const newItem = {
      id: getNextId(),
      name: name.trim(),
      category: category.trim(),
      quantity,
      price,
    };

    inventory.push(newItem);

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    next(err);
  }
};

// PUT /api/inventory/:id
const updateItem = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = inventory.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new ApiError(404, `Item with id ${id} not found`);
    }

    const { name, category, quantity, price } = req.body;
    const existing = inventory[index];

    const updatedItem = {
      ...existing,
      name: name !== undefined ? name.trim() : existing.name,
      category: category !== undefined ? category.trim() : existing.category,
      quantity: quantity !== undefined ? quantity : existing.quantity,
      price: price !== undefined ? price : existing.price,
    };

    inventory[index] = updatedItem;

    res.status(200).json({ success: true, data: updatedItem });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/inventory/:id
const deleteItem = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const index = inventory.findIndex((i) => i.id === id);

    if (index === -1) {
      throw new ApiError(404, `Item with id ${id} not found`);
    }

    const [deleted] = inventory.splice(index, 1);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
