"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, LogOut } from "lucide-react";

type LogoutConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function LogoutConfirmModal({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border border-cyan-400/40 bg-[#0a1022]/95 text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-cyan-300">
            Are you sure?
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-white/70">
            You want to log out from your Admin Dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border-cyan-400/60 bg-transparent text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-cyan-300 font-semibold text-slate-900 hover:bg-cyan-400"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutConfirmModal;