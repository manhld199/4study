"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface NotificationSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title:string;
  message: string;
}

export default function NotificationSuccess({
  open,
  onOpenChange,
  title,
  message,
}: NotificationSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogClose>Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
