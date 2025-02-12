// lib/auth.ts
import { auth } from '@/lib/authService'; // Importing from a different module

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}