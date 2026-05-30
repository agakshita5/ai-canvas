import { auth, currentUser } from '@clerk/nextjs/server';

export type AppUserIdentity = {
  id: string;
  email: string | null;
};

export async function getCurrentUser(){
  const { userId } = await auth();
  if (!userId) return null;
  
  const user = await currentUser();
  if (!user) return null;

  return {
    id: user.id,
    email:
      user.primaryEmailAddress?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      null
  };
}
