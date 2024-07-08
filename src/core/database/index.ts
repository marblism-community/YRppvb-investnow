import { getDatabaseProtected } from './internal/protected'
import { DatabaseUnprotected } from './internal/unproteced'

export const Database = {
  getUnprotected: () => DatabaseUnprotected,
  get: getDatabaseProtected,
}
