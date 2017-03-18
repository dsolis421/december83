import React from 'react';
import ReactDOM from 'react-dom';
/*import express from 'express';
import BodyParser from 'body-parser';
import mongoose from 'mongoose';
import GameRoutes from '../routes/GameRoutes';*/
import App from './App';
import './index.css';

/*const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movie-memory');

app.use(BodyParser.json());
app.use(GameRoutes);
app.use((err, request, response, next) => response.status(500).send('Request error! ' + err));

const PORT = 3001;

app.listen(PORT, err => {
  if (err) {
    return console.log('Listen error! ', err);
  }
  return console.log('Listening on: http://localhost:' + PORT);
});*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
