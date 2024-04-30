import React from 'react';
import './Card.css';

const Card = ({ id, symbol, flipped, onClick, disabled }) => {
  return (
    <div
      className={`card ${flipped ? '' : 'flipped'}`}
      onClick={() => (disabled ? null : onClick(id))}
    >
      <div className="card-inner">
        <div className="card-front">
          {/* add countenu */}
        </div>
        <div className="card-back">
          <span className="symbol">{symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
