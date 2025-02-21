// app/profile/page.tsx

import { auth } from "@/lib/auth";
import    ProfilePage   from '@/components/user/ProfilePage';
import { redirect } from 'next/navigation';





export default async function Page() {
  const session = await auth();

 
  if (!session?.user) {
    redirect('/login');
  }

  // Fetch additional user data from your database
  const userData = {
    id: session.user.id,
    name: session.user.name || '',
    username: session.user.username || '',
    location: 'India', // Replace with actual data
    avatar: session.user.image
  };

  const socialLinks = {
    twitter: 'yourusername',
    github: 'yourusername',
    website: 'https://yourwebsite.com',
    linkedin: 'yourusername'
  };

  const stats = {
    earned: 0,
    submissions: 0,
    won: 0
  };

  return (
    <ProfilePage 
      user={userData}
      socialLinks={socialLinks}
      stats={stats}
    />
  );
}