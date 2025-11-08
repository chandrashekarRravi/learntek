import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'standard' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'outlined', size = 'small', ...props }, ref) => {
    return (
      <TextField
        variant={variant}
        size={size}
        className={cn(className)}
        inputRef={ref}
        fullWidth
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
