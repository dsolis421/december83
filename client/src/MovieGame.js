import React from 'react';
import MovieCard from './MovieCard';
import MatchCount from './MatchCount';

class MovieGame extends React.Component {
  constructor() {
    super();

    this.firstSelection = {};
    this.secondSelection = {};

    this.state = {
      gameReady: false,
      matches: 0,
      gameMovies: [],
      showPoster: false
    }
  }

  componentDidMount() {
    this.setState({
      gameMovies: this.props.gameDeck
    });
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
    console.log("Shuffling game...")
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

  changeShowPoster(id) {
    let changedArray = this.state.gameMovies;
    for(var i in changedArray) {
      if(changedArray[i].id == id) {
        changedArray[i].showPoster = true;
        break;
      }
    }
    console.log('changed array', changedArray);
    return changedArray;
  }

  resetShowPoster(id) {
    let resetArray = this.state.gameMovies;
    for(var i in resetArray) {
      if(resetArray[i].id == id) {
        resetArray[i].showPoster = false;
        break;
      }
    }
    return resetArray;
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
    if(Object.keys(this.firstSelection).length == 0) {
      console.log("trying to set selection one", selection);
      this.firstSelection = selection.poster;
      this.setState({
        gameMovies: this.changeShowPoster(selection.id)
      });
    } else {
      console.log("trying to set selection two", selection);
      this.secondSelection = selection.poster;
      this.setState({
        gameMovies: this.changeShowPoster(selection.id)
      });
      if(this.checkForMatch(this.firstSelection, this.secondSelection)) {
        console.log('selections matched')
        let updatedMatches = this.state.matches;
        updatedMatches += 1;
        this.setState({
          matches: updatedMatches
        });
        console.log("matches", this.state.matches);
        if(this.checkForComplete()) {
          this.runGameOver();
        }
      } else {
        console.log('selections did not match');
      }
      this.firstSelection = {};
      this.secondSelection = {};
    }
  }

  render() {
    return (
      <div id="game-board">
        <div id="game-status">
          <div id='start-game'>Start Game</div>
          <MatchCount matchCount={this.state.matches} />
        </div>
        {this.state.gameMovies.map(card => {
          return (
            <MovieCard key={card.id}
              id={card.id}
              memoryImage={card.poster}
              showPoster={card.showPoster}
              handleSelection={this.setSelection.bind(this)} />
            )
          })
        }
      </div>
    )
  }
}

export default MovieGame;
