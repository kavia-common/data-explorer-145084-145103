const app = require('./app');
require('dotenv').config();
const { connectDB, disconnectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Attempt DB connection if URI is provided, but do not block startup
if (process.env.MONGODB_URI) {
  connectDB(process.env.MONGODB_URI).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
} else {
  console.warn('MONGODB_URI not set; starting server without DB connection.');
}

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// Graceful shutdown - SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    try {
      await disconnectDB();
    } catch (err) {
      console.error('Error during DB disconnect on SIGTERM:', err.message);
    }
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Graceful shutdown - SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    try {
      await disconnectDB();
    } catch (err) {
      console.error('Error during DB disconnect on SIGINT:', err.message);
    }
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = server;
