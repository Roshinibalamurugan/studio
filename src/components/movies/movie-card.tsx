import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-hover:shadow-primary/20">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3]">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
              data-ai-hint="movie poster"
            />
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm truncate group-hover:text-primary font-headline">{movie.title}</h3>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <p className="text-xs text-muted-foreground">{movie.rating.toFixed(1)}</p>
              </div>
              <Badge variant="secondary" className="text-xs">{movie.genres[0]}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
