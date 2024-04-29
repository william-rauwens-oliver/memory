// Card.js
import React from 'react';
import './Card.css'; // CSS pour les styles des cartes

const Card = ({ id, symbol, flipped, onClick, disabled }) => {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={() => (disabled ? null : onClick(id))}
    >
      <div className="inner">
        <div className="front"></div>
        <div className="back">{symbol}</div>
      </div>
    </div>
  );
};

export default Card;
