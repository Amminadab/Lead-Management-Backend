# Lead Manager Backend

A RESTful API for the Lead Manager application built with Express, TypeScript, and MongoDB.

## Features

- RESTful API with Express and TypeScript
- MongoDB integration with Mongoose
- Input validation with express-validator
- Error handling middleware
- CORS support for cross-origin requests
- Environment variable configuration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/yourusername/lead-manager.git
cd lead-manager/backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add the following variables (replace with your actual MongoDB connection string):

```
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/lead-manager?retryWrites=true&w=majority
NODE_ENV=development
```

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. The API will be available at `http://localhost:5001/api`

### Building for Production

```bash
npm run build
```

Then to start the production server:

```bash
npm start
```

## API Endpoints

### Leads

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead

## Notes

- The API uses MongoDB as its database. Make sure you have a MongoDB instance running or a MongoDB Atlas account.
- The API runs on the port specified in the `PORT` environment variable (default: 5001).
- In development mode, the API uses nodemon to automatically restart when files change.
