import React from "react";
import "./SingleCard.css";
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if(!disabled){
      handleChoice(card);
    }
   
  };
  return (
    <div className="card-img-wrap">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/assets/cover.png"
          alt="card back"
          onClick={handleClick}
         
        />
      </div>
    </div>
  );
}
