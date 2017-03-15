import React from 'react';

class MovieCard extends React.Component {
  constructor() {
    super();

    this.state = {
      clickable: true,
      showThisPoster: false
    }
  }

  clickMovie() {
    console.log('clicked movie');
    if(this.state.clickable) {
      this.props.handleSelection(this.props.memoryImage);
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
        {this.props.showThisPoster ? <img src={this.props.memoryImage} /> : null}
      </div>
    )
  }
}

export default MovieCard;
