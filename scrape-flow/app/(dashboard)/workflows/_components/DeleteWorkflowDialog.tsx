"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
}

function DeleteWorkflowDialog({ open, setOpen, workflowName }: Props) {
  const [confirmText, setConfirmText] = useState("");

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this workflow?
          </AlertDialogTitle>
          <AlertDialogDescription>
            if you delete this workflow, it will be permanently removed from
            your
            <div className="flex flex-col gap-2 py-4">
              <p>
                If you are sure, enter <b>{workflowName}</b> to confirm:
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteWorkflowDialog;
