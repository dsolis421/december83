import React from 'react';
import MovieCard from './MovieCard';
import GameScore from './GameScore';
import GameMessage from './GameMessage';

class MovieGame extends React.Component {
  constructor() {
    super();

    this.firstSelection = {};
    this.secondSelection = {};
    this.runningMatches = 0;
    this.runningScore = 0;
    this.priorMatch = false;
    this.multiplier = 1;
    this.threeGuesses = 0;

    this.state = {
      gameReady: true,
      gameMessage: '',
      gameScore: 0,
      gameMovies: [],
      gameStatus: 'pending'
    }
  }

  componentDidMount() {
    this.setState({
      gameMovies: this.shuffleArray(this.props.gameDeck),
      gameMessage: 'You get 3 free guesses'
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
    if(this.state.gameStatus !== 'pending') {
      let restartArray = this.shuffleArray(this.state.gameMovies)
      .map(movie => {
        return ({
          id: movie.id,
          poster: movie.poster,
          showPoster: false,
          clickable: true,
          matched: false
        });
      });
      console.log("Restarting game...");
      this.threeGuesses = 0;
      this.setState({
        gameMovies: restartArray,
        gameStatus: 'pending',
        gameMessage: 'You get 3 free guesses'
      });
    } else {
      console.log("Starting game...");
      let startArray = this.state.gameMovies.map(movie => {
        return ({
          id: movie.id,
          poster: movie.poster,
          showPoster: false,
          clickable: true,
          matched: false
        });
      });
      this.setState({
      gameMovies: startArray,
      gameStatus: 'inprogress',
      gameMessage: 'Match identical posters to score'
      });
    }
    this.firstSelection = {};
    this.secondSelection = {};
    this.runningMatches = 0;
    this.runningScore = 0;
    this.setState({
    gameReady: true,
    gameScore: 0
    });
  }

  runThreeGuesses(selection) {
    console.log('running three guesses');
    this.threeGuesses += 1;
    let guessArray = this.updateMovieCard(selection.id, 'showPoster', true);
    guessArray = this.updateMovieCard(selection.id, 'clickable', false);
    this.setState({
      gameMovies: guessArray
    });
    if (this.threeGuesses === 3) {
      console.log('guesses are done');
      this.setState({
        gameReady: false,
        gameMessage: 'Click Start Game'
      });
    }
  }

  runGameOver() {
    console.log('running game over...');
    this.setState({
      gameReady: false,
      gameStatus: 'complete',
      gameMessage: `You did it!  Game complete.  Memory Index: ${Math.round((this.runningScore / this.runningMatches) * 100) / 100}`
    });
  }

  checkForMatch(first, second) {
    if(first === second) {
      return true;
    } else {
      return false;
    }
  }

  updateMovieCard(id, key, value) {
    let updatedArray = this.state.gameMovies;
    for(var i in updatedArray) {
      if(updatedArray[i].id === id) {
        updatedArray[i][key] = value;
        break;
      }
    }
    return updatedArray;
  }

  checkForComplete() {
    const WIN = this.state.gameMovies.length / 2;
    console.log('checking for complete', WIN, this.runningMatches);
    if(this.runningMatches === WIN) {
      console.log('check found game complete');
      return true;
    } else {
      console.log('check did not find game complete');
      return false;
    }
  }

  runSelection(selection) {
    if(Object.keys(this.firstSelection).length == 0) {
      this.firstSelection = selection;
      let firstArray = this.updateMovieCard(selection.id, 'showPoster', true);
      firstArray = this.updateMovieCard(selection.id, 'clickable', false);
      this.setState({
        gameMovies: firstArray
      });
    } else {
      this.secondSelection = selection;
      let secondArray = this.updateMovieCard(selection.id, 'showPoster', true);
      secondArray = this.updateMovieCard(selection.id, 'clickable', false);
      let updatedGuesses = this.state.guesses;
      updatedGuesses += 1;
      this.setState({
        gameMovies: secondArray,
        gameReady: false
      });
      if(this.checkForMatch(this.firstSelection.poster, this.secondSelection.poster)) {
        console.log('selections matched, updating game...');
        this.setState({
          gameMessage: 'MATCH!'
        });
        this.runningMatches += 1;
        if(this.priorMatch) {
          this.multiplier += 1;
        }
        this.runningScore = this.runningScore + (this.multiplier * 25);
        this.priorMatch = true;
        if(this.checkForComplete()) {
          let finalArray = this.updateMovieCard(this.firstSelection.id, 'matched', true);
          finalArray = this.updateMovieCard(this.firstSelection.id, 'showPoster', false);
          finalArray = this.updateMovieCard(this.secondSelection.id, 'matched', true);
          finalArray = this.updateMovieCard(this.secondSelection.id, 'showPoster', false);
          this.setState({
            gameScore: this.runningScore,
            gameMovies: finalArray
          });
          this.runGameOver();
        } else {
          setTimeout(function(){
            let matchedArray = this.updateMovieCard(this.firstSelection.id, 'matched', true);
            matchedArray = this.updateMovieCard(this.firstSelection.id, 'showPoster', false);
            matchedArray = this.updateMovieCard(this.secondSelection.id, 'matched', true);
            matchedArray = this.updateMovieCard(this.secondSelection.id, 'showPoster', false);
            this.setState({
              gameScore: this.runningScore,
              gameMovies: matchedArray,
              gameMessage: 'Match identical posters to score',
              gameReady: true
            });
            this.firstSelection = {};
            this.secondSelection = {};
          }.bind(this), 1000);
        }
      } else {
        console.log('selections did not match, resetting...');
        setTimeout(function(){
          let resetArray = this.updateMovieCard(this.firstSelection.id, 'showPoster', false);
          resetArray = this.updateMovieCard(this.firstSelection.id, 'clickable', true);
          resetArray = this.updateMovieCard(this.secondSelection.id, 'showPoster', false);
          resetArray = this.updateMovieCard(this.secondSelection.id, 'clickable', true);
          this.firstSelection = {};
          this.secondSelection = {};
          this.multiplier = 1;
          this.priorMatch = false;
          this.setState({
            gameMovies: resetArray,
            gameReady: true
          });
        }.bind(this), 2000);
      }
    }
  }

  render() {
    return (
      <div id="game-board">
        <div id="game-status">
          {this.state.gameStatus === 'pending' ? <div id='start-game' onClick={() => this.startGame()}>Start Game</div> :
            <div id='start-game' onClick={() => this.startGame()}>Restart Game</div>}
          <GameMessage message={this.state.gameMessage} />
          <GameScore gameScore={this.state.gameScore} gameStatus={this.state.gameStatus}/>
        </div>
        {this.state.gameMovies.map(card => {
          return (
            <MovieCard key={card.id}
              id={card.id}
              memoryImage={card.poster}
              showPoster={card.showPoster}
              clickable={card.clickable}
              matched={card.matched}
              handleSelection={this.state.gameStatus === 'inprogress' ? this.runSelection.bind(this) : this.runThreeGuesses.bind(this)}
              gameReady={this.state.gameReady} />
            )
          })
        }
      </div>
    )
  }
}

export default MovieGame;
