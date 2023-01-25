import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './Component/MovieList';
import MovieListHeading from './Component/MovieListHeading';
import SearchBox from './Component/SearchBox';
import AddFavourites from './Component/AddFavourites';
import RemoveFavourites from './Component/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=76abffff `;

	const response = await fetch(url);
	const responseJson = await response.json();

	if (responseJson.Search) {
		setMovies(responseJson.Search);
	}
};

const addFavouriteMovie = (movie) => {
	const newFavouriteList = [...favourites, movie];
	setFavourites(newFavouriteList);
};

const removeFavouriteMovie = (movie) => {
	const newFavouriteList = favourites.filter(
		(favourite) => favourite.imdbID !== movie.imdbID
	);

	setFavourites(newFavouriteList);
};

useEffect(() => {
	getMovieRequest(searchValue);
}, [searchValue]);

return (
	<div className='container-fluid movie-app'>
		<div className='row d-flex align-items-center mt-4 mb-4'>
			<MovieListHeading heading='Movies' />
			<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
		</div>
		<div className='row'>
			<MovieList
				movies={movies}
				favouriteComponent={AddFavourites}
				handleFavouritesClick={addFavouriteMovie}
			/>
		</div>
		<div className='row d-flex align-items-center mt-4 mb-4'>
			<MovieListHeading heading='Favourites' />
		</div>
		<div className='row'>
			<MovieList
				movies={favourites}
				handleFavouritesClick={removeFavouriteMovie}
				favouriteComponent={RemoveFavourites}
			/>
		</div>
	</div>
);
};

export default App;