'use strict';

const Collection1 = require('../models/collection1');
const Collection2 = require('../models/collection2');

/**
 * Controller responsible for returning MongoDB collection data.
 */
class CollectionsController {
  // PUBLIC_INTERFACE
  /**
   * Get all documents from "collection1".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getCollection1(req, res, next) {
    try {
      // Fetch all docs; rely on toJSON transform to normalize id field
      const items = await Collection1.find({}).sort({ createdAt: -1 }).exec();
      return res.status(200).json(items);
    } catch (err) {
      // Graceful error handling: log and return structured error
      console.error('[API] Failed to fetch collection1:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch collection1 data',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get all documents from "collection2".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getCollection2(req, res, next) {
    try {
      const items = await Collection2.find({}).sort({ createdAt: -1 }).exec();
      return res.status(200).json(items);
    } catch (err) {
      console.error('[API] Failed to fetch collection2:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch collection2 data',
      });
    }
  }
}

module.exports = new CollectionsController();
