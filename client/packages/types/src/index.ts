/**
 * Contracts shared by client applications. Keep these framework-independent so
 * they can be generated from, or checked against, the FastAPI OpenAPI schema.
 */
export type HealthStatus = {
  status: 'ok';
  service: string;
};
