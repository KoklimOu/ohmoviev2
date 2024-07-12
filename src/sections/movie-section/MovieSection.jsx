import { useEffect, useState } from "react";
import { fetchPopularMovies, fetchTrendings, fetchSerieDetails, fetchMovieDetails } from "../../services/themoviedbApi";
import styles from './MovieSection.module.css';

function MovieSection() {
    const [popMovies, setPopMovies] = useState([]);
    const [trendings, setTrendings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const popMovies = await fetchPopularMovies();
                setPopMovies(popMovies);
                
            } catch (error) {
                setError(error);                
            };
        }
        fetchMovies();
    }, []);

    useEffect(() => {
        const getTrendings = async () => {
            try {
                const trendings = await fetchTrendings();
                setTrendings(trendings);
                
            } catch (error) {
                setError(error);                
            };
        }
        getTrendings();
    }, []);
    

    const fetchMovieDetailById = async (tmdbId) => {
        const data = await fetchMovieDetails(tmdbId);
        console.log(data);
    }

    const fetchSerieDetailById = async (tmdbId) => {
        const data = await fetchSerieDetails(tmdbId);
        console.log(data);
    }

    const onclickCard = async (tmdbId, mediaType) => {
    
        try {
            if (mediaType === 'movie') {
                const response = await fetchMovieDetailById(tmdbId);
            } else {
                const response = await fetchSerieDetailById(tmdbId);
            }
        } catch (error) {
            console.error(`Error fetching details: ${error}`);
        }
    };

    return (
        <>
            <div className={styles.movieContainer}>
                {popMovies.length > 0 && (
                    <div className={styles.firstItem} onClick={() => onclickCard(popMovies[0].id, popMovies[0].media_type)}>
                        <img src={`https://image.tmdb.org/t/p/original${popMovies[0].backdrop_path}`} alt={popMovies[0].title} />
                        <div className={styles.overlayText}>
                            <h1>{popMovies[0].name}</h1>
                            <p>{popMovies[0].overview}</p>
                        </div>
                    </div>
                )}
                
                <h2>Popular Movies</h2>

                <ul className={styles.moviesGrid}>
                    {popMovies.slice(1).map(movie => (
                        <img
                            key={movie.id}
                            onClick={() => onclickCard(movie.id, movie.media_type)}
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    ))}
                </ul>

            </div>


            <div className={styles.movieContainer}>
                {trendings.length > 0 && (
                    <div className={styles.firstItem} onClick={() => onclickCard(trendings[0].id, trendings[0].media_type)}>
                        <img src={`https://image.tmdb.org/t/p/original${trendings[0].backdrop_path}`} alt={trendings[0].title} />
                        <div className={styles.overlayText}>
                            <h1>{trendings[0].title}</h1>
                            <p>{trendings[0].overview}</p>
                        </div>
                    </div>
                )}
                
                <h2>Trending Now</h2>

                <ul className={styles.moviesGrid}>
                    {trendings.slice(1).map(trending => (
                        <img
                            key={trending.id}
                            onClick={() => onclickCard(trending.id, trending.media_type)}
                            src={`https://image.tmdb.org/t/p/original${trending.backdrop_path}`}
                            alt={trending.title}
                        />
                    ))}
                </ul>

            </div>
        </>
    );
}

export default MovieSection;