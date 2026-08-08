// In-memory array acting as our "database"
// Each item: { id, name, category, quantity, price }

let inventory = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", quantity: 50, price: 15.99 },
  { id: 2, name: "Notebook", category: "Stationery", quantity: 200, price: 1.5 },
  { id: 3, name: "Office Chair", category: "Furniture", quantity: 10, price: 89.99 },
];

// Simple auto-increment counter for new item IDs
let nextId = 4;

const getNextId = () => nextId++;

module.exports = {
  inventory,
  getNextId,
};
