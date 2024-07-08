import { Authentication } from '@/core/authentication'
import { enhance } from '@zenstackhq/runtime'
import { DatabaseUnprotected } from './unproteced'

export async function getDatabaseProtected() {
  const session = await Authentication.getSession()

  return enhance(DatabaseUnprotected, { user: session?.user as any })
}
