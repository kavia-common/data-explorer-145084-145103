'use strict';

const mongoose = require('mongoose');

/**
 * Session tracking schema based on the Excel schema.
 * 
 * Fields:
 *  - task_id: String
 *  - tenant_id: String
 *  - organization_name: String
 *  - user_id: String
 *  - user_name (alias: User_name): String
 *  - project_id: String
 *  - container_id: String
 *  - service_type: String
 *  - session_start: Date
 *  - session_end: Date
 *  - status: String
 *  - total_cost: Number
 *  - agent_costs: Map<String, Number>
 *  - cost_history: Array<Object> with:
 *      - timestamp: Date
 *      - agent_costs: Map<String, Number>
 *      - total_cost: Number
 *  - last_updated: Date
 *  - session_data: Object with:
 *      - llm_model: String
 *      - session_name: String
 *      - description: String
 *      - platform: String
 *      - selected_repos: Object with:
 *          - all_repositories: Boolean
 *          - repositories: String[]
 *  - created_at: Date
 */

const SelectedReposSchema = new mongoose.Schema(
  {
    all_repositories: { type: Boolean, default: false },
    repositories: { type: [String], default: [] },
  },
  { _id: false }
);

const SessionDataSchema = new mongoose.Schema(
  {
    llm_model: { type: String, trim: true },
    session_name: { type: String, trim: true },
    description: { type: String, trim: true },
    platform: { type: String, trim: true },
    selected_repos: { type: SelectedReposSchema, default: {} },
  },
  { _id: false }
);

const CostHistoryItemSchema = new mongoose.Schema(
  {
    timestamp: { type: Date },
    agent_costs: { type: Map, of: Number, default: {} },
    total_cost: { type: Number, default: 0 },
  },
  { _id: false }
);

const SessionTrackingSchema = new mongoose.Schema(
  {
    task_id: { type: String, index: true, trim: true },
    tenant_id: { type: String, index: true, trim: true },
    organization_name: { type: String, trim: true },
    user_id: { type: String, index: true, trim: true },
    user_name: { type: String, alias: 'User_name', trim: true },
    project_id: { type: String, trim: true },
    container_id: { type: String, trim: true },
    service_type: { type: String, trim: true },
    session_start: { type: Date },
    session_end: { type: Date },
    status: { type: String, trim: true },
    total_cost: { type: Number, default: 0 },
    agent_costs: { type: Map, of: Number, default: {} },
    cost_history: { type: [CostHistoryItemSchema], default: [] },
    last_updated: { type: Date },
    session_data: { type: SessionDataSchema, default: {} },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: 'session_tracking',
  }
);

// Consistent JSON output: id instead of _id and remove __v
SessionTrackingSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the "session_tracking" collection.
 * Represents sessions with cost tracking and metadata.
 */
const SessionTracking =
  mongoose.models.SessionTracking ||
  mongoose.model('SessionTracking', SessionTrackingSchema);

module.exports = SessionTracking;
