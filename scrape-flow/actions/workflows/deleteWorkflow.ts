"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteWorkflow(id: string) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("unauthenticated");
  }

  await prisma.workflow.delete({
    where: {
      id,
      userId,
    },
  });

  revalidatePath("/workflows");
}
