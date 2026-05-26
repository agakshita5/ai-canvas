import type { AppUserIdentity } from '@/lib/clerk';

export type DbUser = {
  id: string;
  email: string | null;
  full_name: string | null;
  image_url: string | null;
  created_at: string;
};

export async function upsertUserFromClerk(user: AppUserIdentity): Promise<DbUser>;
export async function getUserById(userId: string): Promise<DbUser | null>;