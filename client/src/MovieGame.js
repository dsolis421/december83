import React from 'react';
import MovieCard from './MovieCard';

class MovieGame extends React.Component {
  constructor() {
    super();

    this.firstSelection = '';
    this.secondSelection = '';

    this.state = {
      gameReady: false,
      matches: 0,
      gameMovies: []
    }
  }

  shuffleArray(arr) {
    //randomly shuffles array, pass the game array here after buildGame
    var workingArray = arr.slice(), shuffledArray = [];
    while (workingArray.length) {
      shuffledArray.push(workingArray.splice(Math.floor(Math.random() * workingArray.length), 1)[0]);
    }
    return shuffledArray;
  }

  startGame() {
    this.setState({
    gameReady: true,
    matches: 0,
    gameMovies: this.shuffleArray(this.props.gameDeck)
    });

  }

  runGameOver() {

  }

  checkForMatch(first, second) {
    if(first == second) {
      return true;
    } else {
      return false;
    }
  }

  checkForComplete() {
    let win = this.state.gameMovies.length / 2;
    if(this.state.matches == win) {
      return true;
    } else {
      return false;
    }
  }

  setSelection(selection) {
    if(!this.firstSelection) {
      this.firstSelection = selection;
      return;
    } else {
      this.secondSelection = selection;
      if(this.checkForMatch(this.firstSelection, this.secondSelection)) {
        this.setState({matches: this.state.matches++});
        //somehow change card state
        if(this.checkForComplete()) {
          this.runGameOver();
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }

  render() {
    return (
      <div id="game-board">
        {this.state.gameMovies.map(card => {
          return <MovieCard key={card.id} memoryImage={card.movie} handleSelection={this.setSelection.bind(this)}/>
          })
        }
      </div>
    )
  }
}

export default MovieGame;
