import React, { useEffect, useState } from "react";
import styles from './VidSrcCard.module.css';
import { fetchPopularMovies } from "../../services/themoviedbApi";

const VidSrcCard = ({ movie, lang='en' }) => {
    return (
      <li key={movie.id} className={styles.vidSrcCard}>
        <a href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=${lang}`}>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
        </a>
      </li>
    );
  };

export default VidSrcCard;