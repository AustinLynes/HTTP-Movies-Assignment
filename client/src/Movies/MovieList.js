import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export const MovieList = (props) => {
  const {movies} = props
  console.log('MOVIES', movies)
  return (
    <div className="movie-list">
      {movies.length > 0 ? movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      )): ''}
    </div>
  );
}
export default MovieList

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
