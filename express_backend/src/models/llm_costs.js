'use strict';

const mongoose = require('mongoose');

/**
 * LLM Costs schema represents cost and token usage for LLM interactions.
 *
 * Fields (flexible, schema is permissive):
 *  - timestamp: Date
 *  - model: String
 *  - user_id: String
 *  - tenant_id: String
 *  - session_id: String
 *  - container_id: String
 *  - input_tokens: Number
 *  - output_tokens: Number
 *  - total_tokens: Number
 *  - input_cost: Number
 *  - output_cost: Number
 *  - total_cost: Number
 *  - currency: String (default: USD)
 *  - details: Mixed (additional provider-specific metadata)
 */

const LlmCostSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    model: { type: String, trim: true },
    user_id: { type: String, trim: true, index: true },
    tenant_id: { type: String, trim: true, index: true },
    session_id: { type: String, trim: true, index: true },
    container_id: { type: String, trim: true },
    input_tokens: { type: Number, default: 0 },
    output_tokens: { type: Number, default: 0 },
    total_tokens: { type: Number, default: 0 },
    input_cost: { type: Number, default: 0 },
    output_cost: { type: Number, default: 0 },
    total_cost: { type: Number, default: 0 },
    currency: { type: String, trim: true, default: 'USD' },
    details: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    collection: 'llm_costs',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: false, // Allow additional fields without schema updates
  }
);

// Consistent JSON output: id instead of _id and remove __v
LlmCostSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the "llm_costs" collection.
 * Represents cost and usage data associated with LLM interactions.
 */
const LlmCost = mongoose.models.LlmCost || mongoose.model('LlmCost', LlmCostSchema);

module.exports = LlmCost;
