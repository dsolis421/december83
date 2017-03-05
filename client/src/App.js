import React, { Component } from 'react';
import PlayArea from './PlayArea';
import './App.css';

class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Movie Memory</h1>
        <h3>Put your memory to the test</h3>
        <PlayArea />
      </div>
    );
  }
}

export default App;
