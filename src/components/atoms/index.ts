/**
 * Hunter Galloway Design System - Atomic Components
 * Central export for all atomic components
 */

// Export atomic components
export { default as Badge } from './Badge/Badge.astro';
export { default as Button } from './Button/Button.astro';
export { default as CheckmarkIcon } from './CheckmarkIcon/CheckmarkIcon.astro';
export { default as Container } from './Container/Container.astro';
export { default as Icon } from './Icon/Icon.astro';
export { default as Input } from './Input/Input.astro';
export { default as Logo } from './Logo/Logo.astro';
export { default as Slider } from './Slider/Slider.astro';
export { default as Typography } from './Typography/Typography.astro';
export { default as Image } from './Image/Image.astro';

// Export types
export type { ButtonProps } from './Button/Button.types';
export type { IconProps } from './Icon/Icon.types';
export type { TypographyProps } from './Typography/Typography.types';
export type { BadgeProps } from './Badge/Badge.types';
export type { InputProps } from './Input/Input.types';
export type { ContainerProps } from './Container/Container.types';
export type { SliderProps } from './Slider/Slider.types';
export type { ImageProps } from './Image/Image.types';