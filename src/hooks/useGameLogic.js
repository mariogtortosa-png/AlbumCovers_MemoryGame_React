import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  //BARAJA LAS CARTAS
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  //INICIA EL JUEGO Y LOS VALORES DE LAS CARTAS
  const initializeGame = () => {
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
    setIsLocked(false);
  };

  //LLAMA AL INICIO DEL JUEGO CUANDO SE CARGA LA VENTANA
  useEffect(() => {
    initializeGame();
  }, []);

  //FUNCIÓN QUE SE EJECUTA EN CADA CLICK A UNA CARTA
  const handleCardClick = (card) => {
    //SI LA CARTA ESTÁ EMPAREJADA O GIRADA, NO HACE NADA
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }
    //ACTUALIZA FLIPPED
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    //COMPRUEBA PAREJA
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      //SI LAS CARTAS HACEN PAREJA
      if (firstCard.value === card.value) {
        setTimeout(() => {
          //AÑADE LOS ID'S DE LAS CARTAS A MATCHED CARDS
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          //AÑADE 1 PUNTO AL MARCADOR
          setScore((prev) => prev + 1);
          //CAMBIA EL ESTADO DE LAS CARTAS GIRADAS A MATCHED TRUE
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 100);
      } else {
        //SI NO COINCIDEN, VUELVE A GIRAR LAS CARTAS
        setTimeout(() => {
          const flipBack = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flipBack);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1500);
      }
      //AÑADE UN MOVIMIENTO TRAS EL SEGUNDO CLICK
      setMoves((prev) => prev + 1);
    }
  };

  //VARIABLE QUE ES TRUE SI LAS MATCHED CARDS SON
  //EL MISMO NUMERO QUE LAS CARTAS TOTALES (PARTIDA GANADA)
  const isGameWon = matchedCards.length === cards.length;

  return { cards, score, moves, isGameWon, initializeGame, handleCardClick };
};
