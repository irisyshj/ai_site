import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/data/site';
import { socialLinks } from '@/data/socials';
import { Mail, MapPin, Calendar, Award, BookOpen, Briefcase, Heart } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - AI Literacy Coach',
  description: 'Learn about my background, credentials, and philosophy on AI literacy education',
  openGraph: {
    title: 'About - AI Literacy Coach',
    description: 'Learn about my background, credentials, and philosophy on AI literacy education',
    type: 'website',
  },
};

const credentials = [
  {
    icon: BookOpen,
    label: 'Education',
    items: [
      { title: 'M.S. Computer Science', institution: 'Stanford University', year: '2018' },
      { title: 'B.S. Data Science', institution: 'MIT', year: '2016' },
    ],
  },
  {
    icon: Briefcase,
    label: 'Experience',
    items: [
      { title: 'Senior AI Researcher', institution: 'OpenAI', year: '2020-2023' },
      { title: 'ML Engineer', institution: 'Google Brain', year: '2018-2020' },
    ],
  },
  {
    icon: Award,
    label: 'Certifications',
    items: [
      { title: 'AWS Machine Learning Specialty', institution: 'Amazon Web Services', year: '2022' },
      { title: 'Google ML Engineer', institution: 'Google Cloud', year: '2021' },
    ],
  },
];

const interests = [
  'Large Language Models',
  'Responsible AI',
  'AI Ethics',
  'Prompt Engineering',
  'AI Education',
  'Human-AI Collaboration',
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <Container size="md">
        {/* Hero Section with Avatar */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-4xl font-bold text-primary-foreground shadow-lg">
            {siteConfig.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Empowering professionals to thrive in the age of artificial intelligence
          </p>
        </div>

        {/* Bio Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              My Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              I&apos;m {siteConfig.author}, the founder of {siteConfig.name}. My journey
              into the world of AI began during my graduate studies at Stanford, where I
              witnessed firsthand how artificial intelligence was transforming every
              industry.
            </p>
            <p>
              After years of working at the cutting edge of AI research at OpenAI and
              Google, I realized something important: the biggest barrier to AI adoption
              wasn&apos;t technology—it was literacy. Talented professionals were being left
              behind not because they lacked skills, but because they lacked understanding.
            </p>
            <p>
              That&apos;s why I created {siteConfig.name}. My mission is to bridge the gap
              between complex AI concepts and practical, everyday application. I believe
              that with the right guidance, anyone can harness the power of AI to work
              smarter, not harder.
            </p>
          </CardContent>
        </Card>

        {/* Philosophy Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>My Philosophy</CardTitle>
            <CardDescription>
              Core beliefs that guide my approach to AI education
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">AI is a Tool, Not a Replacement</h3>
                <p className="text-sm text-muted-foreground">
                  Artificial intelligence amplifies human potential. The key is learning
                  to collaborate with AI systems effectively.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Literacy Enables Confidence</h3>
                <p className="text-sm text-muted-foreground">
                  Understanding AI fundamentals eliminates fear and unlocks opportunities
                  for innovation in any field.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Practical Over Theoretical</h3>
                <p className="text-sm text-muted-foreground">
                  Real-world application matters more than abstract concepts. Learn by
                  doing, not by studying.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Continuous Learning is Essential</h3>
                <p className="text-sm text-muted-foreground">
                  AI evolves rapidly. Staying current requires curiosity, adaptability,
                  and a growth mindset.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials Section */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Credentials & Background</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {credentials.map((credentialGroup) => {
              const Icon = credentialGroup.icon;
              return (
                <Card key={credentialGroup.label}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="h-5 w-5 text-primary" />
                      {credentialGroup.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {credentialGroup.items.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.institution}</p>
                        <p className="text-xs text-muted-foreground">{item.year}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Interests Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Areas of Focus</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Get In Touch
            </CardTitle>
            <CardDescription>
              Connect with me on social media or reach out directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
