import { useEffect, useState } from "react";
import { 
    fetchPopularMovies, 
    fetchTrendings, 
    fetchSerieDetails, 
    fetchMovieDetails, 
    fetchCombinedNewReleases, 
    fetchActionMovies,
    fetchAnimeContent } from "../../services/themoviedbApi";
import styles from './MovieSection.module.css';

function MovieSection() {
    const [sections, setSections] = useState([
        { title: 'Popular Movies', data: [], fetchFunction: fetchPopularMovies },
        { title: 'Trending Now', data: [], fetchFunction: fetchTrendings },
        { title: 'New Releases', data: [], fetchFunction: fetchCombinedNewReleases},
        { title: 'Action', data: [], fetchFunction: fetchActionMovies },
        { title: 'Anime', data: [], fetchFunction: fetchAnimeContent }
    ]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataForSection = async (section) => {
            try {
                const data = await section.fetchFunction();
                setSections(prevSections => prevSections.map(prevSection => {
                    if (prevSection.title === section.title) {
                        return { ...prevSection, data: data };
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

    const renderSection = (section) => (
        <div key={section.title} className={styles.movieContainer}>
            {section.data.length > 0 && (
                <div className={styles.firstItem} onClick={() => onClickCard(section.data[0].id, section.data[0].media_type)}>
                    <img src={`https://image.tmdb.org/t/p/original${section.data[0].backdrop_path}`} alt={section.data[0].title || section.data[0].name} />
                    <div className={styles.overlayText}>
                        <h1>{section.data[0].title || section.data[0].name}</h1>
                        <p>{section.data[0].overview}</p>
                    </div>
                </div>
            )}

            <h2>{section.title}</h2>

            <ul className={styles.moviesGrid}>
                {section.data.slice(1).map(item => (
                    <img
                        key={item.id}
                        onClick={() => onClickCard(item.id, item.media_type)}
                        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                        alt={item.title || item.name}
                    />
                ))}
            </ul>
        </div>
    );

    return (
        <>
            {sections.map(section => renderSection(section))}
        </>
    );
}

export default MovieSection;
