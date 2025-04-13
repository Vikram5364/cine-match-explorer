
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import GenreFilter from '@/components/GenreFilter';
import { mockMovies, getRecommendedMovies, getTopRatedMovies, genres, getMoviesByGenre } from '@/data/mockMovies';

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const featuredMovie = mockMovies[0];
  const topRatedMovies = getTopRatedMovies(5);
  const recommendedMovies = getRecommendedMovies(10);
  const filteredMovies = getMoviesByGenre(selectedGenre);

  return (
    <div className="min-h-screen bg-cinema-gradient">
      <Navbar />
      
      <main>
        <Hero featuredMovie={featuredMovie} />
        
        <div className="cinema-container pt-8 space-y-12">
          <MovieGrid 
            title="Top Rated" 
            movies={topRatedMovies} 
          />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Explore Movies</h2>
            </div>
            <GenreFilter 
              genres={genres} 
              selectedGenre={selectedGenre} 
              onSelectGenre={setSelectedGenre} 
            />
            <MovieGrid 
              movies={filteredMovies} 
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recommended For You</h2>
            <p className="text-muted-foreground">Based on your preferences</p>
            <MovieGrid 
              movies={recommendedMovies} 
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t border-cinema-light mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="font-heading text-xl font-bold">CineMatch</span>
              <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-cinema-accent transition-colors">About</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-cinema-accent transition-colors">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-cinema-accent transition-colors">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-cinema-accent transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
