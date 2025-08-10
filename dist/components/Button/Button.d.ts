import { default as React } from 'react';
import { HTMLMotionProps } from 'framer-motion';
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
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map