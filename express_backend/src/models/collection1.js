'use strict';

const mongoose = require('mongoose');

const Collection1Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'collection1',
  }
);

// Consistent JSON output: id instead of _id and remove __v
Collection1Schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the sample "collection1" documents.
 * Fields:
 *  - name: string (required)
 *  - description: string (optional)
 *  - createdAt/updatedAt: automatic timestamps
 */
const Collection1 =
  mongoose.models.Collection1 || mongoose.model('Collection1', Collection1Schema);

module.exports = Collection1;
