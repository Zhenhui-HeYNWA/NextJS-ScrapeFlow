"use client";

import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import SaveBtn from "./SaveBtn";

interface Props {
  title: string;
  subTitle?: string;
  workflowId: string;
}
export default function TopBar({ title, subTitle, workflowId }: Props) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between border-b-2 bg-background p-2">
      <div className="flex flex-1 gap-1">
        <TooltipWrapper content="Back">
          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
            <ChevronLeftIcon size={28} />
          </Button>
        </TooltipWrapper>
        <div>
          <p className="truncate text-ellipsis font-bold">{title}</p>
          {subTitle && (
            <p className="truncate text-ellipsis text-xs text-muted-foreground">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-1">
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
}