
import React from 'react';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { cn } from '@/lib/utils';

export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type Size = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'size'> {
  variant?: Variant;
  size?: Size;
  className?: string;
  color?: MUIButtonProps['color'];
  disableElevation?: MUIButtonProps['disableElevation'];
  disableFocusRipple?: MUIButtonProps['disableFocusRipple'];
  disableRipple?: MUIButtonProps['disableRipple'];
  endIcon?: MUIButtonProps['endIcon'];
  fullWidth?: MUIButtonProps['fullWidth'];
  href?: MUIButtonProps['href'];
  startIcon?: MUIButtonProps['startIcon'];
}

const mapVariantToMui = (v?: Variant) => {
  switch (v) {
    case 'outline':
      return 'outlined' as MUIButtonProps['variant'];
    case 'ghost':
    case 'link':
      return 'text' as MUIButtonProps['variant'];
    case 'secondary':
    case 'destructive':
    case 'default':
    default:
      return 'contained' as MUIButtonProps['variant'];
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant,
      size,
      className,
      children,
      color,
      disableElevation,
      disableFocusRipple,
      disableRipple,
      endIcon,
      fullWidth,
      href,
      startIcon,
      ...props
    },
    ref
  ) {
    const muiVariant = mapVariantToMui(variant);
    const sizeMapping: Record<Size, 'small' | 'medium' | 'large'> = {
      default: 'medium',
      sm: 'small',
      lg: 'large',
      icon: 'medium',
    };
    const muiSize = sizeMapping[size || 'default'];
    return (
      <MUIButton
        ref={ref}
        variant={muiVariant}
        color={color}
        disableElevation={disableElevation}
        disableFocusRipple={disableFocusRipple}
        disableRipple={disableRipple}
        endIcon={endIcon}
        fullWidth={fullWidth}
        href={href}
        startIcon={startIcon}
        size={muiSize}
        className={cn(String(className))}
        {...props}
      >
        {children}
      </MUIButton>
    );
  }
);
Button.displayName = 'Button';

export { Button };
export default Button;
