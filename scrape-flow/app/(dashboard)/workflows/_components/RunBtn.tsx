'use client';

import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Play } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Workflow is running', { id: workflowId });
    },
    onError: () => {
      toast.error('Something went wrong', { id: workflowId });
    },
  });
  return (
    <Button 
      variant={'outline'}
      size={'sm'}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Scheduling run workflow...', { id: workflowId });
        mutation.mutate({
          workflowId,
        });
      }}
    >
      <Play size={16} />
      Run
    </Button>
  );
}

export default RunBtn;
