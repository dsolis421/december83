import React from 'react';
import MovieCard from './MovieCard';

class MovieGame extends React.Component {
  constructor() {
    super();

    this.firstSelection = '';
    this.secondSelection = '';

    this.state = {
      gameReady: false,
      matches: 0
    }
  }

/*  shuffleArray(arr) {
    //randomly shuffles array, pass the game array here after buildGame
    var workingArray = arr.slice(), shuffledArray = [];
    while (workingArray.length) {
      shuffledArray.push(workingArray.splice(Math.floor(Math.random() * workingArray.length), 1)[0]);
    }
    return shuffledArray;
  }



  startGame() {

  }

  checkForMatch(first, second) {
    if(first == second) {
      return true;
    } else {
      return false;
    }
  }

  checkForComplete() {
    if(this.state.matches == 20) {
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
      if(checkForMatch(this.firstSelection, this.secondSelection)) {
        this.setState({matches: this.state.matches++});
        //somehow change card state
        if(checkForComplete()) {
          runGameOver();
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }*/

  render() {
    return (
      <div id="game-board">
        {this.props.gameDeck.map(card => {
          return <MovieCard key={card} memoryImage={card}/>
          })
        }
      </div>
    )
  }

}

export default MovieGame;
