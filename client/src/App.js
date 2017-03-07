import React, { Component } from 'react';
import PlayArea from './PlayArea';
import MovieMenu from './MovieMenu';
import './App.css';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <MovieMenu />  
        <PlayArea />
      </div>
    );
  }
}

export default App;
