import axios from 'axios';

const TMDB_ACCESS_TOKEN = `${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

export const fetchPopularMovies = async () => {
  try {
    const response = await axiosInstance.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchTrendings = async () => {
  try {
    const response = await axiosInstance.get('/trending/all/day');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchNewMovieReleases = async () => {
  try {
    const response = await axiosInstance.get('/movie/now_playing');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchNewTVShowReleases = async () => {
  try {
    const response = await axiosInstance.get('/tv/on_the_air');
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

export const fetchCombinedNewReleases = async () => {
  try {
    const movies = await fetchNewMovieReleases();
    const tvShows = await fetchNewTVShowReleases();

    // Combine movies and TV shows into a single array
    const combinedResults = [...movies, ...tvShows];

    // Return the first 20 items (or less if there aren't enough)
    return combinedResults.slice(0, 20);
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (tmdbId) => {
  try {
    const response = await axiosInstance.get(`/movie/${tmdbId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSerieDetails = async (tmdbId) => {
  try {
    const response = await axiosInstance.get(`/tv/${tmdbId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
