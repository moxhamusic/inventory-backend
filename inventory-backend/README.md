# Simple Inventory Management System (Backend)

A backend-only Inventory Management System built with **Node.js + Express**, using
**in-memory array storage** instead of a database. It provides clean RESTful CRUD
operations, query-based filtering and searching, request validation, and centralized
error handling — all organized into a modular folder structure.

## Tech Stack

- Node.js
- Express.js
- dotenv (environment configuration)
- cors
- nodemon (development only)

## Folder Structure

```
inventory-backend/
│
├── index.js                        # Main entry point for the Express server
│
├── controllers/
│   └── inventoryController.js      # CRUD and query logic
│
├── routes/
│   └── inventoryRoutes.js          # Inventory API endpoints
│
├── middleware/
│   ├── validation.js               # Input validation middleware
│   ├── errorHandler.js             # Centralized error + 404 middleware
│   └── ApiError.js                 # Custom error class
│
├── model/
│   └── inventoryData.js            # Array-based in-memory data store
│
├── .env                            # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   PORT=5000
   ```

3. Run in development mode (auto-restart on changes):
   ```
   npm run dev
   ```

   Or run normally:
   ```
   npm start
   ```

The server starts at `http://localhost:5000`.

## Data Model

Each inventory item has the shape:

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 50,
  "price": 15.99
}
```

Data is stored in a plain JavaScript array in memory (`model/inventoryData.js`) and
resets whenever the server restarts. No database or file storage is used.

## API Endpoints

Base URL: `/api/inventory`

| Method | Endpoint             | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/inventory`      | Get all items (supports query params) |
| GET    | `/api/inventory/:id`  | Get a single item by ID               |
| POST   | `/api/inventory`      | Create a new item                     |
| PUT    | `/api/inventory/:id`  | Update an existing item               |
| DELETE | `/api/inventory/:id`  | Delete an item                        |

### Query Parameters (GET /api/inventory)

| Param         | Type   | Description                              |
|---------------|--------|-------------------------------------------|
| `category`    | string | Filter by exact category (case-insensitive) |
| `minQuantity` | number | Filter items with quantity ≥ value        |
| `maxQuantity` | number | Filter items with quantity ≤ value        |
| `search`      | string | Search items by name (partial match)      |

Example:
```
GET /api/inventory?category=Electronics&minQuantity=10&search=mouse
```

### Request Body (POST / PUT)

```json
{
  "name": "Wireless Mouse",
  "category": "Electronics",
  "quantity": 50,
  "price": 15.99
}
```

- `POST` requires all four fields.
- `PUT` accepts any subset of fields (partial update).

## Response Format

All responses are JSON with a consistent shape:

**Success**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error**
```json
{
  "success": false,
  "status": 404,
  "message": "Item with id 99 not found"
}
```

## Error Handling

- Invalid or missing fields → `400 Bad Request`
- Item not found → `404 Not Found`
- Unknown routes → `404 Not Found`
- Unexpected server errors → `500 Internal Server Error`

All errors pass through a single centralized error-handling middleware
(`middleware/errorHandler.js`) to keep responses consistent.

## Testing the API

Use Postman, Thunder Client, or curl to test endpoints, e.g.:

```
curl http://localhost:5000/api/inventory
curl -X POST http://localhost:5000/api/inventory -H "Content-Type: application/json" -d "{\"name\":\"Desk Lamp\",\"category\":\"Electronics\",\"quantity\":20,\"price\":12.5}"
```
