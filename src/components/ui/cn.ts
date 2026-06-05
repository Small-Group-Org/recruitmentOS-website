/**
 * Tiny class-name joiner. Filters out falsy values so conditional classes can
 * be written inline: cn('base', isActive && 'active', className).
 *
 * Note: this does NOT de-duplicate conflicting Tailwind utilities (no
 * tailwind-merge). Treat the trailing `className` as ADDITIVE — use it for
 * extra utilities (spacing, shadow, width), not to override a variant's color.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
    return values.filter(Boolean).join(' ');
}
