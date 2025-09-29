'use strict';

const User = require('../models/users');
const SessionTracking = require('../models/session_tracking');
const AppDeployment = require('../models/app_deployments');
const LlmCost = require('../models/llm_costs');

/**
 * Controller responsible for returning MongoDB collection data.
 */
class CollectionsController {
  // PUBLIC_INTERFACE
  /**
   * Get all documents from "users".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getUsers(req, res, next) {
    try {
      const items = await User.find({}).sort({ updatedAt: -1 }).exec();
      return res.status(200).json(items);
    } catch (err) {
      console.error('[API] Failed to fetch users:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch users data',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get all documents from "session_tracking".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getSessionTracking(req, res, next) {
    try {
      const items = await SessionTracking.find({})
        .sort({ created_at: -1 })
        .exec();
      return res.status(200).json(items);
    } catch (err) {
      console.error('[API] Failed to fetch session_tracking:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch session_tracking data',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get all documents from "app_deployments".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getAppDeployments(req, res, next) {
    try {
      const items = await AppDeployment.find({})
        .sort({ updated_at: -1 })
        .exec();
      return res.status(200).json(items);
    } catch (err) {
      console.error('[API] Failed to fetch app_deployments:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch app_deployments data',
      });
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Get all documents from "llm_costs".
   * Returns an array of documents as JSON.
   *
   * @param {import('express').Request} req - Express request
   * @param {import('express').Response} res - Express response
   * @param {import('express').NextFunction} next - Express next middleware
   * @returns {Promise<void>}
   */
  async getLlmCosts(req, res, next) {
    try {
      const items = await LlmCost.find({})
        .sort({ created_at: -1 })
        .exec();
      return res.status(200).json(items);
    } catch (err) {
      console.error('[API] Failed to fetch llm_costs:', err.message);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to fetch llm_costs data',
      });
    }
  }
}

module.exports = new CollectionsController();
