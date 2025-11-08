import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ open, onClose, children, ...props }, ref) => (
    <Dialog
      ref={ref}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      {children}
    </Dialog>
  )
);
AlertDialog.displayName = "AlertDialog";

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <DialogTitle ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <DialogContent ref={ref} className={cn(className)} {...props}>
      {children}
    </DialogContent>
  )
);
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <DialogContentText ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <DialogActions ref={ref} className={cn("flex justify-end gap-2", className)} {...props} />
  )
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="contained" color="primary" {...props} />
  )
);
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => (
    <Button ref={ref} variant="outlined" color="inherit" {...props} />
  )
);

AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};
