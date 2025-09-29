'use strict';

const mongoose = require('mongoose');

/**
 * App deployments schema based on the Excel schema.
 * 
 * Key fields include:
 *  - app_id, app_url, artifact_path, branch_name, build_path, command
 *  - created_at, updated_at, domain_checked_at (Date)
 *  - custom_domain, subdomain, domain_status
 *  - deployment_id, job_id, status, message
 *  - project_id, project_name, root_path
 *  - task_id, tenant_id, tenant_name
 *  - artifact_count (Number)
 */

const AppDeploymentSchema = new mongoose.Schema(
  {
    app_id: { type: String, trim: true, index: true },
    app_url: { type: String, trim: true },
    artifact_path: { type: String, trim: true },
    branch_name: { type: String, trim: true },
    build_path: { type: String, trim: true },
    command: { type: String, trim: true },
    created_at: { type: Date },
    custom_domain: { type: String, trim: true },
    deployment_id: { type: String, trim: true, index: true },
    job_id: { type: String, trim: true },
    message: { type: String, trim: true },
    project_id: { type: String, trim: true },
    project_name: { type: String, trim: true },
    root_path: { type: String, trim: true },
    status: { type: String, trim: true },
    subdomain: { type: String, trim: true },
    task_id: { type: String, trim: true },
    tenant_id: { type: String, trim: true },
    tenant_name: { type: String, trim: true },
    updated_at: { type: Date },
    artifact_count: { type: Number },
    domain_status: { type: String, trim: true },
    domain_checked_at: { type: Date },
  },
  {
    collection: 'app_deployments',
  }
);

// Consistent JSON output: id instead of _id and remove __v
AppDeploymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// PUBLIC_INTERFACE
/**
 * Mongoose model for the "app_deployments" collection.
 * Represents deployed application instances and related metadata.
 */
const AppDeployment =
  mongoose.models.AppDeployment ||
  mongoose.model('AppDeployment', AppDeploymentSchema);

module.exports = AppDeployment;
