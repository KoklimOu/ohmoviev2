import { useEffect, useState } from "react";
import { 
    fetchPopularMovies, 
    fetchTrendings, 
    fetchSerieDetails, 
    fetchMovieDetails, 
    fetchCombinedNewReleases, 
    fetchAnimeContent,
    fetchKoreanContent,
    fetchMoviesByGenre } from "../../services/themoviedbApi";
import styles from './MovieSection.module.css';
import { MOVIE_GENRES } from "../../utils/genre";

function MovieSection() {
    const [sections, setSections] = useState([
        { title: 'Anime', data: [], fetchFunction: fetchAnimeContent, params: [] },
        { title: 'K-drama', data: [], fetchFunction: fetchKoreanContent, params: [] },
        { title: 'Popular Movies', data: [], fetchFunction: fetchPopularMovies, params: [] },
        { title: 'Trending Now', data: [], fetchFunction: fetchTrendings, params: [] },
        { title: 'New Releases', data: [], fetchFunction: fetchCombinedNewReleases, params: [] },
        { title: 'Action', data: [], fetchFunction: fetchMoviesByGenre, params: [MOVIE_GENRES.Action] },
        { title: 'Comedy', data: [], fetchFunction: fetchMoviesByGenre, params: [MOVIE_GENRES.Comedy] },
        { title: 'Drama', data: [], fetchFunction: fetchMoviesByGenre, params: [MOVIE_GENRES.Drama] },
        { title: 'War', data: [], fetchFunction: fetchMoviesByGenre, params: [MOVIE_GENRES.War] },
        { title: 'Horror', data: [], fetchFunction: fetchMoviesByGenre, params: [MOVIE_GENRES.Horror] },
    ]);
    const [error, setError] = useState(null);

    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    useEffect(() => {
        const fetchDataForSection = async (section) => {
            try {
                const data = await section.fetchFunction(...section.params);
                const randomAmount = getRandomNumber(16, 20);
                const limitedData = data.slice(0, randomAmount);

                setSections(prevSections => prevSections.map(prevSection => {
                    if (prevSection.title === section.title) {
                        return { ...prevSection, data: limitedData };
                    }
                    return prevSection;
                }));
            } catch (error) {
                setError(error);
            }
        };

        sections.forEach(section => {
            if (section.data.length === 0) {
                fetchDataForSection(section);
            }
        });
    }, [sections]);

    const fetchDetailById = async (tmdbId, mediaType) => {
        try {
            if (mediaType === 'movie') {
                const response = await fetchMovieDetails(tmdbId);
                console.log(response);
            } else {
                const response = await fetchSerieDetails(tmdbId);
                console.log(response);
            }
        } catch (error) {
            console.error(`Error fetching details: ${error}`);
        }
    };

    const onClickCard = (tmdbId, mediaType) => {
        alert(`Media type: ${mediaType} ID: ${tmdbId}`)
        fetchDetailById(tmdbId, mediaType);
    };

    const renderSection = (section, index) => (
        <div key={section.title} className={styles.movieContainer}>
    
            <h2>{section.title}</h2>
    
            <ul className={styles.moviesGrid}>
                {section.data.map(item => (
                    <img
                        key={item.id}
                        onClick={() => onClickCard(item.id, item.media_type)}
                        src={`https://image.tmdb.org/t/p/w400${item.backdrop_path}`}
                        alt={item.title || item.name}
                    />
                ))}
            </ul>

            <div className="sectionSeparator"></div>
    
        </div>
    );
    
    return (
        <>
            {sections.map((section, index) => renderSection(section, index))}
        </>
    );
    
    
}

export default MovieSection;
