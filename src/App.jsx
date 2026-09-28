import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";

import { WinMessage } from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

import nevermindImg from "./assets/nevermind.png";
import inuteroImg from "./assets/inutero.png";
import alice1 from "./assets/aliceinchains.png";
import alice2 from "./assets/aliceinchains2.png";
import pearl1 from "./assets/pearljam.png";
import pearl2 from "./assets/pearljam2.png";
import mudhon1 from "./assets/mudhoney.png";
import mudhon2 from "./assets/mudhoney2.png";


/* const cardValues = [
  "🦋",
  "🐛",
  "🪳​",
  "​🦗",
  "🐞",
  "🐝​",
  "🐜",
  "🪲",
  "🦋",
  "🐛",
  "🪳​",
  "​🦗",
  "🐞",
  "🐝​",
  "🐜",
  "🪲",
]; */

const cardValues = [
  nevermindImg,
  inuteroImg,
  alice1,
  alice2,
  pearl1,
  pearl2,
  mudhon1,
  mudhon2,
  nevermindImg,
  inuteroImg,
  alice1,
  alice2,
  pearl1,
  pearl2,
  mudhon1,
  mudhon2
]

function App() {
  //LLAMADA A LA LÓGICA DEL JUEGO
  const { cards, score, moves, isGameWon, initializeGame, handleCardClick } =
    useGameLogic(cardValues);
  //RENDERIZADO HTML
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {/* SI LA PARTIDA ESTÁ GANADA MUESTRA MENSAJE */}
      {isGameWon && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
