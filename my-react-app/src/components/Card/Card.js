// Card.js

import React from 'react';
import './Card.css'; // Assurez-vous d'avoir une feuille de style Card.css pour la classe 'hidden'

const Card = ({ id, symbol, flipped, onClick, disabled }) => {
  return (
    <div
      className={`card ${flipped ? '' : 'hidden'}`} // Ajoutez la classe 'hidden' si la carte n'est pas retournée
      onClick={() => (disabled ? null : onClick(id))}
    >
      {flipped ? <span className="symbol">{symbol}</span> : null} {/* Afficher la lettre uniquement si la carte est retournée */}
    </div>
  );
};

export default Card;
