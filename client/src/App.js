import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/UpdateForm";
import AddForm from './Movies/AddForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([])
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));

  }, [])

  if (!movies.length) {
    return (<>
      <SavedList list={savedList} />
      <h1>No Movies to Display Please Add some</h1>
    </>)
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" render={
        props => {
          return <MovieList {...props} movies={movies} />
        }

      } />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} movies={movies} updateMovies={setMovies} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateForm {...props} movies={movies} updateMovies={setMovies} />;
        }}
      />
       <Route
        path="/add-movie"
        render={props => {
          return <AddForm {...props} movies={movies} updateMovies={setMovies} />;
        }}
      />
    </>
  );
};

export default App;
