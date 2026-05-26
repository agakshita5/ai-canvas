import type { AppUserIdentity } from '@/lib/clerk'; // user in which shape
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type DbUser = {
  id: string;
  email: string | null;
  created_at: string;
};

// upsert query
export async function upsertUserFromClerk(user: AppUserIdentity): Promise<DbUser> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        id: user.id,
        email: user.email,
        image_url: user.imageUrl,
      },
      { onConflict: 'id' },
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// select query
export async function getUserById(userId: string): Promise<DbUser | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
