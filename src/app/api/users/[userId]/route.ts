// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { auth } from "@/lib/auth";// Ensure that 'auth' is correctly imported
import db from '@/lib/db/db';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(3).max(30).regex(/^[a-z0-9_]+$/),
  bio: z.string().max(160).optional(),
});

export async function PATCH(request: Request) {
  try {
    const session = await auth(); // Ensure 'auth' is a function that returns session
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const json = await request.json();
    const body = profileSchema.parse(json);

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name,
        username: body.username.toLowerCase(), // Ensure this field is part of your User model
        bio: body.bio ?? null, // Set to null if bio is undefined
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
      }
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('User update error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' }, 
        { status: 422 }
      );
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Username already taken' }, 
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}