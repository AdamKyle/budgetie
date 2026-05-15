import { ReactNode } from 'react';

import type { ButtonVariant } from 'ui/buttons/enums/button-variant';

export default interface IconButtonProps<T extends unknown[] = []> {
  on_click: (...args: T) => void;
  icon: ReactNode | string;
  label: string;
  variant: ButtonVariant;
  disabled?: boolean;
  additional_css?: string;
  aria_label?: string;
  aria_controls?: string;
  aria_expanded?: boolean;
  show_label?: boolean;
}
