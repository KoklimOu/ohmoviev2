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

export const fetchTrendings = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
}

export const fetchSerieDetails = async (tmdbId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const fetchMovieDetails = async (tmdbId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
