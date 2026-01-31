import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/logo';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const navLinks = [
    { href: '/search', label: 'Find Services' },
    { href: '#', label: 'For Providers' },
    { href: '/admin', label: 'Admin' },
    { href: '#', label: 'Help' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <AppLogo className="h-8 w-auto" />
          <span className="hidden font-bold sm:inline-block font-headline text-lg">
            LocalSeva Digital
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="#">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="#">Sign Up</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-8">
                     <AppLogo className="h-8 w-auto" />
                     <span className="font-bold font-headline text-lg">LocalSeva Digital</span>
                  </Link>
                  <nav className="flex flex-col space-y-4 text-lg">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col space-y-2">
                     <Button variant="ghost" asChild>
                       <Link href="#">Log In</Link>
                     </Button>
                     <Button asChild>
                       <Link href="#">Sign Up</Link>
                     </Button>
                   </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
