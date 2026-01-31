'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Wrench, Plug, Stethoscope, SprayCan, Car } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceCategories = [
  { name: 'Plumbers', icon: Wrench, service: 'plumber' },
  { name: 'Electricians', icon: Plug, service: 'electrician' },
  { name: 'Nurses', icon: Stethoscope, service: 'nurse' },
  { name: 'Cleaners', icon: SprayCan, service: 'cleaner' },
  { name: 'Mechanics', icon: Wrench, service: 'mechanic' },
];

export default function Home() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (service && location) {
      router.push(`/search?serviceType=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`);
    }
  };
  
  const handleCategoryClick = (serviceType: string) => {
    setService(serviceType);
    if(location){
      router.push(`/search?serviceType=${encodeURIComponent(serviceType)}&location=${encodeURIComponent(location)}`);
    }
  }

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  return (
    <div className="flex flex-col items-center">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center bg-primary/20">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 p-4 md:p-6 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            Your Local Services, Simplified.
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light">
            Find trusted electricians, plumbers, cleaners, and more, right in your neighborhood.
          </p>
          <Card className="bg-background/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-4">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 items-center">
                <div className="relative flex-1 w-full">
                  <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="What service do you need? e.g. plumber"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full md:w-auto h-12 text-base">
                  <Search className="mr-2" size={20} />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="w-full py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-headline font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Quickly find the right professional for your needs from our popular service categories.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {serviceCategories.map((category) => (
              <Card
                key={category.name}
                onClick={() => handleCategoryClick(category.service)}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card hover:bg-primary/10"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="p-4 bg-primary/20 rounded-full mb-4 transition-colors duration-300 group-hover:bg-accent">
                    <category.icon className="w-8 h-8 text-primary group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/20 rounded-full mb-4">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-headline mb-2">Find Providers</h3>
            <p className="text-muted-foreground">Search for local service providers by category and location with ease.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/20 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m12 14 4-4"/><path d="m18 16 4-4"/><path d="m6 8-4 4 4 4"/><path d="m12 20 4-4"/><path d="m20 12-4-4"/></svg>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-2">Get Recommendations</h3>
            <p className="text-muted-foreground">Our AI provides smart, data-driven recommendations to help you choose.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/20 rounded-full mb-4">
              <Wrench className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-headline mb-2">Book & Relax</h3>
            <p className="text-muted-foreground">Easily book services, manage appointments, and leave reviews.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
