import { MovieGrid } from "@/components/movies/movie-grid";
import { movies } from "@/lib/data";
import type { Movie } from "@/types";

export default function Home() {
  const allMovies: Movie[] = movies;

  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          Now Showing
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
          Explore the latest blockbusters, timeless classics, and hidden gems. Your next movie adventure starts here.
        </p>
      </div>
      
      <MovieGrid movies={allMovies} />
    </div>
  );
}
