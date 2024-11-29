'use client';

import { Workflow } from '@prisma/client';
import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from '@/app/workflow/_components/FlowEditor';
import TopBar from '@/app/workflow/_components/topbar/Topbar';
import TaskMenu from '@/app/workflow/_components/TaskMenu';
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext';
import { WorkFlowStatus } from '@/types/workflow';

function Editor({ workflow }: { workflow: Workflow }) {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex h-full w-full flex-col overflow-hidden">
          <TopBar
            title="Workflow Editor"
            workflowId={workflow.id}
            subTitle={workflow.name}
            isPublished={workflow.status === WorkFlowStatus.PUBLISHED}
          />
          <section className="flex h-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}

export default Editor;
