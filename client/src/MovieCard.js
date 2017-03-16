import React from 'react';

class MovieCard extends React.Component {
  constructor() {
    super();

    this.state = {
      clickable: true
    }
  }

  clickMovie() {
    console.log('clicked movie');
    if(this.state.clickable) {
      this.props.handleSelection({id: this.props.id, poster: this.props.memoryImage});
    } else {
      return;
    }
  }

  resetMovie() {
    this.setState({
      showPoster: false
    });
  }

  render() {
    return (
      <div className='movie-card' onClick={() => this.clickMovie()}>
        {this.props.showPoster ? <img src={this.props.memoryImage} /> : null}
      </div>
    )
  }
}

export default MovieCard;
