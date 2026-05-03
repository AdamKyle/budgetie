import { ChangeEventHandler } from 'react';

export default interface InputProps {
  id: string;
  label: string;
  name: string;
  type: 'email' | 'password' | 'text';
  autoComplete?: string;
  error?: string | null;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  value?: string;
}
