import { getMLPoweredServiceRecommendations } from '@/ai/flows/ml-powered-service-recommendations';
import { ProviderCard } from '@/components/provider-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: {
    serviceType?: string;
    location?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { serviceType, location } = searchParams;

  if (!serviceType || !location) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
         <div className="max-w-md mx-auto">
            <Alert>
              <Search className="h-4 w-4" />
              <AlertTitle>Incomplete Search</AlertTitle>
              <AlertDescription>
                Please provide both a service and a location to find providers.
                <Link href="/" className="font-bold underline ml-2">Go back</Link>
              </AlertDescription>
            </Alert>
        </div>
      </div>
    );
  }

  const { recommendations } = await getMLPoweredServiceRecommendations({
    serviceType,
    location,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-2">
        Recommendations for <span className="text-primary">{serviceType}</span>
      </h1>
      <p className="text-muted-foreground mb-8">
        Showing results near <span className="font-semibold">{location}</span>
      </p>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendations.map((provider) => (
            <ProviderCard key={provider.providerId} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No providers found for your search.</p>
        </div>
      )}
    </div>
  );
}
