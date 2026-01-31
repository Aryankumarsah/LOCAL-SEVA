import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Book, User, TrendingUp } from 'lucide-react';
import type { MLPoweredServiceRecommendationsOutput } from '@/ai/flows/ml-powered-service-recommendations';

type Recommendation = MLPoweredServiceRecommendationsOutput['recommendations'][0];

interface ProviderCardProps {
  provider: Recommendation;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const providerImage = PlaceHolderImages.find((img) => img.id === 'provider-avatar');

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {providerImage && (
            <Image
              src={providerImage.imageUrl}
              alt={provider.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={providerImage.imageHint}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-headline">{provider.name}</h3>
          <div className="flex items-center">
            <StarRating rating={provider.rating} />
            <span className="ml-2 text-sm text-muted-foreground">({provider.rating.toFixed(1)})</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 h-10 overflow-hidden">
          {provider.profileDescription}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
                <TrendingUp size={16} className="text-accent-foreground" />
                <span>{provider.bookingFrequency} bookings</span>
            </div>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/provider/${provider.providerId}`}>
              <User className="mr-2" size={16} />
              View Profile
            </Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1">
            <Link href="#">
              <Book className="mr-2" size={16} />
              Book Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
