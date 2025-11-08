import * as React from "react";
import SelectMUI, { SelectProps as MUISelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { cn } from "@/lib/utils";

export interface SelectProps extends Omit<MUISelectProps, 'children'> {
  className?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, variant = "outlined", ...props }, ref) => (
    <SelectMUI ref={ref} className={cn(className)} variant={variant} {...props}>
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </SelectMUI>
  )
);
Select.displayName = "Select";

export { Select };
