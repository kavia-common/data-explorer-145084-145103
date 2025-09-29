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
 * /api/users:
 *   get:
 *     summary: Get all user documents
 *     operationId: getUsers
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: List of users documents
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
 *                   referral_code:
 *                     type: string
 *                   referral_stats:
 *                     type: object
 *                     properties:
 *                       total_referrals:
 *                         type: number
 *                       verified_referrals:
 *                         type: number
 *                       last_referral_date:
 *                         type: string
 *                         format: date-time
 *                   referral_history:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         user_id: { type: string }
 *                         user_email: { type: string }
 *                         user_name: { type: string }
 *                         referred_at:
 *                           type: string
 *                           format: date-time
 *                         verified_at:
 *                           type: string
 *                           format: date-time
 *                         status: { type: string }
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/users', collectionsController.getUsers.bind(collectionsController));

/**
 * @swagger
 * /api/session_tracking:
 *   get:
 *     summary: Get all session tracking documents
 *     operationId: getSessionTracking
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: List of session_tracking documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string, description: Unique identifier }
 *                   task_id: { type: string }
 *                   tenant_id: { type: string }
 *                   organization_name: { type: string }
 *                   user_id: { type: string }
 *                   user_name: { type: string }
 *                   project_id: { type: string }
 *                   container_id: { type: string }
 *                   service_type: { type: string }
 *                   session_start:
 *                     type: string
 *                     format: date-time
 *                   session_end:
 *                     type: string
 *                     format: date-time
 *                   status: { type: string }
 *                   total_cost: { type: number }
 *                   agent_costs:
 *                     type: object
 *                     additionalProperties:
 *                       type: number
 *                   cost_history:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                         agent_costs:
 *                           type: object
 *                           additionalProperties:
 *                             type: number
 *                         total_cost:
 *                           type: number
 *                   last_updated:
 *                     type: string
 *                     format: date-time
 *                   session_data:
 *                     type: object
 *                     properties:
 *                       llm_model: { type: string }
 *                       session_name: { type: string }
 *                       description: { type: string }
 *                       platform: { type: string }
 *                       selected_repos:
 *                         type: object
 *                         properties:
 *                           all_repositories: { type: boolean }
 *                           repositories:
 *                             type: array
 *                             items: { type: string }
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/api/session_tracking',
  collectionsController.getSessionTracking.bind(collectionsController)
);

/**
 * @swagger
 * /api/app_deployments:
 *   get:
 *     summary: Get all app deployments documents
 *     operationId: getAppDeployments
 *     tags:
 *       - Collections
 *     responses:
 *       200:
 *         description: List of app_deployments documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string, description: Unique identifier }
 *                   app_id: { type: string }
 *                   app_url: { type: string }
 *                   artifact_path: { type: string }
 *                   branch_name: { type: string }
 *                   build_path: { type: string }
 *                   command: { type: string }
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   custom_domain: { type: string }
 *                   deployment_id: { type: string }
 *                   job_id: { type: string }
 *                   message: { type: string }
 *                   project_id: { type: string }
 *                   project_name: { type: string }
 *                   root_path: { type: string }
 *                   status: { type: string }
 *                   subdomain: { type: string }
 *                   task_id: { type: string }
 *                   tenant_id: { type: string }
 *                   tenant_name: { type: string }
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                   artifact_count: { type: number }
 *                   domain_status: { type: string }
 *                   domain_checked_at:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal Server Error
 */
router.get(
  '/api/app_deployments',
  collectionsController.getAppDeployments.bind(collectionsController)
);

module.exports = router;
