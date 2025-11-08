import * as React from "react";
import CheckboxMUI, { CheckboxProps as MUICheckboxProps } from "@mui/material/Checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends MUICheckboxProps {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxMUI ref={ref} className={cn(className)} {...props} />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
