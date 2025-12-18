'use client';

import Link from 'next/link';
import { CineBookLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { User, LogOut, Ticket } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export function Header() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  const handleLogout = () => {
    signOut(auth);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

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
          {isUserLoading ? (
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || 'Welcome'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/bookings">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost">
              <Link href="/login">
                <User className="h-5 w-5 mr-2" />
                Log In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
