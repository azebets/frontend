import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import GameControls from "./properties/GameControls";
import GameActions from "./properties/GameActions";
import GameView from "./properties/GameView";
import AllBets from "./properties/AllBets";
import MyBets from "./properties/MyBets";

import SM from "./properties/audio/SoundManager.js";
import { HiloProvider, HiloContext } from "./properties/store";
import { AppContext } from "../../../context/AppContext.jsx";

const Hilo = () => {
const { soundManager, setSoundSettings,setSoundManager, stateManagement, socketEvents, setHotkeysEnabled } = React.useContext(HiloContext)
const { processingRequest, hiloGame } = stateManagement; 
const {user} = React.useContext(AppContext)

const [currentTab, setCurrentTab] = useState(1);
const [SE, setSE] = useState(null);

useEffect(() => {
  if (user?.user_id && !SE) {
    const socket = socketEvents(user.user_id);
    socket.handleHiloInit({ user_id: user.user_id });
    setSE(socket);
  }

  const hotkeys = localStorage.getItem("HILO_HOTKEYS_ENABLED") === "true";
  setHotkeysEnabled(hotkeys);

  let settings = localStorage.getItem("HILO_SOUND_SETTINGS");
  settings = settings ? JSON.parse(settings) : { music: true, soundFx: true };
  setSoundSettings(settings);

  setSoundManager(
    new SM({ hilo: { enabled: settings.music } }, settings.soundFx)
  );


  return () => {
    soundManager?.stop();
  };
}, [SE, user]);



const handleBet = (e) => {
  if (SE && !processingRequest) {
    SE.handleHiloBet({
      token: e.token,
      token_img: e.token_img,
      user_id: user.user_id,
      bet_amount: e.bet_amount,
    });
  }
};

const handleNextRound = (e) => {
  if (SE && !processingRequest) {
    const { bet_id, token, token_img, payout, bet_amount } = hiloGame;
    SE.handleHiloNextRound({
      hi: e.hi,
      lo: e.lo,
      user_id: user.user_id,
      skip: e.skip,
      bet_id,
      bet_amount,
      token,
      token_img,
      payout,
    });
  }
};

const handleCashOut = (e) => {
  if (SE && !processingRequest) {
    const { bet_id, token, token_img, payout, bet_amount } = hiloGame;
    SE.handleHiloCashout({
      user_id: user.user_id,
      bet_id,
      bet_amount,
      token,
      token_img,
      payout,
    });
  }
};

return (
  <div
    id="game-Hilo"
    className={`sc-haTkiu lmWKWf game-style0 sc-hKumaY hmdAmi `}
    style={{ opacity: 1, transform: "none" }}
  >
    <div className="game-area">
      <div className={`game-main`}>
        <GameControls
          onHiloNextRound={handleNextRound}
          onHiloCashout={handleCashOut}
          onHiloBet={handleBet}
        />
         
        <GameView onHiloNextRound={handleNextRound} />
       <GameActions />
      </div>
    </div>
    <div className="sc-cxpSdN kQfmQV tabs game-tabs len-2">
      <div className="tabs-navs">
        <button
          onClick={() => setCurrentTab(1)}
          className={`tabs-nav ${currentTab === 1 ? "is-active" : ""}`}
        >
          All Bets
        </button>
        <button
          onClick={() => setCurrentTab(2)}
          className={`tabs-nav ${currentTab === 2 ? "is-active" : ""}`}
        >
          My Bets
        </button>
        <div
          className="bg is-reverse"
          style={{ width: "50%", left: currentTab === 2 ? "50%" : "0" }}
        ></div>
      </div>
      <div className="tabs-view" style={{ transform: "none" }}>
        {currentTab === 1 ? <AllBets /> : <MyBets />}
      </div>
    </div>
    <div className="sc-knKHOI cFxmZX">
      <div className="intro-title">
        <p>Hilo</p>
        <div className="intro-tags">
          <p>Our Best Games</p>
          <p>BC Originals</p>
          <p>Cards</p>
          <p>BC Table Games</p>
          <p>Table games</p>
          <p>Original</p>
        </div>
      </div>
      <div className="description">
        Hi-lo is an online single player guessing game in which you guess the
        card point is higher (hi) or lower (lo) compared to the previous one.
      </div>
      <button className="intro-detail">
        Details
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="sc-gsDKAQ hxODWG icon"
        >
          <use xlinkHref="#icon_Arrow"></use>
        </svg>
      </button>
    </div>
  </div>
);
};

const HiloWrapper = () => {
  return (
    <HiloProvider>
      <Hilo />
    </HiloProvider>
  );
};

export default HiloWrapper;