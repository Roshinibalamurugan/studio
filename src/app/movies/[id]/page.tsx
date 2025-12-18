import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovieById, getShowtimesForMovie } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Calendar } from 'lucide-react';
import ShowtimeSelector from '@/components/movies/showtime-selector';

type MoviePageProps = {
  params: {
    id: string;
  };
};

export default function MoviePage({ params }: MoviePageProps) {
  const movie = getMovieById(params.id);

  if (!movie) {
    notFound();
  }

  const today = new Date().toISOString().split('T')[0];
  const showtimes = getShowtimesForMovie(movie.id, today);

  return (
    <>
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={movie.backdropUrl}
          alt={`Backdrop for ${movie.title}`}
          fill
          className="object-cover object-center opacity-30"
          priority
          data-ai-hint="cinematic landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      <div className="container relative -mt-[30vh] pb-16">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-primary/10 -mt-[10vh] md:-mt-[20vh]">
              <Image
                src={movie.posterUrl}
                alt={`Poster for ${movie.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 30vw"
                data-ai-hint="movie poster"
              />
            </div>
          </div>
          <div className="md:col-span-2 pt-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight font-headline">{movie.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{movie.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{movie.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{movie.runtime} min</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{movie.releaseDate}</span>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="outline">{genre}</Badge>
              ))}
            </div>
            <h2 className="mt-8 text-2xl font-semibold border-b pb-2 font-headline">Synopsis</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{movie.overview}</p>
             <h2 className="mt-8 text-2xl font-semibold border-b pb-2 font-headline">Cast</h2>
            <p className="mt-4 text-muted-foreground">{movie.cast.join(', ')}</p>
          </div>
        </div>
        
        <ShowtimeSelector showtimes={showtimes} />
      </div>
    </>
  );
}
