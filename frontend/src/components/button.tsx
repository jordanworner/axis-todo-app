import clsx from 'clsx';
import * as React from 'react';

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'default' | 'primary';
  size?: 'sm' | 'xs'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'default',
    size = 'sm',
    type = 'button',
    className,
    children,
    ...other
  } = props;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'inline-flex items-center  border  font-medium  shadow-sm ',
        ' focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        size == 'sm' && 'px-3 py-2 text-sm leading-4 rounded-md',
        size == 'xs' && 'px-2.5 py-1.5 text-xs rounded',
        variant === 'default' && 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
        variant === 'primary' && 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
});
