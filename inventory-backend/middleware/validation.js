const ApiError = require("./ApiError");

// Validates the body when creating a new inventory item.
// All fields are required for a new item.
const validateCreateItem = (req, res, next) => {
  const { name, category, quantity, price } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return next(new ApiError(400, "Field 'name' is required and must be a non-empty string"));
  }

  if (!category || typeof category !== "string" || !category.trim()) {
    return next(new ApiError(400, "Field 'category' is required and must be a non-empty string"));
  }

  if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
    return next(new ApiError(400, "Field 'quantity' is required and must be a non-negative number"));
  }

  if (price === undefined || typeof price !== "number" || price < 0) {
    return next(new ApiError(400, "Field 'price' is required and must be a non-negative number"));
  }

  next();
};

// Validates the body when updating an item.
// Fields are optional, but if present must be of the correct type.
const validateUpdateItem = (req, res, next) => {
  const { name, category, quantity, price } = req.body;

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Request body cannot be empty for an update"));
  }

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    return next(new ApiError(400, "Field 'name' must be a non-empty string"));
  }

  if (category !== undefined && (typeof category !== "string" || !category.trim())) {
    return next(new ApiError(400, "Field 'category' must be a non-empty string"));
  }

  if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
    return next(new ApiError(400, "Field 'quantity' must be a non-negative number"));
  }

  if (price !== undefined && (typeof price !== "number" || price < 0)) {
    return next(new ApiError(400, "Field 'price' must be a non-negative number"));
  }

  next();
};

// Validates that the :id route param is a valid integer
const validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new ApiError(400, "Item id must be a positive integer"));
  }
  next();
};

module.exports = {
  validateCreateItem,
  validateUpdateItem,
  validateIdParam,
};
