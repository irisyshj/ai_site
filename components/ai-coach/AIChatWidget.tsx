'use client';

/**
 * AI Chat Widget Component
 * Floating action button (FAB) that opens the AI chat modal
 * Features pulse animation to draw attention
 */

import * as React from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';

import { AIChatModal } from './AIChatModal';
import { isAIChatEnabled } from '@/lib/ai-chat';
import { cn } from '@/lib/utils';

export interface AIChatWidgetProps {
  /**
   * Position of the widget
   * @default 'right'
   */
  position?: 'left' | 'right';

  /**
   * Distance from the bottom in pixels
   * @default 24
   */
  bottom?: number;

  /**
   * Distance from the side in pixels
   * @default 24
   */
  side?: number;

  /**
   * Z-index for the widget
   * @default 50
   */
  zIndex?: number;

  /**
   * Whether to show the pulse animation
   * @default true
   */
  showPulse?: boolean;

  /**
   * Custom icon to display
   */
  icon?: 'bot' | 'message' | 'custom';
  customIcon?: React.ReactNode;

  /**
   * Custom label for the button (screen reader only)
   */
  label?: string;

  /**
   * Custom tooltip text
   */
  tooltip?: string;
}

export function AIChatWidget({
  position = 'right',
  bottom = 24,
  side = 24,
  zIndex = 50,
  showPulse = true,
  icon = 'bot',
  customIcon,
  label = 'Open AI Coach',
  tooltip = 'Chat with AI Coach',
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasBeenOpened, setHasBeenOpened] = React.useState(false);

  // Check if AI chat is enabled
  const enabled = React.useMemo(() => isAIChatEnabled(), []);

  // Show widget after a short delay for better UX
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Stop pulse animation after first interaction
  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
    setHasBeenOpened(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, handleClose]);

  if (!enabled || !isVisible) {
    return null;
  }

  const positionClasses = cn(
    'fixed',
    position === 'left' ? 'left-0' : 'right-0'
  );

  const renderIcon = () => {
    if (customIcon) {
      return customIcon;
    }

    switch (icon) {
      case 'message':
        return <MessageCircle className="h-6 w-6" />;
      case 'bot':
      default:
        return <Bot className="h-6 w-6" />;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className={cn(
          positionClasses,
          'flex items-center justify-center',
          'h-14 w-14 rounded-full',
          'bg-primary text-primary-foreground',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-300',
          'hover:scale-110 active:scale-95',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          // Pulse animation
          showPulse && !hasBeenOpened && 'animate-pulse-subtle'
        )}
        style={{
          bottom: `${bottom}px`,
          [position === 'left' ? 'left' : 'right']: `${side}px`,
          zIndex,
        }}
        aria-label={label}
        title={tooltip}
      >
        {/* Pulse ring effect */}
        {showPulse && !hasBeenOpened && (
          <span
            className={cn(
              'absolute inset-0 rounded-full bg-primary/50',
              'animate-ping',
              'opacity-75'
            )}
            style={{ animationDuration: '2s' }}
          />
        )}

        <span className="relative z-10">{renderIcon()}</span>
      </button>

      {/* Tooltip */}
      {tooltip && (
        <span
          className={cn(
            positionClasses,
            'px-3 py-1.5 text-xs font-medium',
            'bg-foreground text-background',
            'rounded-md shadow-md',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200',
            'pointer-events-none',
            'whitespace-nowrap',
            // Position above the button
            'translate-y-[-60px]'
          )}
          style={{
            bottom: `${bottom + 56}px`,
            [position === 'left' ? 'left' : 'right']: `${side}px`,
            zIndex: zIndex - 1,
          }}
        >
          {tooltip}
          {/* Arrow */}
          <span
            className={cn(
              'absolute top-full left-1/2 -translate-x-1/2',
              'border-4 border-transparent',
              'border-t-foreground'
            )}
          />
        </span>
      )}

      {/* Chat Modal */}
      <AIChatModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

/**
 * AI Chat Widget with Tooltip Wrapper
 * Wrap the button in a div to handle hover state for tooltip
 */
export function AIChatWidgetWithTooltip(props: AIChatWidgetProps) {
  return (
    <div className="group relative">
      <AIChatWidget {...props} />
    </div>
  );
}
