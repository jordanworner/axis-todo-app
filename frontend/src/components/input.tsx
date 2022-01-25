import clsx from 'clsx';
import * as React from 'react';
import { useId } from "@reach/auto-id";

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    type = 'text',
    className,
    id,
    ...other
  } = props;

  const autoId = useId(id);

  return (
    <div>
      <label htmlFor={autoId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          ref={ref}
          type={type}
          id={autoId}
          className={clsx(
            'shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md',
            className,
          )}
          {...other}
        />
      </div>
    </div>
  );
});
