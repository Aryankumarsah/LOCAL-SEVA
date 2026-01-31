'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing machine learning-powered service recommendations.
 *
 * It includes the `getMLPoweredServiceRecommendations` function, which takes user location and service type as input
 * and returns a list of recommended service providers based on ML algorithms.
 *
 * @exports getMLPoweredServiceRecommendations - The main function to retrieve service recommendations.
 * @exports MLPoweredServiceRecommendationsInput - The input type for the recommendation function.
 * @exports MLPoweredServiceRecommendationsOutput - The output type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MLPoweredServiceRecommendationsInputSchema = z.object({
  location: z.string().describe('The location of the user.'),
  serviceType: z.string().describe('The type of service requested (e.g., electrician, plumber).'),
});
export type MLPoweredServiceRecommendationsInput = z.infer<typeof MLPoweredServiceRecommendationsInputSchema>;

const MLPoweredServiceRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      providerId: z.string().describe('The unique identifier of the service provider.'),
      name: z.string().describe('The name of the service provider.'),
      rating: z.number().describe('The average rating of the service provider.'),
      bookingFrequency: z.number().describe('The frequency with which the provider has been booked.'),
      profileDescription: z.string().describe('Short description of the service provider profile'),
    })
  ).describe('A list of recommended service providers.'),
});
export type MLPoweredServiceRecommendationsOutput = z.infer<typeof MLPoweredServiceRecommendationsOutputSchema>;

export async function getMLPoweredServiceRecommendations(input: MLPoweredServiceRecommendationsInput): Promise<MLPoweredServiceRecommendationsOutput> {
  return mlPoweredServiceRecommendationsFlow(input);
}

const mlPoweredServiceRecommendationsPrompt = ai.definePrompt({
  name: 'mlPoweredServiceRecommendationsPrompt',
  input: {schema: MLPoweredServiceRecommendationsInputSchema},
  output: {schema: MLPoweredServiceRecommendationsOutputSchema},
  prompt: `You are an AI assistant helping users find local service providers. Based on the user's location and the type of service they need, you will provide a list of recommended service providers.

  The recommendations should be based on the following factors:

  - **Rating**: Higher-rated providers should be prioritized.
  - **Booking Frequency**: Providers with more frequent bookings are generally more reliable.
  - **Location**: Providers closer to the user's location should be preferred.
  - **Service Type**: Ensure the provider offers the requested service type.

  Location: {{{location}}}
  Service Type: {{{serviceType}}}

  Return a JSON array of service providers with providerId, name, rating, bookingFrequency and profileDescription.
  The array should contain at most 5 service providers.
  Ensure you fill out all the fields, and that the providerId is a UUID.
  Ensure the rating is a number between 1 and 5.
  Ensure the bookingFrequency is a positive number.
  Ensure the profileDescription is a short summary of the provider's experience and services offered.
  The recommendation should be based on content based recommendations algorithm and service type, location, rating and booking frequency features.
  `,
});

const mlPoweredServiceRecommendationsFlow = ai.defineFlow(
  {
    name: 'mlPoweredServiceRecommendationsFlow',
    inputSchema: MLPoweredServiceRecommendationsInputSchema,
    outputSchema: MLPoweredServiceRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await mlPoweredServiceRecommendationsPrompt(input);
    return output!;
  }
);
