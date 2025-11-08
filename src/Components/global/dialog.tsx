import * as React from "react";
import {
  Dialog as MUIDialog,
  DialogTitle as MUIDialogTitle,
  DialogContent as MUIDialogContent,
  DialogContentText as MUIDialogContentText,
  DialogActions as MUIDialogActions,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { cn } from "@/lib/utils";

const Dialog = MUIDialog;

const DialogTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { onClose?: () => void }>(
  ({ className, children, onClose, ...props }, ref) => (
    <MUIDialogTitle className={cn(className)} {...props}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </MUIDialogTitle>
  )
);
DialogTitle.displayName = "DialogTitle";

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <MUIDialogContent className={cn(className)} {...props}>
      {children}
    </MUIDialogContent>
  )
);
DialogContent.displayName = "DialogContent";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <MUIDialogContentText className={cn(className)} {...props}>
      {children}
    </MUIDialogContentText>
  )
);
DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <MUIDialogActions className={cn('flex flex-row justify-end gap-2', className)} {...props} />
  )
);
DialogFooter.displayName = "DialogFooter";

// Re-export everything
export {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
};
