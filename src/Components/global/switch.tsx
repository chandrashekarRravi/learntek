
import * as React from "react";
import SwitchMUI, { SwitchProps as MUISwitchProps } from "@mui/material/Switch";
import { cn } from "@/lib/utils";

export interface SwitchProps extends MUISwitchProps {
  className?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchMUI ref={ref} className={cn(className)} {...props} />
  )
);
Switch.displayName = "Switch";

export { Switch };
