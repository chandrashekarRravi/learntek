import * as React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Checkbox,
  Radio,
} from "@mui/material";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ trigger, children }, ref) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        {trigger ? (
          <div onClick={handleClick}>{trigger}</div>
        ) : (
          <Button onClick={handleClick}>Open Menu</Button>
        )}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          ref={ref}
        >
          {children}
        </Menu>
      </>
    );
  }
);

interface DropdownMenuItemProps extends React.ComponentProps<typeof MenuItem> {
  inset?: boolean;
  icon?: React.ReactNode;
}

const DropdownMenuItem = React.forwardRef<HTMLLIElement, DropdownMenuItemProps>(
  ({ className, inset, icon, children, ...props }, ref) => (
    <MenuItem
      ref={ref}
      className={cn(
        "min-h-[32px] px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  )
);

interface DropdownMenuCheckboxItemProps extends Omit<React.ComponentProps<typeof MenuItem>, 'checked'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLLIElement, DropdownMenuCheckboxItemProps>(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => (
    <MenuItem
      ref={ref}
      className={cn("min-h-[32px] px-2 py-1.5 text-sm", className)}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <Checkbox
        checked={checked}
        size="small"
        sx={{ padding: '0 8px 0 0' }}
      />
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  )
);

interface DropdownMenuRadioItemProps extends Omit<React.ComponentProps<typeof MenuItem>, 'checked'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuRadioItem = React.forwardRef<HTMLLIElement, DropdownMenuRadioItemProps>(
  ({ className, children, checked, onCheckedChange, ...props }, ref) => (
    <MenuItem
      ref={ref}
      className={cn("min-h-[32px] px-2 py-1.5 text-sm", className)}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <Radio
        checked={checked}
        size="small"
        sx={{ padding: '0 8px 0 0' }}
      />
      <ListItemText>{children}</ListItemText>
    </MenuItem>
  )
);

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ListItemText
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    />
  )
);

const DropdownMenuSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <Divider ref={ref} className={cn(className)} {...props} />
  )
);

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
);

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
