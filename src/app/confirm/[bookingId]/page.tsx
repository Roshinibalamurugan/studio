import { notFound } from 'next/navigation';
import { getBookingById } from '@/lib/actions';
import { getShowtimeById, getMovieById, getTheaterById } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Film, MapPin, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ConfirmationPageProps = {
  params: {
    bookingId: string;
  };
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const booking = await getBookingById(params.bookingId);
  if (!booking) {
    notFound();
  }

  const showtime = getShowtimeById(booking.showtimeId);
  if (!showtime) notFound();

  const movie = getMovieById(showtime.movieId);
  if (!movie) notFound();
  
  const theater = getTheaterById(showtime.theaterId);
  if (!theater) notFound();

  return (
    <div className="container py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold mt-4 font-headline">Booking Confirmed!</CardTitle>
            <CardDescription>Your tickets are booked. Thank you for using CineBook.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="border rounded-lg p-4 space-y-4 bg-secondary/50">
                 <h3 className="font-semibold text-lg">{movie.title}</h3>
                 <div className="text-sm text-muted-foreground space-y-2">
                     <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{theater.name}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(parseInt(showtime.time)), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(parseInt(showtime.time)), 'p')}</span>
                    </div>
                 </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-lg">Your Tickets</h3>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Seats</span>
                    <div className="flex flex-wrap gap-2">
                         {booking.seats.sort((a,b) => `${a.row}${a.number}`.localeCompare(`${b.row}${b.number}`)).map(seat => (
                            <span key={`${seat.row}${seat.number}`} className="font-mono bg-background border rounded-md px-2 py-1 text-sm">{`${seat.row}${seat.number}`}</span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-bold text-lg">${booking.totalPrice.toFixed(2)}</span>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono text-sm">{booking.id}</span>
                </div>
            </div>

            <Button asChild className="w-full" size="lg">
                <Link href="/">Back to Home</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
