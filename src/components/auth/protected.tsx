// components/auth/protected.tsx
'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function ProtectedComponent({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/create-bounty');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'authenticated') return children;
  return null;
}