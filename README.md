# Node.js Udemy Course - SQL Integration

This project demonstrates MySQL database integration with Node.js and Express.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Start your MySQL server
2. Create the database and tables:

```bash
mysql -u root -p < schema.sql
```

Or manually create the database:

```sql
CREATE DATABASE IF NOT EXISTS node-complete;
USE node-complete;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(512),
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Environment Configuration

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_actual_password
DB_NAME=node-complete
PORT=3000
```

### 4. Run the Application

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
.
├── app.js                 # Main application entry point
├── controllers/           # Route controllers
│   ├── admin.js          # Admin product management
│   ├── shop.js           # Shop/customer views
│   └── error.js          # Error handling
├── models/               # Data models
│   ├── product.js        # Product model (MySQL)
│   └── cart.js           # Cart model (File-based)
├── routes/               # Route definitions
│   ├── admin.js          # Admin routes
│   └── shop.js           # Shop routes
├── util/                 # Utilities
│   ├── database.js       # MySQL connection pool
│   └── path.js           # Path helpers
├── views/                # EJS templates
├── public/               # Static assets (CSS, JS)
└── data/                 # JSON data files
```

## Database Integration Features

### ✅ Implemented

- MySQL connection pooling with `mysql2`
- Environment-based configuration with `dotenv`
- Parameterized queries (SQL injection prevention)
- Promise-based async operations
- CRUD operations for products:
  - Create (INSERT)
  - Read (SELECT)
  - Update (UPDATE)
  - Delete (DELETE)
- Database connection health check on startup
- Proper error handling in controllers

### 🚧 To Be Improved (Future)

- Migrate Cart model from file storage to database
- Add database migrations system
- Add connection retry logic
- Implement transaction support
- Add database query logging
- Add integration tests

## API Endpoints

### Shop Routes

- `GET /` - Home page (product list)
- `GET /products` - All products
- `GET /products/:productId` - Product details
- `GET /cart` - Shopping cart
- `POST /cart` - Add product to cart
- `POST /cart-delete-item` - Remove from cart
- `GET /orders` - Order history
- `GET /checkout` - Checkout page

### Admin Routes

- `GET /admin/add-product` - Add product form
- `POST /admin/add-product` - Create new product
- `GET /admin/products` - List all products (admin view)
- `GET /admin/edit-product/:productId` - Edit product form
- `POST /admin/edit-product` - Update product
- `POST /admin/delete-product` - Delete product

## Code Quality Improvements

This branch includes the following improvements over the initial implementation:

1. **Complete CRUD Operations**: Implemented missing UPDATE and DELETE functionality
2. **Consistent Async Patterns**: Standardized on promises throughout controllers
3. **Error Handling**: Added proper error responses and user feedback
4. **Database Health Check**: Connection validation on startup
5. **Code Cleanup**: Removed debug console.log statements
6. **Documentation**: Added .env.example and schema.sql

## Security Features

- ✅ Parameterized SQL queries (prevents SQL injection)
- ✅ Environment variables for sensitive data
- ✅ .env file excluded from version control
- ✅ Connection pooling for resource management

## Troubleshooting

### Database Connection Failed

If you see "❌ Database connection failed", check:

1. MySQL server is running
2. Database credentials in `.env` are correct
3. Database `node-complete` exists
4. User has proper permissions

### Module Not Found Errors

Run `npm install` to ensure all dependencies are installed.

### Port Already in Use

Change the PORT in `.env` file or kill the process using port 3000:

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

## Dependencies

- **express**: Web framework
- **ejs**: Template engine
- **body-parser**: Request body parsing
- **mysql2**: MySQL client with promise support
- **dotenv**: Environment variable management

## Contributing

This is a learning project. Feel free to:

1. Report issues
2. Suggest improvements
3. Submit pull requests

## Review Document

For a comprehensive review of the database integration, see [DATABASE_INTEGRATION_REVIEW.md](./DATABASE_INTEGRATION_REVIEW.md)

## License

ISC

## Author

bienvenudev
