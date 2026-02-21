'use client';

/**
 * Optimized Image Component
 *
 * A wrapper around next/image with additional optimizations:
 * - Lazy loading by default
 * - Blur placeholder for smoother loading
 * - Proper sizes for responsive images
 * - WebP/AVIF format support
 * - Accessibility attributes
 */

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps extends Omit<ImageProps, 'blurDataURL'> {
  /**
   * Width of the image placeholder blur
   * @default 64
   */
  blurWidth?: number;

  /**
   * Height of the image placeholder blur
   * @default 64
   */
  blurHeight?: number;

  /**
   * Enable blur placeholder
   * @default true
   */
  enableBlur?: boolean;

  /**
   * Container className for styling wrapper
   */
  containerClassName?: string;
}

/**
 * Generate a simple blur placeholder data URL
 */
function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Create a subtle gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(200, 200, 200, 0.1)');
  gradient.addColorStop(1, 'rgba(150, 150, 150, 0.1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * Optimized Image Component
 *
 * Usage:
 * ```tsx
 * <OptimizedImage
 *   src="/hero-image.jpg"
 *   alt="Hero section illustration"
 *   width={1200}
 *   height={600}
 *   priority // For above-fold images
 *   sizes="(max-width: 768px) 100vw, 1200px"
 * />
 * ```
 */
export function OptimizedImage({
  blurWidth = 10,
  blurHeight = 10,
  enableBlur = true,
  containerClassName,
  className,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate blur placeholder on mount
  const [blurDataURL] = useState(() =>
    enableBlur ? generateBlurPlaceholder(blurWidth, blurHeight) : ''
  );

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          containerClassName
        )}
        style={{ width: props.width, height: props.height }}
        role="img"
        aria-label={props.alt as string}
      >
        <span className="text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        placeholder={enableBlur ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        sizes={
          props.sizes ||
          '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        }
      />
    </div>
  );
}

/**
 * Preset image sizes for common use cases
 */
export const imageSizes = {
  // Full width for mobile, constrained on desktop
  fullWidth: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',

  // Hero section images
  hero: '(max-width: 768px) 100vw, 1200px',

  // Card images
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',

  // Thumbnail images
  thumbnail: '(max-width: 640px) 100vw, 150px',

  // Avatar images
  avatar: '64px',

  // Logo images
  logo: '200px',
} as const;

/**
 * Optimized Avatar Component
 */
export interface AvatarProps extends Omit<OptimizedImageProps, 'width' | 'height'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const avatarSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function Avatar({
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const pixelSize = avatarSizes[size];

  return (
    <OptimizedImage
      {...props}
      width={pixelSize}
      height={pixelSize}
      className={cn(
        'rounded-full object-cover',
        'ring-2 ring-border ring-offset-2 ring-offset-background',
        className
      )}
      sizes={imageSizes.avatar}
      alt={props.alt || 'Avatar'}
    />
  );
}

/**
 * Optimized Logo Component
 */
export function Logo({
  className,
  height = 40,
  ...props
}: OptimizedImageProps & { height?: number }) {
  const width = height * 2; // Assuming 2:1 aspect ratio for logos

  return (
    <OptimizedImage
      {...props}
      width={width}
      height={height}
      className={cn('h-auto object-contain', className)}
      sizes={imageSizes.logo}
      alt={props.alt || 'Logo'}
      priority // Logos should always be prioritized
    />
  );
}
