import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'dark';
export type ButtonSize = 'md' | 'lg';

const base =
    'inline-flex items-center justify-center gap-2 font-bold transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] focus-visible:ring-offset-2 ' +
    'disabled:opacity-40 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
    // Orange — the primary CTA across the site
    primary: 'bg-[#FF6A00] text-white hover:bg-[#E55F00]',
    // White with border — secondary actions
    secondary: 'bg-white text-[#0A0A0A] border border-[#E5E5E5] hover:border-[#FF6A00]',
    // Near-black that warms to orange on hover — used in tool/gate flows
    dark: 'bg-[#0A0A0A] text-white hover:bg-[#FF6A00]',
};

const sizeClasses: Record<ButtonSize, string> = {
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base sm:text-lg',
};

type BaseProps = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** rounded-full instead of the default rounded-xl */
    pill?: boolean;
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
};

type ButtonAsButton = BaseProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
    Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * The single source of truth for CTAs. Renders a Next `<Link>` when `href` is
 * passed, otherwise a `<button>`. Pass extra utilities via `className`.
 */
export function Button(props: ButtonProps) {
    const {
        variant = 'primary',
        size = 'md',
        pill = false,
        fullWidth = false,
        className,
        children,
        ...rest
    } = props;

    const classes = cn(
        base,
        variantClasses[variant],
        sizeClasses[size],
        pill ? 'rounded-full' : 'rounded-xl',
        fullWidth && 'w-full',
        className,
    );

    if (props.href !== undefined) {
        const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof BaseProps> & { href: string };
        return (
            <Link href={href} className={classes} {...anchorRest}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...(rest as Omit<ButtonAsButton, keyof BaseProps>)}>
            {children}
        </button>
    );
}
