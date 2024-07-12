import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/themoviedbApi";
import styles from './MovieSection.module.css';

function MovieSection() {
    const [popMovies, setPopMovies] = useState([]);
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
    

    const onclickMovie = (id) => {
        console.log(id);
        alert(id);
    }

    return (
        <div className={styles.movieContainer}>
            <h2>Popular Movies</h2>
            <ul>
                {popMovies.map(movie => (
                    <img key={movie.id} onClick={() => onclickMovie(movie.id)} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                ))}
            </ul>
        </div>
    );
}

export default MovieSection;