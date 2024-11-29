'use server';

import prisma from '@/lib/prisma';
import { WorkFlowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function UnpublishWorkflow(id: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('unauthenticated');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error('Workflow not found');
  }

  if (workflow.status !== WorkFlowStatus.PUBLISHED) {
    throw new Error('Workflow is not published');
  }

  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkFlowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });

  revalidatePath(`/workflow/editor/${id}`);
}
