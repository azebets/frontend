import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import lottie from 'lottie-web';
import Point from './components/Point.jsx';
import SSuit from './components/Ssuit.jsx';
import Suit from './components/Suit.jsx';
import useDeck from './hooks/useDeck';
import useLiveStats from '../../hook/livestats';
import useFormatter from '../../hook/formatter';
import { AppContext } from '../../../../context/AppContext';
import { HiloContext } from './store';

const GameView = ({onHiloNextRound}) => {
  const {liveStats, soundManager, hiloGame,userBets,setHiloGame, processingRequest } = useContext(HiloContext)
  const navigate = useNavigate();
  const { getCardSuite, suites } = useDeck();
  const { removeTrailingZeros, getSuffix } = useFormatter();
  const { recordGame } = useLiveStats(liveStats, "HILO_LIVE_STATS");
  const [HIAnimContainer, setHIAnimContainer] = useState(null);
  const [HIAnim, setHIAnim] = useState(null);
  const [LOAnimContainer, setLOAnimContainer] = useState(null);
  const [LOAnim, setLOAnim] = useState(null);
  const [notifyWin, setNotifyWin] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [currentRound, setCurrentRound] = useState(null);
  const [gameCache, setGameCache] = useState(null);
  const [rounds, setRounds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [canSkip, setCanSkip] = useState(false);
  const [cardActivate, setCardActivate] = useState({});
  const roundsContainer = useRef(null);
  const [gameWinData, setGameWinData] = useState({
    payout: "0.00",
    profit: "0.000000",
    token_img: "/coin/BTC.black.png",
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHIAnim(
        HIAnimContainer &&
        lottie.loadAnimation({
          container: HIAnimContainer,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: "/assets/hilo/anim/giraffe.592355d2.json",
        })
      );
      setLOAnim(
        LOAnimContainer &&
        lottie.loadAnimation({
          container: LOAnimContainer,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: "/assets/hilo/anim/monkey.ca9b3010.json",
        })
      );
    }
  }, [HIAnimContainer, LOAnimContainer]);

  const handleSkip = () => {
    // Dispatch action to skip round
    onHiloNextRound({     
      hi: false,
      lo: false,
      skip: true,
      })
  };

  useEffect(() => {
     setHiloGame((game) => {
      if (game?.bet_id) {
        setRounds(game.rounds.map((r) => ({
          ...r,
          redCard: [suites[1], suites[3]].includes(getCardSuite(r.card)),
        })));
        setCurrentRound(game.rounds[game.rounds.length - 1]);
        setCardNumber(game.rounds[game.rounds.length - 1].card || 0);
        if (gameCache) {
          soundManager.play("deal");
          if (game.has_ended) {
            if (game.won) {
              soundManager.play("win");
              soundManager.play("cashout");
              setGameWinData({
                profit: game.profit.toFixed(4),
                payout: game.payout.toFixed(2),
                token_img: game.token_img,
              });
              setNotifyWin(true);
              setTimeout(() => setNotifyWin(false), 4000);
            }
            recordGame(game.won, game.bet_amount, game.profit, game.token_img);
          } else if (rounds.length > 1) {
            if (currentRound.guess !== 1) {
              soundManager.play("win");
            }
            if (game.hi) {
              soundManager.play("giraffe");
              HIAnim.goToAndPlay(0);
            } else if (game.lo) {
              soundManager.play("ape");
              LOAnim.goToAndPlay(0);
            } else {
              soundManager.play("skip");
            }
          }
        } else if (rounds.length === 1) {
          soundManager.play("bet");
          soundManager.play("deal");
        }
        if (!!gameCache || rounds.length === 1) {
          setTimeout(() => {
            const old =
              rounds.length === 1 && Object.keys(cardActivate).length > 1
                ? {}
                : cardActivate;
            setCardActivate({ ...old, ...{ [currentRound.round]: "active" } });
          }, 250);
        } else {
          const _active = {};
          rounds.forEach(({ round }) => {
            _active[round] = "active";
          });
          setCardActivate(_active);
        }
        setGameCache(game);
        setTimeout(() => {
          roundsContainer.current?.scrollTo({
            left: roundsContainer.current.scrollWidth,
            behavior: "smooth",
          });
        }, 300);
      } else if (game?.error) {
        console.log(game.error);
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(processingRequest || !hiloGame);
    setCanSkip(!isLoading && hiloGame?.round <= 51 && !hiloGame?.has_ended);
  }, [processingRequest, hiloGame, isLoading]);

  return (
    <div className="game-view">
      <div className="sc-hoHwyw fIoiVG game-recent">
        <div className="recent-list-wrap">
          <div className="recent-list"
            style={{ width: '112.5%', transform: 'translate(0%, 0px)' }}>
            {userBets.slice(0, 10).reverse().map((bet, index) => (
              <div key={index} className="recent-item" style={{ width: `18%` }}>
                <div className={`item-wrap ${bet.won ? 'is-win' : 'is-lose'}`}>
                  {bet.payout.toFixed(2)}x
                </div>
              </div>
            ))}
            {!userBets.length && (
              <div className="empty-item">
                <p>Game results will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sc-hcupDf dqwCNK game-box sc-iLOkMM iYxCeC">
        <div className="sc-gDGHff fFDbEu hilo-graph">
          <div className="hilo-graph-wrap">
            <div className="top-box">
              <div className="higher lh-box">
                <div className="lottie" ref={setHIAnimContainer}></div>
                <div className="title">HIGHER OR SAME</div>
              </div>
              <div className="cards-box">
              <div className="cards">
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div
                  className="sc-eZKLwX kkALZz card {!!currentRound?.card &&
                  currentRound?.round &&
                  $hilo_game.has_ended && !$hilo_game.won ? 'bust' : ''} {cardNumber ? 'active' : ''} card1-ref">
                  <div className="card-back"></div>
                  <div  className="card-front {currentRound?.redCard ? 'card-red' : ''}" >
                    <div className="point">
                      <Point cardNumber={currentRound?.card || 0} />
                    </div>
                    <div className="ssuit">
                      <SSuit cardNumber={currentRound?.card || 0} />
                    </div>
                    <Suit cardNumber={currentRound?.card || 0} />
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div className="sc-eZKLwX kkALZz card">
                  <div className="card-back"></div>
                  <div className="card-front">
                    <div className="point"></div>
                    <div className="ssuit"></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div className="sc-eZKLwX kkALZz card">
                  <div className="card-back"></div>
                  <div className="card-front">
                    <div className="point"></div>
                    <div className="ssuit"></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div className="sc-eZKLwX kkALZz card">
                  <div className="card-back"></div>
                  <div className="card-front">
                    <div className="point"></div>
                    <div className="ssuit"></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div className="sc-eZKLwX kkALZz card">
                  <div className="card-back"></div>
                  <div className="card-front">
                    <div className="point"></div>
                    <div className="ssuit"></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
              <div className="sc-dFtzxp gFsinV card-wrap">
                <div className="sc-eZKLwX kkALZz card">
                  <div className="card-back"></div>
                  <div className="card-front">
                    <div className="point"></div>
                    <div className="ssuit"></div>
                    <div className=""></div>
                  </div>
                </div>
              </div>
            </div>
              <button onClick={handleSkip} disabled={!canSkip} className="skip-btn">
                <svg viewBox="0 0 32 32">
                  <path d="M18.356 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059zM5.029 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059z"></path>
                </svg>
              </button>
              <div className="tips">KING IS HIGHEST, ACE IS LOWEST</div>
            </div>
              <div className="lower lh-box">
                <div className="lottie" ref={setLOAnimContainer}></div>
                <div className="title">LOWER OR SAME</div>
              </div>
            </div>
            <div className="sc-gFSQbh dQIphg hilo-rounds-wrap">
              <div ref={roundsContainer} className="hilo-rounds">
                <AnimatePresence>
                  {rounds.map((round, index) => (
                    <motion.div
                      key={`${hiloGame.id}_${index}_${round.card}_${round.guess}`}
                      className={`sc-jwQYvw cjjpTm hilo-round ${round.guess === 1 ? 'round-skip' : ''}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Round card and details */}
                      <div className="sc-dFtzxp gFsinV card-wrap">
                        <div
                          className={`sc-eZKLwX kkALZz card ${cardActivate[round.round] || ''}`}
                        >
                          <div className="card-back"></div>
                          <div className={`card-front ${round.redCard ? 'card-red' : ''}`}>
                            <div className="point">
                              <Point cardNumber={round.card} />
                            </div>
                            <div className="ssuit">
                              <SSuit cardNumber={round.card} />
                            </div>
                            <Suit cardNumber={round.card} />
                            <div className=""></div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`odds ${hiloGame?.has_ended &&
                        !hiloGame.won &&
                        round.round === hiloGame?.round
                          ? 'is-lose'
                          : ''}`}
                      >
                        <div style={{ fontSize: '12px' }} className="val">
                          {index === 0 ? "Start Card" : `${round.odds.toFixed(2)}x`}
                        </div>
                      </div>
                      {Boolean(index) && (
                        <div
                          className="guess flex-center"
                          style={{ opacity: 1, transform: 'translate(0px, 0px)' }}
                        >
                          {round.guess === 1 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico1 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M18.356 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059zM5.029 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059z"></path>
                            </svg>
                          )}
                          {round.guess === 2 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico2 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M15.843 24.405l13.744-13.774-3.277-3.459-10.467 9.758-9.997-9.758-3.602 3.459z"></path>
                            </svg>
                          )}
                          {round.guess === 3 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico3 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M15.923 6.883l14.541 14.573-3.467 3.66-11.075-10.324-10.577 10.324-3.811-3.66z"></path>
                            </svg>
                          )}
                          {round.guess === 4 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico4 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M29.222 18.833v5.667h-26.444v-5.667h26.444zM29.222 7.5v5.667h-26.444v-5.667h26.444z"></path>
                            </svg>
                          )}
                          {round.guess === 5 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico5 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M29 22.929v5.571h-26v-5.571h26zM15.874 2.5l13.010 13.039-3.102 3.275-9.909-9.237-9.464 9.237-3.41-3.275 12.874-13.039z"></path>
                            </svg>
                          )}
                          {round.guess === 6 && (
                            <svg
                              viewBox="0 0 32 32"
                              className={`sc-ljMRFG lisaNS guess-ico guess-ico6 ${hiloGame?.has_ended &&
                              !hiloGame.won &&
                              round.round === hiloGame?.round
                                ? 'is-lose'
                                : ''}`}
                            >
                              <path d="M30 8.5v-6h-28v6h28zM15.864 30.5l14.011-14.042-3.34-3.527-10.671 9.948-10.192-9.948-3.672 3.527 13.864 14.042z"></path>
                            </svg>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {notifyWin && (
              <motion.div
                className="sc-juEPzu jjnkdy hilo-win"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Win notification */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="sc-gLDmcm gnjHQb"><span>House Edge 1%</span></div>
        <svg className="box-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 996 46"
      ><defs
        ><linearGradient id="gcardBg" x1="50%" x2="50%" y1="0%" y2="100%"
          ><stop offset="0%" stopColor="#31343C"></stop><stop
            offset="100%"
            stopColor="#1E2024"
            stopOpacity="0"
          ></stop></linearGradient
        ></defs
      ><g opacity=".899"
        ><path
          fill="url(#gcardBg)"
          fillRule="evenodd"
          d="M0 0h996L892 46H96z"
          opacity=".598"
          transform="rotate(-180 498 23)"
        ></path></g
      ></svg
    >
      </div>
    </div>
  );
};

export default GameView;
