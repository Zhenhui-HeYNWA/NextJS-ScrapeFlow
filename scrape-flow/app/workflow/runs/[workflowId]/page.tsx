import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import TopBar from '@/app/workflow/_components/topbar/Topbar';

import { InboxIcon, Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import ExecutionsTable from '@/app/workflow/runs/[workflowId]/_components/ExecutionsTable';

export default function ExecutionPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subTitle="List of all your workflow runs"
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            {' '}
            <Loader2Icon size={50} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
}

async function ExecutionTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);
  if (!executions) return <div>No data</div>;
  if (executions.length === 0)
    return (
      <div className="container h-full w-full justify-center py-6">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <InboxIcon size={40} className="stroke-primary" />
          </div>

          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered ye for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  return (
    <div className="container w-full py-6">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  );
}
