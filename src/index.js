import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      flipped: false,
      matched: false
    };
  }

  handleClick(e){
    this.setState({flipped: !this.state.flipped});
  }

  render() {
    var cardValue = this.state.flipped ? this.props.value : '';
    var cardClass = "Card";
    if(this.state.flipped){
        cardClass += " Card--flipped";
    }
    return (
      <div
        className = {cardClass}
        onClick={this.handleClick}
      >
        {cardValue}
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
        <h1 className="game-title">Memory Game</h1>
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
