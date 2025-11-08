import * as React from "react";
import { Button as MUIButton, ButtonProps as MUIButtonProps } from "@/Components/mui/Button";

export type { ButtonProps } from "@/Components/mui/Button";

const Button = React.forwardRef<HTMLButtonElement, MUIButtonProps>(
  (props, ref) => {
    return <MUIButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
