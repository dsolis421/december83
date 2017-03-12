import React from 'react';

class MovieCard extends React.Component {
  constructor() {
    super();

    this.state = {
      background: 'black',
      clickable: true,
      showPoster: true
    }
  }

  clickMovie() {
    if(this.state.clickable) {
      this.setState({
        showPoster: true
      });
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
      <div>
        {this.state.showPoster ? <img src={this.props.memoryImage}
        onClick={() => this.clickMovie}/> : null}
      </div>
    )
  }
}

export default MovieCard;
