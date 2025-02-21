import db from "@/lib/db/db";

export const getUserByUsername = async (username: string) => {
    return db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };