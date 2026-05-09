import clsx from 'clsx';

export const iconButtonBaseStyles = (showLabel: boolean): string => {
  return clsx(
    'inline-flex items-center rounded-lg font-semibold shadow',
    'transition focus:outline-hidden focus:ring-2 focus:ring-offset-2',
    'dark:focus:ring-offset-gray-800',
    'disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer',
    showLabel ? 'gap-2 px-4 py-2' : 'h-10 w-10 justify-center'
  );
};

export const iconButtonIconBaseStyles = (): string => {
  return 'inline-flex items-center justify-center';
};
