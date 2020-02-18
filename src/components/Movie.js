import React from 'react';
import DEFAULT_PLACEHOLDER_IMAGE from '../no-image.jpg';

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  return (
    <div className="movie">
      <p>({movie.Year})</p>

      <img width="200" src={poster} alt={`The movie titled: ${movie.Title}`} />

      <h2>{movie.Title}</h2>
    </div>
  );
};

export default Movie;
