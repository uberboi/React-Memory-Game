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
  constructor(props){
    super(props);
    this.renderCards = this.renderCards.bind(this);

    this.state = {
      cards: [
        {value : 5},
        {value : 2},
        {value : 4},
        {value : 1},
        {value : 1},
        {value : 3},
        {value : 4},
        {value : 2},
        {value : 3},
        {value : 5},
      ]
    }
  }

  renderCards(cards){
    return cardVals.map((cards, index) => {
      return (
        <Card key={index} value={card.value} />
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
