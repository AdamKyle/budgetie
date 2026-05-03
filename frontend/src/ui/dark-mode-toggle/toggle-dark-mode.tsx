import useDarkMode from './hooks/use-dark-mode';
import type ToggleDarkModeProps from './types/toggle-dark-mode-props';

import { ButtonVariant } from 'ui/buttons/enums/button-variant';
import IconButton from 'ui/buttons/icon-button';

const ToggleDarkMode = ({
  additional_css,
  show_label = false,
}: ToggleDarkModeProps) => {
  const {
    darkModeAriaLabel,
    darkModeIconClassName,
    darkModeLabel,
    onToggleDarkMode,
  } = useDarkMode();

  return (
    <IconButton
      on_click={onToggleDarkMode}
      icon={darkModeIconClassName}
      label={darkModeLabel}
      aria_label={darkModeAriaLabel}
      variant={ButtonVariant.Default}
      additional_css={additional_css}
      show_label={show_label}
    />
  );
};

export default ToggleDarkMode;
