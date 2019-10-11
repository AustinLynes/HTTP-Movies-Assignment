import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";
const Movie = props => {

  const [movie, setMovie] = useState(null)
  const { movies, match } = props
  const _id = match.params.id
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match,movies])


  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleClick = e => {
    e.preventDefault()
    if (e.target.className === 'far fa-save') {
      const addToSavedList = props.addToSavedList
      addToSavedList(movie)
    }
    else if (e.target.className === 'far fa-edit') {
      props.history.push(`/update-movie/${movie.id}`)
    }
    else if (e.target.className === 'far fa-trash-alt') {
      axios
        .delete(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
          // console.log('movies:: ', movies)
          const arr = movies.filter(movie => `${movie.id}` !== _id);
          // console.log('arr::', arr)
           props.updateMovies(arr)

          // return `${movie.id}` === _id;
          // console.log(res.data)
          // console.log('REMOVED ITEM::', removedItem)
          props.history.push('/')
        })
        .catch(err => console.log(err))
    }
  };

  if (!movie) {
    return <div>No movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard {...props} movie={movie} handleClick={handleClick} />
      <div name='save' className="button" onClick={handleClick}>
        <i className='far fa-save' />
      </div>
      <div className="button" onClick={handleClick}>
        <i className='far fa-edit' />
      </div>
      <div className="button" onClick={handleClick}>
        <i className='far fa-trash-alt' />
      </div>
    </div>
  );
}


export default Movie