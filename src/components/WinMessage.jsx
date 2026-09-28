export const WinMessage = ({ moves }) => {
  return (
    <div className="win-message">
      <h2>Felicidades!</h2>
      <p>Has ganado la partida en {moves} movimientos</p>
    </div>
  );
};
