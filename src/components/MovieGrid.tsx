
import React from 'react';
import MovieCard, { Movie } from './MovieCard';
import { cn } from '@/lib/utils';

interface MovieGridProps {
  title?: string;
  movies: Movie[];
  className?: string;
}

const MovieGrid = ({ title, movies, className }: MovieGridProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h2 className="text-2xl font-bold">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
