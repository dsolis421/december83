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
        <PlayArea />
      </div>
    );
  }
}

export default App;
