'use client';

import { useState, useMemo } from 'react';
import type { Movie } from '@/types';
import { Input } from '@/components/ui/input';
import { MovieCard } from './movie-card';
import { Search } from 'lucide-react';

type MovieGridProps = {
  movies: Movie[];
};

export function MovieGrid({ movies }: MovieGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => 
    movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [searchTerm, movies]);

  return (
    <div>
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Search movies"
          placeholder="Search movies, genres, actors..."
          className="pl-10 h-12 text-base md:text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
            <p className="text-xl font-medium">No movies found.</p>
            <p>Try a different search term or check back later.</p>
        </div>
      )}
    </div>
  );
}
