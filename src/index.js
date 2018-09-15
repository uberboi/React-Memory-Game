import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      flipped: false,
      matched: false
    };
  }

  handleClick(e){
    var flipped = this.state.flipped;
    this.setState({flipped: !flipped});
  }

  render() {
    return (
      <div className="Card">
        {this.props.value}
      </div>
    );
  }
}

class Game extends React.Component {
  /*
  constructor(props){
    super(props);
    this.renderCards = this.renderCards.bind(this);
  }
  */
  renderCards(cardVals){
    return cardVals.map((cardVal, index) => {
      return (
        <Card key={index} value={cardVal} />
      );
    });
  }

  render() {
    var cards = [5, 2, 4, 1, 1, 3, 4, 2, 3, 5];
    return (
      <div className="game">
        <div>Memory Game</div>
        <div className="game-board">
          {this.renderCards(cards)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
