'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, AlertTriangleIcon, ArrowUpCircle, XCircle } from 'lucide-react';
import { useState, useTransition, useRef, useEffect } from 'react';
import { analyzeFinancialSummary, type AnalyzeFinancialSummaryOutput } from '@/ai/flows/financial-insights-summary';

const insightsFormSchema = z.object({
  financialSummary: z.string().min(50, { message: 'Financial summary must be at least 50 characters.' }).max(5000, {message: 'Financial summary must be less than 5000 characters.'}),
});

type InsightsFormValues = z.infer<typeof insightsFormSchema>;

export function FinancialInsightsTool() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [analysisResult, setAnalysisResult] = useState<AnalyzeFinancialSummaryOutput | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const formCardRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const form = useForm<InsightsFormValues>({
    resolver: zodResolver(insightsFormSchema),
    defaultValues: {
      financialSummary: '',
    },
  });

  async function onSubmit(data: InsightsFormValues) {
    setAnalysisResult(null);
    setAnalysisError(null);
    startTransition(async () => {
      try {
        const result = await analyzeFinancialSummary({ financialSummary: data.financialSummary });
        setAnalysisResult(result);
        toast({
          title: 'Analysis Complete',
          description: 'Your financial insights are ready.',
        });
      } catch (error) {
        console.error('Financial analysis error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during analysis.';
        setAnalysisError(errorMessage);
        toast({
          title: 'Analysis Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    });
  }

  useEffect(() => {
    if (analysisResult && resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [analysisResult]);

  const handleClear = () => {
    form.reset({ financialSummary: '' });
    setAnalysisResult(null);
    setAnalysisError(null);
    if (formCardRef.current) {
        formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToInput = () => {
    if (formCardRef.current) {
      formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl" ref={formCardRef}>
        <CardHeader>
          <CardTitle className="text-2xl">Smart Financial Insights</CardTitle>
          <CardDescription>
            Paste your financial summary below. Our AI will analyze it and provide key insights, potential concerns, and steps to take.
            Please be detailed for a more accurate analysis (e.g., income, expenses, assets, liabilities).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="financialSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Financial Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your current financial situation, including income, major expenses, assets (savings, investments, property), and liabilities (loans, credit card debt)..."
                        className="min-h-[200px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the better the insights. We respect your privacy; this data is only used for this analysis.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Get Insights'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClear} 
                  disabled={isPending || (!form.formState.isDirty && !analysisResult && !analysisError)}
                  className="w-full sm:w-auto"
                >
                 <XCircle className="mr-2 h-4 w-4" />
                 Clear Input
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {analysisResult && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={scrollToInput}
            variant="secondary"
            size="icon"
            className="rounded-full p-3 shadow-lg h-12 w-12"
            aria-label="Scroll to input"
          >
            <ArrowUpCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      <div ref={resultsContainerRef}>
        {isPending && (
          <Card className="shadow-md animate-pulse mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" /> Generating Insights...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-3/4 mt-4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        )}

        {analysisError && !isPending && (
          <Card className="border-destructive shadow-md mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangleIcon className="h-5 w-5" /> Analysis Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">{analysisError}</p>
              <p className="text-sm text-muted-foreground mt-2">Please try refining your summary or try again later.</p>
            </CardContent>
          </Card>
        )}

        {analysisResult && !isPending && (
          <div className="space-y-6 mt-8">
            <Card className="shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Lightbulb className="h-7 w-7 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{analysisResult.keyInsights}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-amber-500/50 bg-amber-500/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-amber-700 dark:text-amber-500">
                  <AlertTriangleIcon className="h-7 w-7" />
                  Potential Concerns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 dark:text-amber-400 whitespace-pre-wrap leading-relaxed">{analysisResult.potentialConcerns}</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg bg-blue-500/5 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-blue-700 dark:text-blue-500">
                  {/* Re-using Lightbulb or could be a different icon like CheckSquare */}
                  <Lightbulb className="h-7 w-7" /> 
                  Steps to Take
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 dark:text-blue-400 whitespace-pre-wrap leading-relaxed">{analysisResult.stepsToTake}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
