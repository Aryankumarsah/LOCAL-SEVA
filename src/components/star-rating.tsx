'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useId } from 'react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

export function StarRating({ rating, totalStars = 5, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1 > 0;
  const emptyStars = totalStars - fullStars - (partialStar ? 1 : 0);
  
  const id = useId();
  const partialFillId = `grad-${id}`;
  const partialPercentage = Math.round((rating % 1) * 100);

  return (
    <div className={cn('flex items-center', className)}>
      {partialStar && (
         <svg width="0" height="0">
           <defs>
             <linearGradient id={partialFillId} x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
               <stop offset={`${partialPercentage}%`} style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
               <stop offset={`${partialPercentage}%`} style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
               <stop offset="100%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
             </linearGradient>
           </defs>
         </svg>
      )}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-primary fill-primary" />
      ))}
      {partialStar && (
        <Star key="partial" className="w-4 h-4" style={{ fill: `url(#${partialFillId})`, color: 'hsl(var(--border))' }} />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted fill-muted" />
      ))}
    </div>
  );
}
