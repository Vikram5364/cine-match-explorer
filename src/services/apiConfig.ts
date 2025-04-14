
// This file would be replaced with real MongoDB connection details in a production app
// For frontend-only apps, we would use a MongoDB API service like MongoDB Atlas Data API

const API_BASE_URL = "https://ap-api.example.com"; // Placeholder for MongoDB API endpoint

export const API_ENDPOINTS = {
  movies: `${API_BASE_URL}/movies`,
  recommendations: `${API_BASE_URL}/recommendations`,
  users: `${API_BASE_URL}/users`,
  ratings: `${API_BASE_URL}/ratings`,
};

export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "An error occurred while fetching data");
  }
  return response.json();
};
