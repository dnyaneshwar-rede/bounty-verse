

import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/lib/db/user'; // Changed to username lookup
import { UserCard } from '@/components/user/UserCard';
import type { Metadata } from 'next';

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getUserByUsername(params.username);

  return {
    title: user?.name || `${params.username}'s Profile`,
    description: user?.bio || `Profile page of ${params.username}`,
    openGraph: {
      images: user?.avatar ? [user.avatar] : [],
    },
  };
}

export default async function UserProfile({ params }: Props) {
  try {
    const user = await getUserByUsername(params.username);

    if (!user) {
      notFound();
    }

    return (
      <div className="max-w-4xl mx-auto p-4">
        <UserCard user={user} />
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch user:', error);
    notFound();
  }
}


// Optional: Generate static paths for known users
export async function generateStaticParams() {
  // Implement logic to fetch popular/most-visited users
  // Example: const popularUsers = await getPopularUsers();
  // return popularUsers.map((user) => ({ username: user.username }));
  return [];
}

// Optional: Revalidation settings
export const revalidate = 3600; // Revalidate every hour