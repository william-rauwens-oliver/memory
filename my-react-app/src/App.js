// App.js
import React, { useState, useEffect } from 'react';
import Title from './components/Title/Title';
import Button from './components/Button/Button';
import Card from './components/Card/Card';

const App = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // Fonction pour initialiser les cartes
  useEffect(() => {
    const initCards = () => {
      // Générer les paires de cartes
      const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      let cards = [];
      for (let i = 0; i < symbols.length; i++) {
        cards.push({ id: i * 2, symbol: symbols[i] });
        cards.push({ id: i * 2 + 1, symbol: symbols[i] });
      }
      // Mélanger les cartes
      cards.sort(() => Math.random() - 0.5);
      setCards(cards);
    };
    initCards();
  }, []);

  // Fonction pour retourner une carte
  const flipCard = (id) => {
    setFlipped([...flipped, id]);
    if (flipped.length === 1) {
      if (cards[flipped[0]].symbol === cards[id].symbol) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
      } else {
        setDisabled(true);
        setTimeout(resetCards, 1000);
      }
    }
  };

  // Fonction pour réinitialiser les cartes retournées
  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  // Vérifier si toutes les cartes sont retournées
  useEffect(() => {
    if (solved.length === cards.length) {
      alert('Bravo, vous avez gagné !');
    }
  }, [solved, cards]);

  return (
    <div>
      <Title />
      <div className="cards">
        {cards.map((card, index) => (
          <Card
            key={index}
            id={index}
            symbol={card.symbol}
            flipped={flipped.includes(index) || solved.includes(index)}
            onClick={flipCard}
            disabled={disabled || solved.includes(index)}
          />
        ))}
      </div>
      <Button onClick={() => window.location.reload()}>Nouvelle partie</Button>
    </div>
  );
};

export default App;
