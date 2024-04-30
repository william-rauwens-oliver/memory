import React, { useState, useEffect } from 'react';
import Title from './components/Title/Title';
import Button from './components/Button/Button';
import Card from './components/Card/Card';

const App = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const initCards = () => {
      const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      let cards = [];
      for (let i = 0; i < symbols.length; i++) {
        cards.push({ id: i * 2, symbol: symbols[i] });
        cards.push({ id: i * 2 + 1, symbol: symbols[i] });
      }
      cards.sort(() => Math.random() - 0.5);
      setCards(cards);
    };
    initCards();
  }, []);

  const flipCard = (id) => {
    setFlipped([...flipped, id]);
    if (flipped.length === 1) {
      if (cards[flipped[0]].symbol === cards[id].symbol) {
        setSolved([...solved, flipped[0], id]);
        resetCards();
        checkGameWon();
      } else {
        setDisabled(true);
        setTimeout(resetCards, 1000);
      }
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const checkGameWon = () => {
    if (solved.length === cards.length) {
      setGameWon(true);
    }
  };

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
      {gameWon && (
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
          Vous avez gagné !
        </div>
      )}
      <Button onClick={() => window.location.reload()}>Nouvelle partie</Button>
    </div>
  );
};

export default App;
