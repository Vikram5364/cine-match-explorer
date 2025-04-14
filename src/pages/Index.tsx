
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import GenreFilter from '@/components/GenreFilter';
import { fetchTopRatedMovies, fetchRecommendedMovies, fetchMoviesByGenre } from '@/services/movieService';
import { genres } from '@/data/mockMovies';
import { Movie } from '@/components/MovieCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [topRated, recommended] = await Promise.all([
          fetchTopRatedMovies(5),
          fetchRecommendedMovies(10)
        ]);
        
        setTopRatedMovies(topRated);
        setRecommendedMovies(recommended);
        
        // Set the first top-rated movie as the featured movie
        if (topRated.length > 0) {
          setFeaturedMovie(topRated[0]);
        }
        
        // Load filtered movies based on selected genre
        const filtered = await fetchMoviesByGenre(selectedGenre);
        setFilteredMovies(filtered);
        
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Failed to load movies",
          description: "Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);
  
  // Update filtered movies when genre changes
  useEffect(() => {
    const loadFilteredMovies = async () => {
      try {
        const filtered = await fetchMoviesByGenre(selectedGenre);
        setFilteredMovies(filtered);
      } catch (error) {
        console.error('Error loading filtered movies:', error);
      }
    };
    
    loadFilteredMovies();
  }, [selectedGenre]);

  if (loading || !featuredMovie) {
    return (
      <div className="min-h-screen bg-cinema-gradient">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin h-12 w-12 border-4 border-cinema-accent border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

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
