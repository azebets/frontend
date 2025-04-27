import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../../../components/Loader';
import HiloDialog from './dialogs/HiloDialog';
import useFormatter from '../../hook/formatter';
import { HiloContext } from './store';
import { NavLink } from 'react-router';
import { AppContext } from '../../../../context/AppContext';

const AllBets = () => {
  const { Modalroutes } = useContext(AppContext)
  const [hiloDialogData, setHiloDialogData] = useState(null);
    const { initializing, recentBets } = useContext(HiloContext);
  const screen = 1234;

  const { removeTrailingZeros, getSuffix } = useFormatter();

  if (initializing) {
    return (
      <div style={{ height: '400px' }}>
        <Loader />
      </div>
    );
  }

  if (!recentBets.length) {
    return (
      <div className="sc-epFoly etYRmD">
        <div className="sc-eCImPb biQums cuPxwd empty">
          <div className="msg">Oops! There is no data yet!</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sc-eZhRLC iycaRo">
        <table className="sc-gWXbKe iUeetX table is-hover">
          <thead>
            <tr>
              <th className="num">Bet ID</th>
              <th className="user">Player</th>
              {screen > 650 && <th className="time">Time</th>}
              {screen > 420 && <th className="bet">Bet</th>}
              <th className="payout">Payout</th>
              <th className="profit">Profit</th>
            </tr>
          </thead>
          <tbody>
            {recentBets.map((bet, index) => (
              <tr
                key={`${bet.bet_id}_${index}`}
                onClick={() => setHiloDialogData({ tab: 1, betID: bet.bet_id })}
              >
                <td>
                  <NavLink to="/hilo" className="hash ellipsis">
                    {bet.bet_id}
                  </NavLink>
                </td>
                <td>
                  <NavLink onClick={()=> Modalroutes("profile", {id: bet.user_id})}
                    className="sc-jUosCB iTDswZ user-info"
                  >
                    <div className="name">
                      {bet.user.hidden ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            gap: '2px',
                            justifyContent: 'center',
                          }}
                          className="hidden-name"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="sc-gsDKAQ hxODWG icon"
                          >
                            <use xlinkHref="#icon_Hidden"></use>
                          </svg>
                          Hidden
                        </span>
                      ) : (
                        bet.user.username
                      )}
                    </div>
                  </NavLink>
                </td>
                {screen > 650 && (
                  <td>{new Date(bet.time).toLocaleTimeString()}</td>
                )}
                {screen > 420 && (
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
                )}
                <td className="payout">{bet.payout.toFixed(2)}×</td>
                <td
                  className={`profitline ${
                    !bet.won ? 'is-lose' : 'is-win'
                  }`}
                >
                  <div className="sc-Galmp erPQzq coin notranslate monospace has-sign">
                    <img alt="" className="coin-icon" src={bet.token_img} />
                    <div className="amount">
                      <span className="amount-str">
                        {bet.won ? '+' : ''}
                        {removeTrailingZeros(
                          (bet.won
                            ? bet.bet_amount * bet.payout - bet.bet_amount
                            : bet.bet_amount
                          ).toFixed(6)
                        )}
                        <span className="suffix">
                          {getSuffix(
                            (bet.won
                              ? bet.bet_amount * bet.payout - bet.bet_amount
                              : bet.bet_amount
                            ).toFixed(6)
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hiloDialogData && (
        <HiloDialog
          launchConf={hiloDialogData}
          onClose={() => setHiloDialogData(null)}
        />
      )}
    </>
  );
};

export default AllBets;
