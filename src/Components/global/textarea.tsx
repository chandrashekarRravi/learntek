
import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { cn } from "@/lib/utils";

export interface TextareaProps extends Omit<TextFieldProps, 'multiline'> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <TextField
      multiline
      minRows={4}
      ref={ref}
      className={cn(className)}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
