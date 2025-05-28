// financial-insights-summary.ts
'use server';

/**
 * @fileOverview Provides financial insights based on a user-provided financial summary.
 *
 * - analyzeFinancialSummary - Analyzes a financial summary and provides key insights and potential concerns.
 * - AnalyzeFinancialSummaryInput - The input type for the analyzeFinancialSummary function.
 * - AnalyzeFinancialSummaryOutput - The return type for the analyzeFinancialSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFinancialSummaryInputSchema = z.object({
  financialSummary: z
    .string()
    .describe('A detailed summary of the user\u2019s financial situation, including income, expenses, assets, and liabilities.'),
});

export type AnalyzeFinancialSummaryInput = z.infer<typeof AnalyzeFinancialSummaryInputSchema>;

const AnalyzeFinancialSummaryOutputSchema = z.object({
  keyInsights: z
    .string()
    .describe('A concise summary of the key financial insights derived from the provided financial summary.'),
  potentialConcerns: z
    .string()
    .describe('Identifies any potential areas of financial concern based on the provided summary.'),
});

export type AnalyzeFinancialSummaryOutput = z.infer<typeof AnalyzeFinancialSummaryOutputSchema>;

export async function analyzeFinancialSummary(
  input: AnalyzeFinancialSummaryInput
): Promise<AnalyzeFinancialSummaryOutput> {
  return analyzeFinancialSummaryFlow(input);
}

const analyzeFinancialSummaryPrompt = ai.definePrompt({
  name: 'analyzeFinancialSummaryPrompt',
  input: {schema: AnalyzeFinancialSummaryInputSchema},
  output: {schema: AnalyzeFinancialSummaryOutputSchema},
  prompt: `You are a financial analyst tasked with reviewing a user's financial summary and providing key insights and identifying potential areas of concern.

  Analyze the following financial summary:
  {{financialSummary}}

  Provide a concise summary of the key financial insights and clearly identify any potential concerns that the user should be aware of.`,
});

const analyzeFinancialSummaryFlow = ai.defineFlow(
  {
    name: 'analyzeFinancialSummaryFlow',
    inputSchema: AnalyzeFinancialSummaryInputSchema,
    outputSchema: AnalyzeFinancialSummaryOutputSchema,
  },
  async input => {
    const {output} = await analyzeFinancialSummaryPrompt(input);
    return output!;
  }
);
