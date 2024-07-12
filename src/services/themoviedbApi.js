const TMDB_API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};
