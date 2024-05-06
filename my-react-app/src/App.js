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
  const [score, setScore] = useState(0);
  const [clickCount, setClickCount] = useState(0); // Nouvel état pour le compteur de clics
  const [backgroundColor, setBackgroundColor] = useState("#fae19d");

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
    setClickCount(clickCount + 1); // Incrémente le compteur de clics
    setFlipped([...flipped, id]);

    if (flipped.length === 1) {
      if (cards[flipped[0]].symbol === cards[id].symbol) {
        setSolved([...solved, flipped[0], id]);
        setScore(score + 1);
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
      localStorage.setItem('memoryGameScore', score);
    }
  };

  useEffect(() => {
    const savedScore = localStorage.getItem('memoryGameScore');
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  const changeBackgroundColor = (color) => {
    document.body.style.backgroundColor = color;
    setBackgroundColor(color);
  };

  return (
    <>
      <div className="score">Score: {score}</div>
      <div className="click-count">Clics: {clickCount}</div> {/* Affichage du compteur de clics */}
      <div className="container">
        <div className="background-selector">
          <button onClick={() => changeBackgroundColor("#fae19d")}>Default</button>
          <button onClick={() => changeBackgroundColor("blue")}>Blue</button>
          <button onClick={() => changeBackgroundColor("green")}>Green</button>
          <button onClick={() => changeBackgroundColor("red")}>Red</button>
        </div>
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
          <div className="message">
            Vous avez gagné avec un score de {score} !
          </div>
        )}
        <div className="button-container">
          <Button onClick={() => window.location.reload()}>Nouvelle partie</Button>
        </div>
      </div>
    </>
  );
};

export default App;
