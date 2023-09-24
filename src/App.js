import { Button } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/assets/helmet-1.png", matched: false },
  { src: "/assets/potion-1.png", matched: false },
  { src: "/assets/ring-1.png", matched: false },
  { src: "/assets/scroll-1.png", matched: false },
  { src: "/assets/shield-1.png", matched: false },
  { src: "/assets/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
setChoiceOne(null)
setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  //handel a choise
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  //conpare cards
  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
       setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }else{
              return card
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
console.log(cards)
  //reset cards
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };


  useEffect(()=> {
shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic game</h1>
      <Button variant="dark" onClick={shuffleCards}>
        New Game
      </Button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          diasbled={disabled}
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
