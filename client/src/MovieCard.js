import React from 'react';

class MovieCard extends React.Component {
  constructor() {
    super();

    this.state = {
      background: 'black',
      showPoster: true
    }
  }

  render() {
    return (
      <div>
        {this.state.showPoster ? <img src={this.props.memoryImage} /> : null}
      </div>
    )
  }

}



export default MovieCard;
