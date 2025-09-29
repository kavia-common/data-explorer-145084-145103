'use strict';

const mongoose = require('mongoose');

/**
 * Users collection schema based on the provided Excel schema.
 * 
 * Fields:
 * - referral_code: String - code used for referrals
 * - referral_stats: Object - statistics summary:
 *    - total_referrals: Number
 *    - verified_referrals: Number
 *    - last_referral_date: Date
 * - referral_history: Array<Object> - list of referral details:
 *    - user_id: String
 *    - user_email: String
 *    - user_name: String
 *    - referred_at: Date
 *    - verified_at: Date
 *    - status: String (e.g., pending, verified)
 */

const ReferralStatsSchema = new mongoose.Schema(
  {
    total_referrals: { type: Number, default: 0 },
    verified_referrals: { type: Number, default: 0 },
    last_referral_date: { type: Date, default: null },
  },
  { _id: false }
);

const ReferralHistoryItemSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, trim: true },
    user_email: { type: String, trim: true },
    user_name: { type: String, trim: true },
    referred_at: { type: Date },
    verified_at: { type: Date },
    status: {
      type: String,
      trim: true,
      default: 'pending',
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    referral_code: { type: String, index: true, trim: true },
    referral_stats: { type: ReferralStatsSchema, default: {} },
    referral_history: { type: [ReferralHistoryItemSchema], default: [] },
  },
  {
    timestamps: true, // provides createdAt / updatedAt
    collection: 'users',
  }
);

// Consistent JSON output: id instead of _id and remove __v
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the "users" collection.
 * Represents referral data used to onboard users through referrals.
 */
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
