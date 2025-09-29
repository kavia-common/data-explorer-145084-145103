const express = require('express');
const healthController = require('../controllers/health');
const collectionsController = require('../controllers/collections');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /api/collection1:
 *   get:
 *     summary: Get all documents from collection1
 *     operationId: getCollection1
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: List of collection1 documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/collection1', collectionsController.getCollection1.bind(collectionsController));

/**
 * @swagger
 * /api/collection2:
 *   get:
 *     summary: Get all documents from collection2
 *     operationId: getCollection2
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: List of collection2 documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/collection2', collectionsController.getCollection2.bind(collectionsController));

module.exports = router;
