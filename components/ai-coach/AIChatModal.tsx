'use client';

/**
 * AI Chat Modal Component
 * Full-screen on mobile, centered modal on desktop
 * Uses Shadcn Dialog component for accessibility
 */

import * as React from 'react';
import { Loader2, X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getAIChatConfig, isValidIframeURL } from '@/lib/ai-chat';
import { cn } from '@/lib/utils';

export interface AIChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

export function AIChatModal({
  open,
  onOpenChange,
  title,
}: AIChatModalProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const config = getAIChatConfig();

  // Reset loading state when modal opens
  React.useEffect(() => {
    if (open) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [open]);

  const handleIframeLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleIframeError = React.useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Validate URL before rendering
  const isValidUrl = React.useMemo(() => {
    return isValidIframeURL(config.url);
  }, [config.url]);

  const handleClose = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Handle escape key to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, handleClose]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // Full screen on mobile
          'h-[100dvh] w-screen max-w-none m-0 p-0 rounded-none border-0',
          // Centered modal on desktop
          'sm:h-[600px] sm:w-[90vw] sm:max-w-[800px] sm:m-0 sm:rounded-lg sm:border sm:p-0'
        )}
        aria-describedby="ai-chat-description"
      >
        {/* Header with close button */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3 sm:px-6 sm:py-4 border-b">
          <div className="flex flex-col space-y-1">
            <DialogTitle className="text-lg font-semibold">
              {title || config.title || 'AI Coach'}
            </DialogTitle>
            <DialogDescription id="ai-chat-description" className="sr-only">
              Chat with the AI assistant for personalized guidance and support
            </DialogDescription>
          </div>
          <button
            onClick={handleClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        {/* Chat iframe container */}
        <div className="flex-1 overflow-hidden bg-muted/20">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-background/80">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Loading AI Coach...
                </p>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-4 p-6 text-center max-w-md">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-6 w-6 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Failed to load AI Coach</h3>
                  <p className="text-sm text-muted-foreground">
                    There was a problem connecting to the AI service. Please try
                    again later or contact support if the issue persists.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setHasError(false);
                    setIsLoading(true);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!isValidUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="flex flex-col items-center gap-4 p-6 text-center max-w-md">
                <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-6 w-6 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Invalid AI Chat URL</h3>
                  <p className="text-sm text-muted-foreground">
                    The configured AI chat URL is not valid. Please check your
                    environment variables.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isValidUrl && !hasError && (
            <iframe
              ref={iframeRef}
              src={config.url}
              title={config.title || 'AI Coach Chat'}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="microphone; clipboard-write"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              loading="lazy"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
