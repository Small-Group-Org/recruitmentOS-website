import type { ComponentPropsWithoutRef } from 'react';
import { cn } from './cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddingClasses: Record<CardPadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-6 sm:p-10', // the dominant card padding across the site
};

type CardProps = ComponentPropsWithoutRef<'div'> & {
    /** element to render — defaults to div; use 'section' for landmark cards */
    as?: 'div' | 'section' | 'article';
    padding?: CardPadding;
    /** adds the subtle hover-lift defined in globals.css */
    hover?: boolean;
};

export function Card({ as: Tag = 'div', padding = 'md', hover = false, className, children, ...rest }: CardProps) {
    return (
        <Tag
            className={cn(
                'bg-white border border-[#E5E5E5] rounded-2xl',
                paddingClasses[padding],
                hover && 'card-hover',
                className,
            )}
            {...rest}
        >
            {children}
        </Tag>
    );
}
