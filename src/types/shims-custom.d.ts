declare module '@radix-ui/react-toast' {
  import * as React from 'react';

  // Declare primitives as ForwardRefExoticComponent so React.ElementRef<> works
  export const Provider: React.ForwardRefExoticComponent<unknown>;
  export const Viewport: React.ForwardRefExoticComponent<unknown>;
  export const Root: React.ForwardRefExoticComponent<unknown>;
  export const Action: React.ForwardRefExoticComponent<unknown>;
  export const Close: React.ForwardRefExoticComponent<unknown>;
  export const Title: React.ForwardRefExoticComponent<unknown>;
  export const Description: React.ForwardRefExoticComponent<unknown>;

  // Allow other primitives to be imported without strict typing
  export type PrimitiveProps = React.ComponentPropsWithoutRef<'div'> & Record<string, unknown>;
}

declare module 'class-variance-authority' {
  export function cva(base?: string, options?: unknown): (props?: unknown) => string;
  export type VariantProps<T> = Record<string, unknown>;
}

declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export const Root: React.ForwardRefExoticComponent<unknown>;
  export const Group: React.ForwardRefExoticComponent<unknown>;
  export const Value: React.ForwardRefExoticComponent<unknown>;
  export const Trigger: React.ForwardRefExoticComponent<unknown> & { displayName?: string };
  export const Icon: React.ForwardRefExoticComponent<unknown>;
  export const Portal: React.ForwardRefExoticComponent<unknown>;
  export const Content: React.ForwardRefExoticComponent<unknown> & { displayName?: string };
  export const Viewport: React.ForwardRefExoticComponent<unknown>;
  export const ScrollUpButton: React.ForwardRefExoticComponent<unknown>;
  export const ScrollDownButton: React.ForwardRefExoticComponent<unknown>;
  export const Label: React.ForwardRefExoticComponent<unknown>;
  export const Item: React.ForwardRefExoticComponent<unknown> & { displayName?: string };
  export const ItemIndicator: React.ForwardRefExoticComponent<unknown>;
  export const ItemText: React.ForwardRefExoticComponent<unknown>;
  export const Separator: React.ForwardRefExoticComponent<unknown>;

  export type SelectProps = React.ComponentPropsWithoutRef<'div'> & Record<string, unknown>;
}
