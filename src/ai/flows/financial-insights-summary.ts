// financial-insights-summary.ts
'use server';

/**
 * @fileOverview Provides financial insights based on a user-provided financial summary.
 *
 * - analyzeFinancialSummary - Analyzes a financial summary and provides key insights, potential concerns, and actionable steps.
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
  stepsToTake: z
    .string()
    .describe('Actionable steps the user can take to address the potential concerns, or general financial health advice if no specific concerns are found.'),
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
  prompt: `You are a financial analyst tasked with reviewing a user's financial summary.
  Your response should include:
  1. Key Insights: A concise summary of the key financial insights derived from the provided financial summary.
  2. Potential Concerns: Identify any potential areas of financial concern based on the provided summary.
  3. Steps to Take: Provide actionable steps the user can take to address the identified potential concerns. If no major concerns are found, suggest general good financial practices or areas for optimization.

  Analyze the following financial summary:
  {{financialSummary}}

  Structure your output to match the defined schema.`,
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
