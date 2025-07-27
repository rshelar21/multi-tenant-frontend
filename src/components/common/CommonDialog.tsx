import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  contentClassName?: string;
  title: string;
  children: React.ReactNode;
  cancelBtnText?: string;
  submitBtnText?: string;
  cancelBtnClassName?: string;
  submitBtnClassName?: string;
}

export const CommonDialog = ({
  open,
  onClose,
  onSubmit,
  contentClassName,
  title,
  children,
  cancelBtnText,
  submitBtnText,
  cancelBtnClassName,
  submitBtnClassName,
}: CommonDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent
        hideClose
        className={cn(
          `max-h-[90vh] overflow-y-auto sm:max-w-2xl`,
          contentClassName
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className={cn(cancelBtnClassName)}
            >
              {cancelBtnText || 'Cancel'}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            onClick={onSubmit}
            className={cn(
              'transition-colors hover:border-pink-400 hover:bg-pink-400 hover:text-black',
              submitBtnClassName
            )}
          >
            {submitBtnText || 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
