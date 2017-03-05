import React from 'react';
import MovieCard from './MovieCard';
import MovieSearchBar from './MovieSearchBar';
import MovieSearchResults from './MovieSearchResults';
import axios from 'axios';

class PlayArea extends React.Component {
  constructor() {
    super();

    this.game = [];

    this.state = {
      movies: [],
      searchText: '',
      searchResult: [],
      showResults: false
    };
  }

  captureSearch(event) {
    this.setState({
      searchText: event.target.value
    });
  }

  goSearch(search) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f092d5754221ae7340670fea92139433&language=en-US&query=${search}&page=1&include_adult=false`)
    .then(resp => {
      const RESULT = resp.data.results.map(resultMovie => {
        return (
          {
            id: resultMovie.id,
            title: resultMovie.title,
            poster_path: 'https://image.tmdb.org/t/p/w154' + resultMovie.poster_path,
            release_date: this.formatDate(resultMovie.release_date)
          }
        )
      });
      this.setState({
        searchResult: RESULT,
        showResults: true
      });
      console.log(this.state.searchResult);
    })
    .catch(err => {
        console.log(`Error! ${err}`)
    });
  }

  addMovieToGame(movie) {
    this.game.push(movie);
    console.log("move = " + movie);
    console.log("game = " + this.game);
    this.setState({
      movies: this.game
    });
    console.log(this.state.movies);
  }

  formatDate(date) {
    let arrDate = date.split('-');
    return arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
  }

  render() {
    return (
      <div id="play-area">
        <h2>Create your game...</h2>
        <MovieSearchBar
          captureSearch={this.captureSearch.bind(this)}
          goSearch={this.goSearch.bind(this)}
          value={this.state.searchText}/>
        {this.state.showResults ? <MovieSearchResults searchResult={this.state.searchResult}
          addMovie={this.addMovieToGame.bind(this)}/> : null}
      </div>
    )
  }
}

export default PlayArea;
