export type AppUserIdentity = {
  id: string;
  email: string | null;
  fullName: string | null;
  imageUrl: string | null;
};

export async function requireCurrentUser(): Promise<AppUserIdentity>;
export async function getCurrentUserOrNull(): Promise<AppUserIdentity | null>;