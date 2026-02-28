"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useConfirmDialogStore from "@/store/ConfirmationBoxStore";

const ConfirmationDialog: React.FC = () => {
  const { closeConfirmDialog, onConfirm, open, title, description } =
    useConfirmDialogStore();

  // Close when overlay/ESC is used
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) closeConfirmDialog();
  };

  // Call confirm then close (handles sync/async)
  const handleConfirm = () => {
    Promise.resolve(onConfirm?.()).finally(() => closeConfirmDialog());
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title ?? "Confirm"}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2">
          <Button variant="outline" onClick={closeConfirmDialog}>Cancel</Button>
          <Button className="w-full md:w-auto min-w-[70px] bg-[#3c8ef7] hover:bg-[#2563eb] whitespace-nowrap" onClick={handleConfirm} autoFocus>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
