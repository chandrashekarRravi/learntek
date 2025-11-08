import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export interface MUIDialogProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const MUIDialog: React.FC<MUIDialogProps> = ({ open, onClose, children, fullWidth = true, maxWidth = 'md' }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      {children}
    </Dialog>
  );
};

export const MUIDialogTitle = (props: React.ComponentProps<typeof DialogTitle>) => <DialogTitle {...props} />;
export const MUIDialogContent = (props: React.ComponentProps<typeof DialogContent>) => <DialogContent {...props} />;
export const MUIDialogActions = (props: React.ComponentProps<typeof DialogActions>) => <DialogActions {...props} />;

export default MUIDialog;
