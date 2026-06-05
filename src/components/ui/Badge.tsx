import type { ComponentPropsWithoutRef } from 'react';
import { cn } from './cn';

export type BadgeVariant = 'solid' | 'outline' | 'muted' | 'success';
export type BadgeSize = 'sm' | 'md';

const base = 'inline-flex items-center gap-1 font-bold uppercase tracking-widest';

const variantClasses: Record<BadgeVariant, string> = {
    solid: 'bg-[#FF6A00] text-white',
    outline: 'border border-[#FF6A00]/30 text-[#FF6A00]',
    muted: 'border border-[#E5E5E5] text-[#9CA3AF]',
    success: 'bg-[#E8F5EF] text-[#1A6B4A]',
};

const sizeClasses: Record<BadgeSize, string> = {
    sm: 'text-[9px] px-2 py-0.5',
    md: 'text-[10px] px-2 py-1',
};

type BadgeProps = ComponentPropsWithoutRef<'span'> & {
    variant?: BadgeVariant;
    size?: BadgeSize;
    /** rounded-md instead of the default rounded-full pill */
    square?: boolean;
};

export function Badge({
    variant = 'solid',
    size = 'md',
    square = false,
    className,
    children,
    ...rest
}: BadgeProps) {
    return (
        <span
            className={cn(
                base,
                variantClasses[variant],
                sizeClasses[size],
                square ? 'rounded-md' : 'rounded-full',
                className,
            )}
            {...rest}
        >
            {children}
        </span>
    );
}
