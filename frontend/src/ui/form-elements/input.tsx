import clsx from 'clsx';

import type InputProps from './types/input-props';

const Input = ({
  id,
  label,
  name,
  type,
  autoComplete,
  error = null,
  onChange,
  placeholder,
  required = false,
  value,
}: InputProps) => {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-storm-dust-800 dark:text-storm-dust-100 text-sm font-semibold"
        htmlFor={id}
      >
        {label}
      </label>

      <input
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        aria-required={required}
        autoComplete={autoComplete}
        className={clsx(
          'w-full rounded-lg border bg-white px-4 py-3',
          'text-storm-dust-950 text-base shadow-sm transition',
          'placeholder:text-storm-dust-500',
          'focus:ring-2 focus:outline-hidden',
          'dark:bg-storm-dust-900 dark:text-storm-dust-50',
          'dark:placeholder:text-storm-dust-400',
          hasError
            ? [
                'border-persian-plum-500 focus:border-persian-plum-500 focus:ring-persian-plum-300',
                'dark:border-persian-plum-400 dark:focus:border-persian-plum-400 dark:focus:ring-persian-plum-600',
              ]
            : [
                'border-storm-dust-300 focus:border-blue-bell-500 focus:ring-blue-bell-400',
                'dark:border-storm-dust-700 dark:focus:border-blue-bell-400 dark:focus:ring-blue-bell-600',
              ]
        )}
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />

      {hasError && (
        <p
          className="text-persian-plum-600 dark:text-persian-plum-400 text-sm font-medium"
          id={errorId}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
