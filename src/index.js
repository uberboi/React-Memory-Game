import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Card extends React.Component {

  render() {
    var cardValue = this.props.flipped ? this.props.value : '';
    var cardClass = "Card";
    if(this.props.matched){
      cardClass += " Card--matched";
    }else if(this.props.flipped){
      cardClass += " Card--flipped";
    }else{
      cardClass += " Card--back";
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
    this.checkMatch = this.checkMatch.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      cards: initialCards(0),
      firstCard: null,
      locked: false,
      cardMatches: 0,
      gridSize: 0,
      score: 0
    };
  }

  handleClick(i){
    //this.state.cards[i] = this.setState({flipped: !this.state.flipped});
    //var cards = this.state.cards;
    //cards[i].flipped = !cards[i].flipped;
    //this.setState({cards});
    this.checkMatch(i);
  }

  createGrid(cards, gridSize){
    const grid = [];
    //Calculate number of rows of 6
    let rows = cards.length/gridSize
    //Card counter to track index
    let cardCounter = 0;
    for(let i=0; i<rows; i++){
      const row = [];
      //Calculate row length
      //Cap length at 6 if more than 6 cards left
      //Otherwise use remaning cards
      const rowLength = (cards.length - (gridSize*i) >= gridSize) ? gridSize : cards.length - (gridSize*i);
      for(let j=0; j<rowLength; j++){
        row.push(this.renderCards(cardCounter));
        cardCounter++;
      }
      grid.push(<div key={i} className="grid-row">{row}</div>)
    };
    return grid;
  }

  renderCards(index){
    //return cards.map((card, index) => {
      return (
        <Card
          key={index}
          id={index}
          value={this.state.cards[index].value}
          matched={this.state.cards[index].matched}
          flipped={this.state.cards[index].flipped}
          onClick={i => this.handleClick(i)}
        />
      );
    //});
  }

  checkMatch(id){
    //If cards not yet flipped back over,
    //dont allow other cards to be flipped
    if(this.state.locked){
      return;
    }
    //Check for card match logic
    //if seleced card is not same as first card
    //and selected card is not already matched
    var cards = this.state.cards;
    if(id !== this.state.firstCard && cards[id].matched === false){
      const value = cards[id].value
      //flip selected card
      cards[id].flipped = true;
      this.setState({
        cards,
        locked: true
      });
      //If first card has already been selected then check for match
      if(this.state.firstCard !== null){
        //if cards match, then set to true
        if(value === cards[this.state.firstCard].value){
          cards[id].matched = true;
          cards[this.state.firstCard].matched = true;
          const cardMatches = this.state.cardMatches + 1;
          var score = this.state.score;
          if(cardMatches === this.state.cards.length/2){
            score += 1;
          }
          this.setState({
            cards,
            firstCard: null,
            locked: false,
            cardMatches: cardMatches,
            score: score
          });
        //If cards dont match then flip back over
        }else{
          //Timer before cards flip back to see result
          setTimeout(() => {
            cards[id].flipped = false;
            cards[this.state.firstCard].flipped = false;
            this.setState({
              cards,
              firstCard: null,
              locked: false
            });
          }, 1000);
        }
      //First card selected
      }else{
        this.setState({
          firstCard: id,
          locked: false
        });
      }
    }
  }

  //Function to reset Game
  reset(){
    var gridSize = document.getElementById("difficulty").value;
    if(gridSize == 0){
      alert("Please Select a Difficulty!");
    }
    this.setState({
      cards: initialCards((gridSize*gridSize)/2),
      firstCard: null,
      locked: false,
      cardMatches: 0,
      gridSize: gridSize
    });
  }

  render() {
    var txt = '';
    if(this.state.cardMatches === this.state.cards.length/2 && this.state.cards.length != 0){
      txt = 'You Win!';
    }

    return (
      <div className="game">
        <h1 className="game-title">Memory Game</h1>
        <h2 className="status-score">{'Games Won: ' + this.state.score}</h2>
        <button className="new-game-button" onClick={() => this.reset()}>New Game</button>
          <div className="custom-select">
            <select id="difficulty">
              <option value="0">Select Difficulty:</option>
              <option value="4">Easy (4x4)</option>
              <option value="6">Medium (6x6)</option>
              <option value="8">Hard (8x8)</option>
            </select>
          </div>
        <h2 className="status-text">{txt}</h2>
        <div className="game-board">
          {this.createGrid(this.state.cards, this.state.gridSize)}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function initialCards(gridSize){
  var cards = [];
  for(let i=0; i<gridSize; i++){
    cards.push(
      {value : i, matched : false, flipped : false},
      {value : i, matched : false, flipped : false},
    );
  }
  shuffle(cards);
  return cards;
}

function shuffle(array) {
  for(let i = array.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
