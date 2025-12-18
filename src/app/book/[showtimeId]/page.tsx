
import { notFound } from 'next/navigation';
import { getShowtimeById, getMovieById, getTheaterById } from '@/lib/data';
import { Clock, Film, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import SeatSelection from '@/components/booking/seat-selection';

type BookingPageProps = {
  params: {
    showtimeId: string;
  };
};

export default async function BookingPage({ params }: BookingPageProps) {
  const showtime = getShowtimeById(params.showtimeId);
  if (!showtime) {
    notFound();
  }

  const movie = getMovieById(showtime.movieId);
  const theater = getTheaterById(showtime.theaterId);

  if (!movie || !theater) {
    notFound();
  }

  return (
    <div className="container py-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Choose Your Seats</h1>
            <div className="flex items-center gap-x-4 gap-y-2 text-muted-foreground mt-2 flex-wrap">
                <div className="flex items-center gap-2">
                    <Film className="w-4 h-4" />
                    <span>{movie.title}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{theater.name}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(parseInt(showtime.time)), 'PPP')}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{format(new Date(parseInt(showtime.time)), 'p')}</span>
                </div>
            </div>
        </div>

        <SeatSelection showtime={showtime} />
    </div>
  );
}
