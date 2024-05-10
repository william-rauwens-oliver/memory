import React, { useState, useEffect, useRef } from 'react';
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
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#fae19d");
  const [gameStarted, setGameStarted] = useState(false);
  const timerIntervalRef = useRef(null); // Utilisation de useRef pour stocker l'ID de l'intervalle du timer

  useEffect(() => {
    if (gameStarted) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [gameStarted]);

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

  useEffect(() => {
    checkGameWon();
  }, [flipped]);

  const flipCard = (id) => {
    setClickCount(clickCount + 1);

    if (flipped.length === 0 || flipped.length === 1) {
      setFlipped([...flipped, id]);
    }

    if (flipped.length === 1) {
      if (cards[flipped[0]].symbol === cards[id].symbol) {
        setSolved([...solved, flipped[0], id]);
        setScore(score + 1);
        resetCards();
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
      clearInterval(timerIntervalRef.current);
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

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <>
      {!gameStarted && (
        <div className="start-button">
          <Button onClick={startGame}>Play</Button>
        </div>
      )}
      {gameStarted && (
        <div>
          <div className="score">Score: {score}</div>
          <div className="click-count">Clicks: {clickCount}</div>
          <div className="timer">Elapsed Time: {timer} seconds</div>
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
                  disabled={disabled || solved.includes(index) || flipped.includes(index)}
                />
              ))}
            </div>
            {gameWon && (
              <div className="message">
                You won with a score of {score}!
              </div>
            )}
            <div className="button-container">
              <Button onClick={() => window.location.reload()}>New Game</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
