/**
 * AI Chat Utilities
 * Configuration and helper functions for Dify/Coze chatbot integration
 */

export interface AIChatConfig {
  url: string;
  title?: string;
  height?: string;
  width?: string;
}

/**
 * Get the AI chat URL from environment variables or use the default
 * Environment variable: NEXT_PUBLIC_AI_CHAT_URL
 */
export function getAIChatURL(): string {
  if (typeof window !== 'undefined') {
    // Client-side: check the runtime config
    const runtimeUrl = process.env.NEXT_PUBLIC_AI_CHAT_URL;
    if (runtimeUrl) return runtimeUrl;
  }

  // Fallback to placeholder URL
  return 'https://demo.dify.ai/chatbot';
}

/**
 * Check if the AI chat widget is enabled
 * Environment variable: NEXT_PUBLIC_AI_CHAT_ENABLED (default: true)
 */
export function isAIChatEnabled(): boolean {
  if (typeof window !== 'undefined') {
    const enabled = process.env.NEXT_PUBLIC_AI_CHAT_ENABLED;
    if (enabled !== undefined) {
      return enabled === 'true' || enabled === '1';
    }
  }
  return true;
}

/**
 * Generate iframe configuration for the AI chat
 */
export function getAIChatConfig(): AIChatConfig {
  return {
    url: getAIChatURL(),
    title: 'AI Coach Chat',
    height: '100%',
    width: '100%',
  };
}

/**
 * Generate the complete iframe URL with optional parameters
 * @param customPath Optional custom path to append to the base URL
 * @param params Optional query parameters to include
 */
export function generateIframeURL(
  customPath?: string,
  params?: Record<string, string>
): string {
  const baseUrl = getAIChatURL();
  const url = new URL(baseUrl);

  if (customPath) {
    // Append custom path to the URL
    const pathParts = customPath.split('/').filter(Boolean);
    url.pathname = [...url.pathname.split('/').filter(Boolean), ...pathParts].join('/');
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

/**
 * Validate if a URL is safe to load in an iframe
 * This helps prevent XSS attacks from user-provided URLs
 */
export function isValidIframeURL(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Only allow https: protocol
    if (parsed.protocol !== 'https:') {
      return false;
    }

    // Block private/local IP addresses (basic check)
    const hostname = parsed.hostname;
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('172.16.')
    ) {
      return false;
    }

    // Allow well-known AI chat platforms
    const allowedDomains = [
      'dify.ai',
      'demo.dify.ai',
      'coze.com',
      'www.coze.com',
      // Users can add their custom domains via env var
    ];

    // If the URL matches an allowed domain or is from env var, it's valid
    const envUrl = process.env.NEXT_PUBLIC_AI_CHAT_URL;
    if (envUrl) {
      try {
        const envParsed = new URL(envUrl);
        if (parsed.hostname === envParsed.hostname) {
          return true;
        }
      } catch {
        // Invalid env URL, continue with domain check
      }
    }

    return allowedDomains.some((domain) => hostname.endsWith(domain));
  } catch {
    return false;
  }
}
