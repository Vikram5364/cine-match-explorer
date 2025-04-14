
import { Movie } from '@/components/MovieCard';
import { API_ENDPOINTS, handleApiResponse } from './apiConfig';
import { mockMovies, getRecommendedMovies, getTopRatedMovies, getMoviesByGenre } from '@/data/mockMovies';

// Flag to determine whether to use mock data or real API
// In a real implementation, this would be controlled by environment variables
const USE_MOCK_DATA = true;

// Fetch all movies
export const fetchMovies = async (): Promise<Movie[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => resolve(mockMovies), 800);
    });
  }
  
  const response = await fetch(API_ENDPOINTS.movies);
  return handleApiResponse(response);
};

// Fetch movies by genre
export const fetchMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => resolve(getMoviesByGenre(genre)), 800);
    });
  }
  
  const response = await fetch(`${API_ENDPOINTS.movies}?genre=${encodeURIComponent(genre)}`);
  return handleApiResponse(response);
};

// Fetch movie by ID
export const fetchMovieById = async (id: string): Promise<Movie> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movie = mockMovies.find(m => m.id === id);
        if (movie) {
          resolve(movie);
        } else {
          reject(new Error('Movie not found'));
        }
      }, 800);
    });
  }
  
  const response = await fetch(`${API_ENDPOINTS.movies}/${id}`);
  return handleApiResponse(response);
};

// Fetch recommended movies
export const fetchRecommendedMovies = async (count: number = 10): Promise<Movie[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getRecommendedMovies(count)), 800);
    });
  }
  
  const response = await fetch(`${API_ENDPOINTS.recommendations}?count=${count}`);
  return handleApiResponse(response);
};

// Fetch top rated movies
export const fetchTopRatedMovies = async (count: number = 5): Promise<Movie[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getTopRatedMovies(count)), 800);
    });
  }
  
  const response = await fetch(`${API_ENDPOINTS.movies}/top-rated?count=${count}`);
  return handleApiResponse(response);
};

// Rate a movie
export const rateMovie = async (movieId: string, rating: number): Promise<void> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      console.log(`Rating movie ${movieId} with ${rating} stars`);
      setTimeout(resolve, 800);
    });
  }
  
  const response = await fetch(`${API_ENDPOINTS.ratings}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId, rating }),
  });
  
  return handleApiResponse(response);
};
