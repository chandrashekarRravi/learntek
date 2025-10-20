declare module '@radix-ui/react-toast' {
  import * as React from 'react';

  // Declare primitives as ForwardRefExoticComponent so React.ElementRef<> works
  export const Provider: React.ForwardRefExoticComponent<any>;
  export const Viewport: React.ForwardRefExoticComponent<any>;
  export const Root: React.ForwardRefExoticComponent<any>;
  export const Action: React.ForwardRefExoticComponent<any>;
  export const Close: React.ForwardRefExoticComponent<any>;
  export const Title: React.ForwardRefExoticComponent<any>;
  export const Description: React.ForwardRefExoticComponent<any>;

  // Allow other primitives to be imported without strict typing
  export type PrimitiveProps = React.ComponentPropsWithoutRef<'div'> & Record<string, any>;
}

declare module 'class-variance-authority' {
  export function cva(base?: string, options?: any): (props?: any) => string;
  export type VariantProps<T> = Record<string, any>;
}

declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export const Root: React.ForwardRefExoticComponent<any>;
  export const Group: React.ForwardRefExoticComponent<any>;
  export const Value: React.ForwardRefExoticComponent<any>;
  export const Trigger: React.ForwardRefExoticComponent<any> & { displayName?: string };
  export const Icon: React.ForwardRefExoticComponent<any>;
  export const Portal: React.ForwardRefExoticComponent<any>;
  export const Content: React.ForwardRefExoticComponent<any> & { displayName?: string };
  export const Viewport: React.ForwardRefExoticComponent<any>;
  export const ScrollUpButton: React.ForwardRefExoticComponent<any>;
  export const ScrollDownButton: React.ForwardRefExoticComponent<any>;
  export const Label: React.ForwardRefExoticComponent<any>;
  export const Item: React.ForwardRefExoticComponent<any> & { displayName?: string };
  export const ItemIndicator: React.ForwardRefExoticComponent<any>;
  export const ItemText: React.ForwardRefExoticComponent<any>;
  export const Separator: React.ForwardRefExoticComponent<any>;

  export type SelectProps = React.ComponentPropsWithoutRef<'div'> & Record<string, any>;
}
