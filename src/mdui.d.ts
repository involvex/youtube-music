// TypeScript type declarations for MDUI custom elements
// This allows TypeScript to recognize MDUI components as valid JSX elements

import 'solid-js';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      // MDUI Components used in the codebase
      'mdui-tooltip': HTMLAttributes<HTMLElement> & {
        content?: string;
        placement?:
          | 'auto'
          | 'top'
          | 'bottom'
          | 'left'
          | 'right'
          | 'top-start'
          | 'top-end'
          | 'bottom-start'
          | 'bottom-end'
          | 'left-start'
          | 'left-end'
          | 'right-start'
          | 'right-end';
        variant?: 'rich' | 'plain';
        disabled?: boolean;
        open?: boolean;
      };

      'mdui-button-icon': HTMLAttributes<HTMLElement> & {
        'variant'?: 'standard' | 'filled' | 'tonal' | 'outlined' | 'text';
        'size'?: 'small' | 'medium' | 'large';
        'disabled'?: boolean;
        'aria-label'?: string;
        'onClick'?: (event: MouseEvent) => void;
      };
    }
  }
}
