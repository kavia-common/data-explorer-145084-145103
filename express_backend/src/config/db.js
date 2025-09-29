'use strict';

const mongoose = require('mongoose');

let listenersSetup = false;

/**
 * Attach connection event handlers once for logging and state tracking.
 */
function setupConnectionEventHandlers() {
  if (listenersSetup) return;
  listenersSetup = true;

  const { connection } = mongoose;

  connection.on('connected', () => {
    console.log('[DB] MongoDB connected');
  });

  connection.on('error', (err) => {
    console.error('[DB] MongoDB connection error:', err.message);
  });

  connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected');
  });
}

// PUBLIC_INTERFACE
/**
 * Connect to MongoDB using Mongoose.
 *
 * This function attempts to establish a connection to MongoDB if a URI is provided.
 * It is safe to call multiple times; it will no-op if already connected or connecting.
 *
 * @param {string} uri - The MongoDB connection string (e.g., mongodb://localhost:27017/mydb).
 * @returns {Promise<typeof mongoose.connection>|undefined} A promise that resolves to the mongoose connection, or undefined if no URI.
 */
async function connectDB(uri) {
  if (!uri) {
    console.warn('[DB] connectDB called without a MongoDB URI. Skipping database connection.');
    return undefined;
  }

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) {
    return mongoose.connection;
  }

  setupConnectionEventHandlers();

  // Establish connection with reasonable defaults
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  });

  return mongoose.connection;
}

// PUBLIC_INTERFACE
/**
 * Disconnect from MongoDB if connected.
 *
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  const state = mongoose.connection.readyState;
  if (state === 0) {
    return;
  }
  try {
    await mongoose.connection.close();
    console.log('[DB] MongoDB connection closed');
  } catch (err) {
    console.error('[DB] Error closing MongoDB connection:', err.message);
  }
}

/**
 * Get the current mongoose connection object (connected or not).
 *
 * @returns {import('mongoose').Connection}
 */
function getConnection() {
  return mongoose.connection;
}

module.exports = {
  connectDB,
  disconnectDB,
  getConnection,
};
