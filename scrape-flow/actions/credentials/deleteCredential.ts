'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function DeleteCredential(name: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthenticated');
  }

  await prisma.credential.delete({
    where: {
      name_userId: {
        userId,
        name,
      },
    },
  });

  revalidatePath('/credentials');
}