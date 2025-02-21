

import { auth } from "@/lib/auth";
import  ProfileForm  from "@/components/user/ProfileForm";

// Define the User type with the required properties
interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  name: string; // Added name property
  email: string; // Added email property
  
}

export default async function ProfilePage() {
 const session = await auth();
  
  if (!session?.user) {
    return <div>Loading...</div>;
  }

  // Type assertion to ensure session.user conforms to the User type
  const user = session.user as User;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold items-center text-center py-4">Profile Settings</h1>
      <ProfileForm user={ user } />
    </div>
  );
}