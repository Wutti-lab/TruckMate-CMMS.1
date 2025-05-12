
/**
 * Extend the Error interface to include the status property
 */
export interface MapboxError extends Error {
  status?: number;
}
