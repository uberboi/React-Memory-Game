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
      cards: initialCards(),
      firstCard: null,
      locked: false
    };
  }

  handleClick(i){
    //this.state.cards[i] = this.setState({flipped: !this.state.flipped});
    //var cards = this.state.cards;
    //cards[i].flipped = !cards[i].flipped;
    //this.setState({cards});
    this.checkMatch(i);
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
          cards[this.state.firstCard].matched = true
          this.setState({
            cards,
            firstCard: null,
            locked: false
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
        this. setState({
          firstCard: id,
          locked: false
        });
      }
    }
  }

  //Function to reset Game
  reset(){
      this.setState({
        cards: initialCards(),
        firstCard: null,
        locked: false
      });
  }

  render() {
    return (
      <div className="game">
        <h1 className="game-title">Memory Game</h1>
        <div className="game-board">
          <Grid>
          {this.renderCards(this.state.cards)}
          </Grid>
        </div>
        <button onClick={() => this.reset()}>New Game</button>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function initialCards(){
  /*
  var cards = [];
  for(let i=0; i<3; i++){
    cards.push(
      {value : i, matched : false, flipped : true},
      {value : i, matched : false, flipped : true},
    );
  }
  */
  var cards = [
    {value : 5, matched : false, flipped : true},
    {value : 2, matched : false, flipped : true},
    {value : 4, matched : false, flipped : true},
    {value : 1, matched : false, flipped : true},
    {value : 1, matched : false, flipped : true},
    {value : 3, matched : false, flipped : true},
    {value : 4, matched : false, flipped : true},
    {value : 2, matched : false, flipped : true},
    {value : 3, matched : false, flipped : true},
    {value : 5, matched : false, flipped : true},
  ];
  //shuffle(cards);
  return cards;
}

function shuffle(array) {
  for(let i = array.length-1; i>0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
