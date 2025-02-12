// lib/actions/bounty.ts
'use server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(5).max(120),
  contentHtml: z.string().min(50),
  reward: z.number().min(0).max(1000000),
  deadline: z.date().optional(),
  attachments: z.array(z.string()).optional(),
})

export async function createBounty(data: z.infer<typeof schema>) {
  try {
    const user = await getCurrentUser()
    if (!user) throw new Error('Authentication required')

    const validated = schema.parse(data)

    return await prisma.bounty.create({
      data: {
        ...validated,
        creatorId: user.id,
        status: 'OPEN',
      }
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map(e => e.message).join(', '))
    }
    // Type assertion to handle the error as an instance of Error
    throw new Error((error as Error).message || 'Failed to create bounty')
  }
}