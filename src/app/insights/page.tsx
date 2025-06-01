
import { FinancialInsightsTool } from '@/components/insights/FinancialInsightsTool';
import { APP_NAME } from '@/lib/constants';
import { Lightbulb } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Smart Financial Insights | ${APP_NAME}`,
  description: `Utilize our AI-driven tool on ${APP_NAME} to analyze your financial summary and receive key insights and potential areas of concern.`,
};

export default function InsightsPage() {
  return (
    <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20 md:pt-20">
      <div className="text-center mb-12 md:mb-16">
        <Lightbulb className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
          Unlock Your Financial Potential
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Our Smart Financial Insights tool uses advanced AI to analyze your financial situation and provide actionable advice. Understand your finances better and make smarter decisions.
        </p>
      </div>
      <FinancialInsightsTool />
    </div>
  );
}
