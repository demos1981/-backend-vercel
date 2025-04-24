# Headless technology

FrontEnd and BackEnd are located separately on different servers and communicate via API

## Render PostgreSQL Backend

This is a Node.js/Express backend application configured for deployment on Render with PostgreSQL database integration using TypeORM.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Vercel CLI (optional, for local development)
- PostgreSQL database (will be created on Vercel)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with your PostgreSQL connection string:

```
POSTGRES_URL="postgresql://username:password@localhost:5432/your_database"
NODE_ENV="development"
```

3. Run database migrations:

```bash
npm run migration:run
```

4. Start the development server:

```bash
npm run dev
```

## Deployment to Render

## include PostgreSQL to Vercel project and connect to Render via API

3. Set up PostgreSQL database:

   - Go to your Vercel dashboard
   - Navigate to Storage
   - Create a new PostgreSQL database
   - The connection string will be automatically added to your environment variables
   - Vercel will automatically set `NODE_ENV` to "production"

4. Run migrations on Vercel:
   - After deployment, you can run migrations using the Vercel dashboard's SQL editor
   - Or use the Vercel CLI to run migrations

## Environment Configuration

The application uses different configurations based on the environment:

- **Development**: SSL is disabled, logging is enabled
- **Production**: SSL is enabled with `rejectUnauthorized: false`, logging is disabled

Make sure to set the appropriate `NODE_ENV` in your environment variables:

- Local development: `NODE_ENV=development`
- Production: `NODE_ENV=production` (automatically set by Vercel)

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item
- `GET /api/items/:id` - Get a specific item by ID
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## Database Management

### Creating Migrations

To create a new migration:

```bash
npm run migration:generate -- src/migrations/CreateItemTable
```

### Running Migrations

To run pending migrations:

```bash
npm run migration:run
```

To revert the last migration:

```bash
npm run migration:revert
```

## Entity Structure

The application includes a sample `Item` entity with the following structure:

- `id`: Auto-incrementing primary key
- `name`: Item name (required)
- `description`: Item description (optional)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

## TypeORM Configuration

The TypeORM configuration is located in `src/config/data-source.ts`. Key settings:

- Uses PostgreSQL as the database
- SSL is enabled only in production for Vercel deployment
- Migrations are stored in `src/migrations`
- Synchronization is disabled in production
- Logging is enabled in development mode

## Project structure

src/
├── config/ # Configuration files
│ ├── data-source.ts # TypeORM configuration
│ ├── supabase.config.ts # Supabase configuration
├── controllers/ # Controllers for handling HTTP requests
│ ├── item.controller.ts # Handles CRUD operations for items
│ ├── media.controller.ts # Handles media-related operations
├── database/ # Database-related scripts
│ ├── migrations/ # Database migrations
│ ├── seed.ts # Database seeding script
├── dto/ # Data Transfer Objects (DTOs)
├── middleware/ # Express middleware
│ ├── error.middleware.ts # Centralized error-handling middleware
│ ├── multer.middleware.ts # Middleware for handling file uploads
├── models/ # Database entities
│ ├── Item.entity.ts # Item entity definition
├── routes/ # API routes
│ ├── item.routes.ts # Routes for item-related endpoints
│ ├── media.routes.ts # Routes for media-related endpoints
├── services/ # Business logic
│ ├── item.service.ts # Service for item-related operations
│ ├── storage.service.ts # Service for storage-related operations
├── types/ # TypeScript types and enums
│ ├── enums.ts # Enums used across the application
│ ├── item.types.ts # Types related to items
│ ├── user.types.ts # Types related to users
├── utils/ # Utility functions (if needed)
│ ├── AppError.ts # Custom error class for centralized error handling
├── index.ts # Application entry point

config/: Contains configuration files for the database and external services.
controllers/: Handles HTTP requests and responses for specific resources.
database/: Includes database migrations and seeding scripts.
dto/: Contains Data Transfer Objects for validating and transferring data.
middleware/: Includes middleware for error handling, file uploads, and other request/response processing.
models/: Defines database entities using TypeORM.
routes/: Defines API routes and maps them to controllers.
services/: Contains business logic and interacts with the database or external services.
types/: Defines reusable TypeScript types and enums.
utils/: Contains utility functions and classes, such as the AppError class for centralized error handling.
index.ts: The main entry point of the application, where the server is initialized and started.
