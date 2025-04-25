import React, { useState, useEffect, useRef } from 'react';
import {useContext} from 'react'
// import Tooltip from '../components/Tooltip';
import Loader from '../../../../components/Loader.jsx';
import useDeck from './hooks/useDeck';
import { AppContext } from '../../../../context/AppContext';
import {HiloContext } from "../properties/store";


const GameControls = ({onHiloNextRound, onHiloCashout, onHiloBet}) => {
  const { Modalroutes, user , activeWallet, wallet, setWallet} = useContext(AppContext);
  const {  stateManagement, hotkeysEnabled } = React.useContext(HiloContext)
  const { processingRequest, hiloGame } = stateManagement; 
  const [currentRound, setCurrentRound] = useState(null);
  const { getCardRank, ranks } = useDeck();

  const [isFocused, setIsFocused] = useState(false);
  const [sliderOpened, setSliderOpened] = useState(false);
  const [betAmount, setBetAmount] = useState(0.00234);
  const [usd, setUsd] = useState(0);
  const [betRange, setBetRange] = useState({ min: 10, max: 5000 });
  const sliderRef = useRef(null);

  const coinImage = activeWallet && activeWallet.coin_image || "https://res.cloudinary.com/dxwhz3r81/image/upload/v1721026026/Cyclix_Points_-_Purple_njsnim.png";
  const isLoading = processingRequest || !hiloGame;

  const canGoNext = !isLoading && !!hiloGame?.bet_id && !hiloGame?.has_ended;
  const canSkip = !isLoading && !!hiloGame?.bet_id && hiloGame?.round <= 51 && !hiloGame?.has_ended;
  const canBet = !!betAmount && activeWallet?.balance >= betAmount && (!hiloGame?.bet_id || hiloGame?.has_ended || hiloGame?.new_game);
  const canCashOut = !!hiloGame?.bet_id && !hiloGame?.has_ended && !!hiloGame?.profit;

  const [controlStats, setControlStats] = useState({
    profit: "0.00000000",
    payout: "0.9900",
    hiProfit: "0.00000000",
    loProfit: "0.00000000",
    hiMultiplier: "",
    loMultiplier: "",
    hiChance: "92.31",
    loChance: "7.69",
    hiGuess: 3,
    loGuess: 4,
  });

  const [isGrabbing, setIsGrabbing] = useState(false);
  const [sliderPercentage, setSliderPercentage] = useState(0);

  const inputDisabled = !user || (!!hiloGame && hiloGame.bet_id && !hiloGame.has_ended) || activeWallet?.coin_name === "USD";

  const updateUSD = () => {
    if (activeWallet?.coin_name === "Fun Coupons") {
      setUsd(0);
      return;
    }
    let calculatedUsd = (betAmount * (betRange.rate || 1)).toFixed(6);
    setUsd(calculatedUsd.includes(".000000") ? parseInt(calculatedUsd) : calculatedUsd);
  };

  useEffect(() => {
    updateUSD();
  }, [betAmount, activeWallet]);

  useEffect(() => {
    if (!hiloGame?.bet_id) {
      const rate = activeWallet?.coin_name === "USD" ? 0.1 : 1;
      if (activeWallet?.coin_name !== "Fun Coupons") {
        setBetRange({
          min: 0.0001 / rate,
          max: 140 / rate,
          rate,
        });
      } else {
        setBetRange({
          min: 100,
          max: 200,
          rate,
        });
      }
      setBetAmount(betRange.min);
    }
  }, [activeWallet, hiloGame]);

  useEffect(() => {
    if (hiloGame?.bet_id) {
      setBetAmount(hiloGame.bet_amount);
      setCurrentRound(hiloGame.rounds.map((r) => ({
        rank: getCardRank(r.card),
      }))[hiloGame.rounds.length - 1]);

      const { hi_chance, lo_chance } = hiloGame;
      const _bet_amount = hiloGame.bet_amount + hiloGame.profit;

      const probability_higher = hi_chance / 100;
      const probability_lower = lo_chance / 100;

      const house_edge = 1 / 100;

      const multiplier_higher = 1 / probability_higher;
      const multiplier_lower = 1 / probability_lower;

      const hiMultiplier = multiplier_higher * (1 - house_edge);
      const loMultiplier = multiplier_lower * (1 - house_edge);

      const hiProfit = (_bet_amount * hiMultiplier - _bet_amount).toFixed(5);
      const loProfit = (_bet_amount * loMultiplier - _bet_amount).toFixed(5);

      setControlStats({
        profit: hiloGame.profit.toFixed(6),
        payout: hiloGame.payout.toFixed(4),
        hiProfit,
        loProfit,
        hiMultiplier: hiMultiplier.toFixed(4),
        loMultiplier: loMultiplier.toFixed(4),
        hiChance: hi_chance.toFixed(2),
        loChance: lo_chance.toFixed(2),
        hiGuess:
          currentRound.rank === ranks[0]
            ? 3
            : currentRound.rank === ranks[ranks.length - 1]
              ? 4
              : 5,
        loGuess:
          currentRound.rank === ranks[0]
            ? 4
            : currentRound.rank === ranks[ranks.length - 1]
              ? 2
              : 6,
      });
    }
  }, [hiloGame]);

  const handleSliderMove = (e) => {
    if (isGrabbing) {
      const offsetX = sliderRef.current?.getBoundingClientRect()?.left || 0;
      const newSliderPercentage = Math.max(
        0,
        Math.min(
          100,
          ((e.clientX - offsetX) /
            (sliderRef.current?.getBoundingClientRect()?.width || 100)) *
            100
        )
      );
      setSliderPercentage(newSliderPercentage);
      setBetAmount(
        (newSliderPercentage / 100) * (betRange.max - betRange.min) + betRange.min
      );
      updateUSD();
    }
  };

  const handleAdjustBet = (operator) => (e) => {
    if (inputDisabled) return;
    let newBetAmount;
    if (operator === "/") {
      newBetAmount = Math.max(betRange.min, betAmount / 2);
    } else if (operator === "*") {
      newBetAmount = Math.min(betRange.max, betAmount * 2);
    } else if (operator === "min") {
      newBetAmount = betRange.min;
    } else if (operator === "max") {
      newBetAmount = betRange.max;
    } else {
      newBetAmount = Math.max(
        betRange.min,
        Math.min(betRange.max, parseFloat(e.target.value || "0"))
      );
    }
    setBetAmount(newBetAmount);
    setSliderPercentage(
      ((newBetAmount - betRange.min) / (betRange.max - betRange.min)) * 100
    );
    updateUSD();
  };

  const handleGoNextRound = (isHi) => () => {
    if (!canGoNext || isLoading) return;
    onHiloNextRound({ type: 'HILO_NEXT_ROUND', payload: { hi: isHi, lo: !isHi, skip: false } });
  };

  const handleSkip = () => {
    if (!canSkip || isLoading) return;
    onHiloNextRound({ type: 'HILO_NEXT_ROUND', payload: { hi: false, lo: false, skip: true } });
  };

  const handleBetOrCashout = () => {
    if (!user) {
      Modalroutes("login", "auth");
      return;
    }
    if ((!canBet && !canCashOut) || isLoading) return;
    if (hiloGame?.bet_id && !hiloGame.has_ended) {
      onHiloCashout({ type: 'HILO_CASHOUT' });
    } else {
      onHiloBet({
        type: 'HILO_BET',
        payload: {
          token: activeWallet?.coin_name,
          token_img: activeWallet?.coin_image,
          bet_amount: betAmount,
        }
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!hotkeysEnabled) return;
      switch (event.key.toUpperCase()) {
        case "A":
          handleAdjustBet("/")();
          break;
        case "S":
          handleAdjustBet("*")();
          break;
        case " ":
          handleBetOrCashout();
          break;
        case "Q":
          handleGoNextRound(true)();
          break;
        case "W":
          handleGoNextRound(false)();
          break;
        case "E":
          handleSkip();
          break;
        case "R":
          handleBetOrCashout();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeysEnabled, handleAdjustBet, handleBetOrCashout, handleGoNextRound, handleSkip]);


  return (
    <div id="Hilo-control-0" className={`sc-hLVXRe cYiOHZ game-control style0`}>
      <div className="game-control-panel">
        <div className="sc-fSDTwv kqpylJ">
          <div className="sc-fUQcsx kqrzPs betting">
            <div
              className={`sc-ezbkAF gWrsXy input sc-fvxzrP gOLODp sc-gsFzgR gcQjQT fCSgTW game-coininput ${inputDisabled ? 'disabled' : ''}`}
            >
              <div className="input-label">
                <div className="sc-hmvnCu efWjNZ label">
                  <div>Amount</div>
                  <div className="max-profit">
                    {/* <Tooltip text="Max Profit:&nbsp; 5000.00000">
                      <svg
                        xmlns="http://www.w3.org/1999/xlink"
                        className="sc-gsDKAQ hxODWG icon"
                      >
                        <use xlinkHref="#icon_Inform"></use>
                      </svg>
                    </Tooltip> */}
                  </div>
                </div>
                {/* <div className="label-amount">{usd} USD</div> */}
              </div>
              <div className={`input-control ${isFocused ? 'is-focus' : ''}`}>
                <input
                  onChange={handleAdjustBet("set")}
                  onBlur={() => setIsFocused(false)}
                  onFocus={() => setIsFocused(true)}
                  type="text"
                  value={betAmount.toFixed(6)}
                  disabled={inputDisabled}
                />
                <img alt="" className="coin-icon" src={activeWallet?.coin_image} />
                <div className="sc-kDTinF bswIvI button-group">
                  <button disabled={inputDisabled} onClick={handleAdjustBet("/")}>
                    /2
                  </button>
                  <button disabled={inputDisabled} onClick={handleAdjustBet("*")}>
                    x2
                  </button>
                  {sliderOpened && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="fix-layer"
                      style={{ opacity: 1, transform: 'none' }}
                    >
                      <button
                        onClick={handleAdjustBet("min")}
                        className={betAmount <= betRange.min ? "active" : ""}
                      >
                        Min
                      </button>
                      <div ref={sliderRef} className="sc-kLwhqv eOA-dmL slider">
                        <div className="slider-after" style={{ transform: `scaleX(${sliderPercentage / 100})` }}></div>
                        <div
                          onPointerDown={() => setIsGrabbing(true)}
                          className="slider-handler-wrap"
                          style={{ transform: `translateX(${sliderPercentage}%)` }}
                        >
                          <button className="slider-handler"></button>
                        </div>
                        <div
                          className="slider-before"
                          style={{ transform: `scaleX(${1 - sliderPercentage / 100})` }}
                        ></div>
                      </div>
                      <button
                        onClick={handleAdjustBet("max")}
                        className={betAmount === betRange.max ? "active" : ""}
                      >
                        Max
                      </button>
                    </div>
                  )}
                  <button
                    disabled={inputDisabled}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inputDisabled) return;
                      setSliderOpened(true);
                    }}
                    className="sc-cAhXWc cMPLfC"
                  >
                    <svg
                      xmlns="http://www.w3.org/1999/xlink"
                      className="sc-gsDKAQ hxODWG icon"
                    >
                      <use xlinkHref="#icon_Arrow"></use>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/1999/xlink"
                      className="sc-gsDKAQ hxODWG icon"
                    >
                      <use xlinkHref="#icon_Arrow"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="sc-ezbkAF gcQjQT input">
              <div className="input-label">Total Profit ({controlStats.payout}x)</div>
              <div className="input-control">
                <input readOnly value={controlStats.profit} />
                <img alt="" className="amount-ico" src={activeWallet?.coin_image} />
              </div>
            </div>
            <div className="sc-ezbkAF gcQjQT input">
              <div className="input-label">
                Profit Higher {controlStats.hiMultiplier
                  ? `(${controlStats.hiMultiplier}x)`
                  : ""}
              </div>
              <div className="input-control">
                <svg className="hi_lo hi" viewBox="0 0 32 32">
                  <path d="M16 3l10.833 12.588-4.815-0 0.001 13.413h-12.037l-0-13.413-4.814 0 10.833-12.588z"></path>
                </svg>
                <input readOnly value={controlStats.hiProfit} />
                <img alt="" className="amount-ico" src={coinImage} />
              </div>
            </div>
            <div className="sc-ezbkAF gcQjQT input">
              <div className="input-label">
                Profit Lower {controlStats.loMultiplier
                  ? `(${controlStats.loMultiplier}x)`
                  : ""}
              </div>
              <div className="input-control">
                <svg className="hi_lo lo" viewBox="0 0 32 32">
                  <path d="M16 29.153l10.756-13.018-4.781 0 0.001-13.289h-11.951l-0 13.289-4.78-0 10.756 13.018z"></path>
                </svg>
                <input readOnly value={controlStats.loProfit} />
                <img alt="" className="amount-ico" src={coinImage} />
              </div>
            </div>
          </div>
          <div className="inline-btns">
            <button
              onClick={handleGoNextRound(true)}
              disabled={!canGoNext}
              className="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-normal sc-iJCbQK ggpSWG hilo-guess-btn"
            >
              <div className="button-inner">
                <svg className="hi" viewBox="0 0 32 32">
                  {controlStats.hiGuess === 4 ? (
                    <path d="M29.222 18.833v5.667h-26.444v-5.667h26.444zM29.222 7.5v5.667h-26.444v-5.667h26.444z"></path>
                  ) : (
                    <path d="M16 3l10.833 12.588-4.815-0 0.001 13.413h-12.037l-0-13.413-4.814 0 10.833-12.588z"></path>
                  )}
                </svg>
                <div className="flex-1">
                  <div className="text hi">
                    {controlStats.hiGuess === 4
                      ? "Same"
                      : currentRound?.rank === ranks[0]
                      ? "Higher"
                      : "Higher or Same"}
                  </div>
                  <div className="chance">{controlStats.hiChance}%</div>
                </div>
              </div>
            </button>
            <button
              onClick={handleGoNextRound(false)}
              disabled={!canGoNext}
              className="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-normal sc-iJCbQK ggpSWG hilo-guess-btn"
            >
              <div className="button-inner">
                <svg className="lo" viewBox="0 0 32 32">
                  {controlStats.loGuess === 4 ? (
                    <path d="M29.222 18.833v5.667h-26.444v-5.667h26.444zM29.222 7.5v5.667h-26.444v-5.667h26.444z"></path>
                  ) : (
                    <path d="M16 29.153l10.756-13.018-4.781 0 0.001-13.289h-11.951l-0 13.289-4.78-0 10.756 13.018z"></path>
                  )}
                </svg>
                <div className="flex-1">
                  <div className="text lo">
                    {controlStats.loGuess === 4
                      ? "Same"
                      : currentRound?.rank === ranks[ranks.length - 1]
                      ? "Lower"
                      : "Lower or Same"}
                  </div>
                  <div className="chance">{controlStats.loChance}%</div>
                </div>
              </div>
            </button>
          </div>
          <button
            onClick={handleSkip}
            disabled={!canSkip}
            className="sc-iqseJM sc-crHmcD cBmlor gEBngo button button-normal skip-btn flex-btn"
          >
            <div className="button-inner">
              <span>Skip</span>
              <svg viewBox="0 0 32 32" className="skip-ico">
                <path d="M18.356 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059zM5.029 4.39l11.505 11.548-11.505 11.671-2.89-2.782 8.15-8.889-8.15-8.49 2.89-3.059z"></path>
              </svg>
            </div>
          </button>
          <button
            disabled={(!!currentRound && !hiloGame?.has_ended ? !canCashOut : !canBet) || isLoading}
            onClick={handleBetOrCashout}
            className="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-big bet-button cashout-btn"
          >
            {isLoading ? (
              <Loader />
            ) : (
              <div className="button-inner">
                {!!currentRound && !hiloGame?.has_ended ? "Cashout" : "Bet"}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
