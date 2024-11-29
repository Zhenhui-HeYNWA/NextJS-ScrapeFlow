'use client';

import { Workflow } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { WorkflowExecutionStatus, WorkFlowStatus } from '@/types/workflow';
import {
  ChevronRight,
  ClockIcon,
  Coins,
  CornerDownRight,
  FileTextIcon,
  MoreVerticalIcon,
  MoveRight,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TooltipWrapper from '@/components/TooltipWrapper';
import DeleteWorkflowDialog from '@/app/(dashboard)/workflows/_components/DeleteWorkflowDialog';
import { useState } from 'react';
import RunBtn from '@/app/(dashboard)/workflows/_components/RunBtn';
import SchedulerDialog from './SchedulerDialog';
import { Badge } from '@/components/ui/badge';
import ExecutionStatusIndicator, {
  ExecutionStatusLabel,
} from '@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator';
import { format, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import DuplicateWorkflowDialog from './DuplicateWorkflowDialog';

const statusColors = {
  [WorkFlowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkFlowStatus.PUBLISHED]: 'bg-primary',
};

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;

  return (
    <Card className="group/card border-separate overflow-hidden rounded-lg border shadow-sm hover:shadow-md dark:shadow-primary/30">
      <CardContent className="flex h-[100px] items-center justify-between p-4">
        <div className="flex items-center justify-end space-x-3">
          {' '}
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              statusColors[workflow.status as WorkFlowStatus],
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="flex items-center text-base font-bold text-muted-foreground">
              <TooltipWrapper content={workflow.description}>
                <Link
                  href={`/workflow/editor/${workflow.id}`}
                  className="flex items-center hover:underline"
                >
                  {workflow.name}
                </Link>
              </TooltipWrapper>
              {isDraft && (
                <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  Draft
                </span>
              )}

              <DuplicateWorkflowDialog workflowId={workflow.id} />
            </h3>

            <ScheduleSection
              isDraft={isDraft}
              CreditsCost={workflow.creditsCost}
              workflowId={workflow.id}
              cron={workflow.cron}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isDraft && <RunBtn workflowId={workflow.id} />}
          <Link
            href={`/workflow/editor/${workflow.id}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex items-center gap-2',
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>
          <WorkFlowActions
            workflowName={workflow.name}
            workflowId={workflow.id}
          />
        </div>
      </CardContent>
      <LastRunDetails workflow={workflow} />
    </Card>
  );
}

function WorkFlowActions({
  workflowName,
  workflowId,
}: {
  workflowName: string;
  workflowId: string;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        workflowName={workflowName}
        workflowId={workflowId}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <TooltipWrapper content={'More actions'}>
              <div className="flex h-full w-full items-center justify-center">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2 text-destructive"
            onSelect={() => {
              setShowDeleteDialog((prev) => !prev);
            }}
          >
            <TrashIcon size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function ScheduleSection({
  isDraft,
  CreditsCost,
  workflowId,
  cron,
}: {
  isDraft: boolean;
  CreditsCost: number;
  workflowId: string;
  cron: string | null;
}) {
  if (isDraft) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <CornerDownRight className="h-4 w-4 text-muted-foreground" />
      <SchedulerDialog
        workflowId={workflowId}
        cron={cron}
        key={`${cron}-${workflowId}`}
      />
      <MoveRight className="h-4 w-4 text-muted-foreground" />

      <TooltipWrapper content="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <Badge
            variant={'outline'}
            className="space-x-2 rounded-sm text-muted-foreground"
          >
            <Coins className="h-4 w-4" />
            <span className="text-sm">{CreditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  );
}

function LastRunDetails({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkFlowStatus.DRAFT;

  if (isDraft) {
    return null;
  }

  const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;

  const formattedStartedAt =
    lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

  const nextSchedule = nextRunAt && format(nextRunAt, 'yyyy-MM-dd HH:mm');
  const nextScheduleUtc =
    nextRunAt && formatInTimeZone(nextRunAt, 'UTC', 'HH:mm');
  return (
    <div className="flex items-center justify-between bg-primary/5 px-4 py-1 text-muted-foreground">
      <div className="flex items-center gap-2 text-sm">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="group flex items-center gap-2 text-sm"
          >
            <span>Last Run:</span>
            <ExecutionStatusIndicator
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <ExecutionStatusLabel
              status={lastRunStatus as WorkflowExecutionStatus}
            />
            <span>{formattedStartedAt}</span>
            <ChevronRight
              size={14}
              className="-translate-x-[2px] transition group-hover:translate-x-0"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={12} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUtc} UTC)</span>
        </div>
      )}
    </div>
  );
}
export default WorkflowCard;
