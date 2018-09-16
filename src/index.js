import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {

  render() {
    var cardValue = this.props.flipped ? this.props.value : '';
    var cardClass = "Card";
    if(this.props.flipped){
        cardClass += " Card--flipped";
    }
    return (
      <div
        className = {cardClass}
        onClick={() => this.props.onClick(this.props.id)}
      >
        {cardValue}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.renderCards = this.renderCards.bind(this);

    this.state = {
      cards: [
        {value : 5, matched : false, flipped : false},
        {value : 2, matched : false, flipped : false},
        {value : 4, matched : false, flipped : false},
        {value : 1, matched : false, flipped : false},
        {value : 1, matched : false, flipped : false},
        {value : 3, matched : false, flipped : false},
        {value : 4, matched : false, flipped : false},
        {value : 2, matched : false, flipped : false},
        {value : 3, matched : false, flipped : false},
        {value : 5, matched : false, flipped : false},
      ]
    }
  }

  handleClick(i){
    //this.state.cards[i] = this.setState({flipped: !this.state.flipped});
    var cards = this.state.cards;
    cards[i].flipped = !cards[i].flipped;
    this.setState({cards});
  }

  renderCards(cards){
    return cards.map((card, index) => {
      return (
        <Card
          key={index}
          id={index}
          value={card.value}
          matched={card.matched}
          flipped={card.flipped}
          onClick={i => this.handleClick(i)}
        />
      );
    });
  }

  render() {
    return (
      <div className="game">
        <h1 className="game-title">Memory Game</h1>
        <div className="game-board">
          {this.renderCards(this.state.cards)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
