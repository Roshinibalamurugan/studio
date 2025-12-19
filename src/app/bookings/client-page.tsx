
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { getShowtimeById, getMovieById, getTheaterById } from '@/lib/data';
import type { Booking, Movie, Theater, Showtime } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, MapPin, Calendar, Clock, Ticket, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy } from 'firebase/firestore';

type EnrichedBooking = Booking & {
  movie: Movie | undefined;
  theater: Theater | undefined;
  showtime: Showtime | undefined;
};

export function BookingsClientPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const bookingsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(collection(firestore, 'users', user.uid, 'bookings'), orderBy('bookingTime', 'desc'));
  }, [user, firestore]);

  const { data: bookings, isLoading: areBookingsLoading } = useCollection<Booking>(bookingsQuery);

  const [enrichedBookings, setEnrichedBookings] = useState<EnrichedBooking[]>([]);
  
  useEffect(() => {
    if (bookings) {
      const enriched = bookings.map(booking => {
        const showtime = getShowtimeById(booking.showtimeId);
        const movie = showtime ? getMovieById(showtime.movieId) : undefined;
        const theater = showtime ? getTheaterById(showtime.theaterId) : undefined;
        return { ...booking, movie, theater, showtime };
      });
      setEnrichedBookings(enriched);
    }
  }, [bookings]);
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const isLoading = isUserLoading || areBookingsLoading;

  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">My Bookings</h1>
        <p className="text-muted-foreground mt-2">Here's a list of all your movie tickets.</p>
      </div>

      {enrichedBookings.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Ticket className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <h2 className="mt-6 text-xl font-semibold">No Bookings Yet</h2>
            <p className="mt-2 text-muted-foreground">You haven't booked any tickets. Let's find a movie!</p>
            <Button asChild className="mt-6">
                <Link href="/">Browse Movies</Link>
            </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {enrichedBookings.map((booking) => {
            const showtimeDate = booking.showtime ? new Date(parseInt(booking.showtime.time)) : null;
            return (
            <Card key={booking.id} className="overflow-hidden">
                <div className="grid md:grid-cols-[120px_1fr] lg:grid-cols-[150px_1fr]">
                    <div className="relative h-48 md:h-full">
                        {booking.movie && (
                            <Image
                                src={booking.movie.posterUrl}
                                alt={booking.movie.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 150px"
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl font-headline">{booking.movie?.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1">
                                <MapPin className="w-4 h-4" /> {booking.theater?.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                             <div className="text-sm text-muted-foreground space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{showtimeDate ? format(showtimeDate, 'EEEE, MMMM d, yyyy') : 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{showtimeDate ? format(showtimeDate, 'p') : 'N/A'}</span>
                                </div>
                            </div>
                             <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Seats</span>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.seats.sort((a,b) => `${a.row}${a.number}`.localeCompare(`${b.row}${b.number}`)).map(seat => (
                                            <span key={`${seat.row}${seat.number}`} className="font-mono bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs">{`${seat.row}${seat.number}`}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-semibold">Total Price</span>
                                    <span className="font-bold text-lg text-primary">Rs{booking.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                    <span>Booking ID</span>
                                    <span className="font-mono">{booking.id}</span>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
          )})}
        </div>
      )}
    </div>
  );
}
