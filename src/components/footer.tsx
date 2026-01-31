import Link from 'next/link';
import { AppLogo } from '@/components/logo';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <AppLogo className="h-8 w-auto" />
            <span className="ml-2 text-lg font-headline">LocalSeva Digital</span>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 md:mb-0">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/search" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/admin" className="hover:text-primary transition-colors">Admin</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LocalSeva. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
