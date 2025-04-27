import React, { useState, useEffect, useContext } from 'react';
import { fetchData } from "../../../../hook/useFetchData";
import ConfirmDialog from "../ConfirmDialog.jsx";
import useDeck from "../../hooks/useDeck";
import { AppContext } from '../../../../../../context/AppContext';

const GameDetails = ({ betID }) => {
  const { user } = useContext(AppContext)
  const { getCardSuite, suites } = useDeck();
  const [gameDetails, setGameDetails] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await fetchData(
          `/hilo-game/details/${betID}`
        );
        setGameDetails({
          ...data,
          betLog: {
            ...data.betLog,
            rounds: data.betLog.rounds.map((r) => ({
              ...r,
              redCard: [suites[1], suites[3]].includes(getCardSuite(r.card)),
            })),
          },
        });
      } catch (error) {
        console.log(error)
      }
    };
    fetchGameDetails();
  }, [betID, getCardSuite, suites]);

  const handleVerifyGame = async () => {
    if (!gameDetails.seedHistory.serverSeed) {
      if (loading) return;
      setLoading(true);
      const res = await new Promise((resolve) => {
        setConfirmationData({ resolve });
      });
      setConfirmationData(null);
      if (res) {
        // Implement dispatch logic here
      }
    } else {
      // Implement dispatch logic here
    }
    setLoading(false);
  };


  return (
    <div className="sc-dkPtRN jScFby scroll-view sc-bvFjSx jGQOsZ">
      <div className="sc-emDsmM Osnbt">
        <img
          alt=""
          className="win-state"
          src={`/assets/hilo/${
            gameDetails.betLog.won ? 'win.431b83d6.png' : 'lose.b4ff48b7.png'
          }`}
        />
        <div className="sc-jibziO gZqspm game-share">
          <svg
            xmlns="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_Share"></use>
          </svg>
        </div>
        <div className="rt_info">
          <div className="name">
            {gameDetails.betLog.user.hidden ? (
              <span className="hidden-name">
                <svg
                  xmlns="http://www.w3.org/1999/xlink"
                  className="sc-gsDKAQ hxODWG icon"
                >
                  <use xlinkHref="#icon_Hidden"></use>
                </svg>
                Hidden
              </span>
            ) : (
              gameDetails.betLog.user.username
            )}
          </div>
          <div className="flex">
            <div className="betid">Betting ID: {gameDetails.betLog.bet_id}</div>
            <div className="verified">Verified</div>
          </div>
        </div>
        <div className="rt_time">
          {new Date(gameDetails.betLog.time).toLocaleDateString()},{" "}
          {new Date(gameDetails.betLog.time).toLocaleTimeString()}
        </div>
        <div className="rt_items">
          {/* Add rt_items content here */}
        </div>
      </div>
      <div className="sc-fbWUsZ fghvcD">
        <div className="list-wrap">
          {gameDetails.betLog.rounds.map((round, index) => (
            <div key={`${round.round}_${index}_${gameDetails.betLog.bet_id}`} className="hilo-round">
              {/* Add hilo-round content here */}
            </div>
          ))}
        </div>
      </div>
      <div className="seed-main">
        {/* Add seed-main content here */}
      </div>
      {user.user_id === gameDetails.betLog.user.user_id && (
        <div className="verify-wrap">
          <button
            disabled={loading}
            onClick={handleVerifyGame}
            className="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal verify-btn"
          >
            <div className="button-inner">
              { "Verify"}
            </div>
          </button>
        </div>
      )}
      {confirmationData && (
        <ConfirmDialog resolver={confirmationData.resolve} />
      )}
    </div>
  );
};

export default GameDetails;
