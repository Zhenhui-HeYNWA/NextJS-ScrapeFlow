'use client';

import { Workflow } from '@prisma/client';
import React, { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import FlowEditor from '@/app/workflow/_components/FlowEditor';
import TopBar from '@/app/workflow/_components/topbar/Topbar';
import TaskMenu from '@/app/workflow/_components/TaskMenu';
import { FlowValidationContextProvider } from '@/components/context/FlowValidationContext';
import { WorkFlowStatus } from '@/types/workflow';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import { ArrowRight } from 'lucide-react';

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

          <section className="flex h-full justify-between overflow-auto">
            <TaskMenu />

            <FlowEditor workflow={workflow} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
}

export default Editor;
