import Link from 'next/link';
import { CineBookLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CineBookLogo className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block font-headline">
            CineBook
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">
            <User className="h-5 w-5 mr-2" />
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}
