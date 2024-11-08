"use server";

import { waitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/prisma";
import { WorkFlowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateWorkflow({
  id,
  definition,
}: {
  id: string;
  definition: string;
}) {
  await waitFor(2000);
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }
  if (workflow.status !== WorkFlowStatus.DRAFT) {
    throw new Error("workflow is not a draft");
  }

  await prisma.workflow.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
}
