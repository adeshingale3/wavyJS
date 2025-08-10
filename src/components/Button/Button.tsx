import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  asMotion?: false | undefined;
};

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'className' | 'ref'> & {
  className?: string;
  variant?: Variant;
  asMotion: true;
};

export type ButtonProps = BaseButtonProps | MotionButtonProps;

const baseClass =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400 px-4 py-2',
  secondary:
    'bg-slate-200 text-slate-900 hover:bg-slate-300 focus-visible:ring-slate-400 px-4 py-2',
  ghost:
    'bg-transparent text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-300 px-3 py-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  if (props.asMotion) {
    const { asMotion: _a, className = '', variant = 'primary', children, ...rest } = props;
    const classNames = `${baseClass} ${variants[variant]} ${className}`.trim();
    return (
      <motion.button
        ref={ref}
        className={classNames}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1 }}
        {...(rest as MotionButtonProps)}
      >
        {children}
      </motion.button>
    );
  }

  const { asMotion: _a2, className = '', variant = 'primary', children, ...rest } = props as BaseButtonProps;
  const classNames = `${baseClass} ${variants[variant]} ${className}`.trim();
  return (
    <button ref={ref} className={classNames} {...(rest as BaseButtonProps)}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';


