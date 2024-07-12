import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/themoviedbApi";
import VidSrcCard from "../../components/MovieCard/VidSrcCard";
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
    
    return (
        <div>
            <ul>
            {popMovies.map(movie => (
                <VidSrcCard key={movie.id} movie={movie}/>
            ))}
            </ul>
        </div>
    );
}

export default MovieSection;