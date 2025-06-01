
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, TrendingUp, ShieldCheck, ArrowRight, Star } from 'lucide-react';

export function HeroSection() {
  const features = [
    { label: "Expert Analysis", icon: CheckCircle },
    { label: "Personalized Plans", icon: Star },
    { label: "Secure Future", icon: ShieldCheck },
    { label: "Wealth Growth", icon: TrendingUp },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <Card className="rounded-2xl shadow-xl overflow-hidden bg-card/80 backdrop-blur-sm">
              <CardHeader className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {features.map((feature) => (
                    <Badge key={feature.label} variant="secondary" className="text-sm py-1 px-3">
                      <feature.icon className="mr-2 h-4 w-4" />
                      {feature.label}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Take Control of Your Financial Future
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6">
                  <Image
                    src="https://placehold.co/600x375.png"
                    alt="Financial planning dashboard"
                    data-ai-hint="financial dashboard modern"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-background/70 rounded-lg border border-border">
                    <h4 className="font-semibold text-primary mb-1">95% Client Satisfaction</h4>
                    <p className="text-muted-foreground">Achieving financial goals together.</p>
                  </div>
                  <div className="p-4 bg-background/70 rounded-lg border border-border">
                    <h4 className="font-semibold text-primary mb-1">$10M+ Assets Managed</h4>
                    <p className="text-muted-foreground">A proven track record of success.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground">
              Unlock Your Path to <span className="text-primary">Financial Freedom</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
              Partner with UK Venture for expert financial planning, AI-driven insights, and personalized strategies designed to grow and protect your wealth. Let us help you navigate the complexities of finance with clarity and confidence.
            </p>
            <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-start justify-center">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="/contact">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>
            <Card className="mt-8 rounded-2xl shadow-lg bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                <Zap className="h-8 w-8 text-secondary mb-3" />
                <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Leverage our cutting-edge AI for smarter strategies and portfolio optimization.
                </p>
                <p className="text-lg font-semibold text-secondary">Enhanced Decision Making</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
