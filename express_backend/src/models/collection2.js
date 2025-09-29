'use strict';

const mongoose = require('mongoose');

const Collection2Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'collection2',
  }
);

// Consistent JSON output: id instead of _id and remove __v
Collection2Schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the sample "collection2" documents.
 * Fields:
 *  - name: string (required)
 *  - description: string (optional)
 *  - createdAt/updatedAt: automatic timestamps
 */
const Collection2 =
  mongoose.models.Collection2 || mongoose.model('Collection2', Collection2Schema);

module.exports = Collection2;
