import React from 'react';

const MovieSearchBar = props => {
    return (
      <div>
        <h2>Create your game...</h2>
        <input type="text"
          placeholder="Search by title..."
          value={props.value}
          onChange={event => props.captureSearch(event)}></input>
        <div id="send-search" onClick={value => props.goSearch(props.value)}>
          <span className="fa fa-search"></span>
        </div>
        <div id='load-game' onClick={() => props.buildGame()}>Load Game</div>
      </div>
    )
}

export default MovieSearchBar;
