import React, { useContext, useState } from 'react';
import Loader from '../../../../components/Loader';
import HiloDialog from './dialogs/HiloDialog';
import useFormatter from '../../hook/formatter';
import { HiloContext } from './store';

const MyBets = () => {
  const [hiloDialogData, setHiloDialogData] = useState(null);
  const { initializing, userBets } = useContext(HiloContext);
  const screen = 1234;
  const { removeTrailingZeros, getSuffix } = useFormatter();

  if (initializing) {
    return (
      <div style={{ height: '400px' }}>
        <Loader />
      </div>
    );
  }

  if (!userBets.length) {
    return (
      <div className="sc-epFoly etYRmD">
        <div className="sc-eCImPb biQums cuPxwd empty">
          <div className="msg">Oops! There is no data yet!</div>
        </div>
      </div>
    );
  }

  const renderProfitCell = (bet) => (
    <td className={`profitline ${!bet.won ? 'is-lose' : 'is-win'}`}>
      <div className="sc-Galmp erPQzq coin notranslate monospace has-sign">
        <img alt="" className="coin-icon" src={bet.token_img} />
        <div className="amount">
          <span className="amount-str">
            {bet.won ? '+' : ''}
            {removeTrailingZeros(
              (bet.won
                ? bet.bet_amount * bet.payout - bet.bet_amount
                : bet.bet_amount
              ).toFixed(7)
            )}
            <span className="suffix">
              {getSuffix(
                (bet.won
                  ? bet.bet_amount * bet.payout - bet.bet_amount
                  : bet.bet_amount
                ).toFixed(7)
              )}
            </span>
          </span>
        </div>
      </div>
    </td>
  );

  const renderBetAmount = (bet) => (
    <td className="bet">
      <div className="sc-Galmp erPQzq coin notranslate monospace">
        <img alt="" className="coin-icon" src={bet.token_img} />
        <div className="amount">
          <span className="amount-str">
            {removeTrailingZeros(bet.bet_amount.toFixed(7))}
            <span className="suffix">
              {getSuffix(bet.bet_amount.toFixed(7))}
            </span>
          </span>
        </div>
      </div>
    </td>
  );

  return (
    <>
      <div className="sc-eZhRLC iycaRo">
        <table className="sc-gWXbKe iUeetX table is-hover">
          <thead>
            <tr>
              <th className="num">Bet ID</th>
              {screen > 650 && <th className="time">Time</th>}
              {screen > 420 && <th className="bet">Bet</th>}
              <th className="payout">Payout</th>
              <th className="profit">Profit</th>
            </tr>
          </thead>
          <tbody>
            {userBets.map((bet, index) => (
              <tr
                key={`${bet.bet_id}_${index}`}
                onClick={() => setHiloDialogData({ tab: 1, betID: bet.bet_id })}
              >
                <td>
                  <a href="/hilo" className="hash ellipsis">
                    {bet.bet_id}
                  </a>
                </td>
                {screen > 650 && (
                  <td>{new Date(bet.time).toLocaleTimeString()}</td>
                )}
                {screen > 420 && renderBetAmount(bet)}
                <td className="payout">{bet.payout.toFixed(2)}×</td>
                {renderProfitCell(bet)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Boolean(hiloDialogData) && (
        <HiloDialog
          launchConf={hiloDialogData}
          onClose={() => setHiloDialogData(null)}
        />
      )}
    </>
  );
};

export default MyBets;
