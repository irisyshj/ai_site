'use client';

/**
 * AI Coach Page
 * Dedicated page for the AI chat with instructions and example prompts
 */

import Link from 'next/link';
import { ArrowLeft, MessageCircle, Sparkles, BookOpen, Target, Zap } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAIChatConfig, isValidIframeURL } from '@/lib/ai-chat';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const examplePrompts = [
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Goal Setting',
    prompt: 'Help me create a 90-day plan to improve my public speaking skills',
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Brainstorming',
    prompt: 'Give me 5 creative ideas for my next project presentation',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Learning Resources',
    prompt: 'What are the best resources to learn about machine learning?',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Problem Solving',
    prompt: 'Help me debug this issue: my app is not connecting to the database',
  },
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: 'Feedback',
    prompt: 'Review my project proposal and suggest improvements',
  },
];

const features = [
  {
    title: '24/7 Availability',
    description: 'Get help anytime, anywhere. Our AI coach is always ready to assist you.',
  },
  {
    title: 'Personalized Guidance',
    description: 'Receive tailored advice based on your specific needs and goals.',
  },
  {
    title: 'Quick Responses',
    description: 'Get instant answers to your questions without waiting.',
  },
];

export default function AICoachPage() {
  const config = getAIChatConfig();
  const isValidUrl = isValidIframeURL(config.url);

  const handlePromptClick = () => {
    const chatSection = document.getElementById('ai-chat-section');
    chatSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <Badge className="mb-2" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Assistant
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Meet Your AI Coach
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get personalized guidance, brainstorm ideas, and solve problems with
              the help of our intelligent AI assistant. Available 24/7 to support
              your journey.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-muted">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Example Prompts */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Try These Prompts</h2>
              <p className="text-muted-foreground">
                Click on any prompt to get started
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {examplePrompts.map((example) => (
                <Card
                  key={example.title}
                  className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50 group"
                  onClick={handlePromptClick}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-primary group-hover:scale-105 transition-transform">
                      {example.icon}
                      <CardTitle className="text-base">{example.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {example.prompt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Chat Section */}
          <div id="ai-chat-section" className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Start Chatting</h2>
              <p className="text-muted-foreground">
                Ask questions, brainstorm ideas, or get personalized advice
              </p>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px] md:h-[700px] bg-muted/20">
                  {isValidUrl ? (
                    <iframe
                      src={config.url}
                      title={config.title || 'AI Coach Chat'}
                      className="w-full h-full border-0"
                      allow="microphone; clipboard-write"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center space-y-4 p-6 max-w-md">
                        <div className="h-12 w-12 rounded-full bg-muted mx-auto flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold">AI Coach Not Configured</h3>
                          <p className="text-sm text-muted-foreground">
                            The AI chat URL is not configured. Please set the{' '}
                            <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                              NEXT_PUBLIC_AI_CHAT_URL
                            </code>{' '}
                            environment variable to enable the AI coach.
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Placeholder URL:{' '}
                          <code className="px-1.5 py-0.5 bg-muted rounded">
                            {config.url}
                          </code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <Card className="bg-muted/30 border-muted">
            <CardHeader>
              <CardTitle className="text-lg">Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Be specific:</strong> The more details you provide,
                    the better the AI can help you.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Ask follow-up questions:</strong> Don&apos;t hesitate
                    to ask for clarification or more details.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Use examples:</strong> Share relevant examples or
                    context to get more tailored responses.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong>Break it down:</strong> For complex problems, break
                    them into smaller, manageable questions.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Always improving to serve you better</p>
        </div>
      </footer>
    </div>
  );
}
