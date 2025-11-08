
import * as React from "react";
import RadioGroupMUI from "@mui/material/RadioGroup";
import RadioMUI, { RadioProps as MUIRadioProps } from "@mui/material/Radio";
import { cn } from "@/lib/utils";

export interface RadioGroupProps {
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  children?: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onChange, children, ...props }, ref) => (
    <RadioGroupMUI
      ref={ref}
      className={cn("grid gap-2", className)}
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </RadioGroupMUI>
  )
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends MUIRadioProps {
  className?: string;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, ...props }, ref) => (
    <RadioMUI ref={ref} className={cn(className)} {...props} />
  )
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
