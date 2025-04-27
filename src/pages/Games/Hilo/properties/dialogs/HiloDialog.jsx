import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import GameDetails from './components/GameDetails';
import SeedSettings from './components/SeedSettings';
import VerifyGame from './components/VerifyGame';

const HiloDialog = ({ launchConf, onClose }) => {
  const [betID, setBetID] = useState(null);
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    setBetID(launchConf?.betID);
    setCurrentTab(launchConf?.tab || 1);
  }, [launchConf]);

  if (!betID) return null;
  const screen = 1234
  const dialogStyle = screen < 650
    ? { transform: 'scale(1) translateZ(0px)' }
    : { opacity: 1, width: '464px', height: '631px', marginTop: '-315.5px', marginLeft: '-232px' };

  return (
    <div className="sc-bkkeKt kBjSXI" style={{ opacity: 1 }}>
      <div className="dialog" style={dialogStyle}>
        {launchConf.tab === 1 && currentTab !== 1 && (
          <button onClick={() => setCurrentTab(1)} className="dialog-back" style={{ opacity: 1, transform: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="sc-gsDKAQ hxODWG icon">
              <use xlinkHref="#icon_Arrow"></use>
            </svg>
          </button>
        )}
        <div className={`dialog-head has-close ${launchConf.tab === 1 && currentTab !== 1 ? 'has-back' : ''}`}>
          <div className="dialog-title">
            {currentTab === 1 ? "Details" : currentTab === 2 ? "Seed Settings" : "Fairness"}
          </div>
        </div>
        <button onClick={onClose} className="sc-ieecCq fLASqZ close-icon dialog-close">
          <svg xmlns="http://www.w3.org/2000/svg" className="sc-gsDKAQ hxODWG icon">
            <use xlinkHref="#icon_Close"></use>
          </svg>
        </button>
        <CSSTransition
          in={currentTab === 1}
          timeout={150}
          classNames="slide-left"
          unmountOnExit
        >
          <div className="dialog-body default-style" style={{ zIndex: 2, transform: 'none' }}>
            <GameDetails betID={betID} onSetupSeeds={() => setCurrentTab(2)} onVerify={() => setCurrentTab(3)} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={currentTab === 2}
          timeout={150}
          classNames="slide-right"
          unmountOnExit
        >
          <div className="dialog-body default-style" style={{ zIndex: 2, transform: 'none' }}>
            <SeedSettings
              fromDetail={launchConf.tab === 1}
              onClose={(fromDetail) => {
                if (fromDetail) setCurrentTab(3);
                else onClose();
              }}
            />
          </div>
        </CSSTransition>
        <CSSTransition
          in={currentTab === 3}
          timeout={150}
          classNames="slide-right"
          unmountOnExit
        >
          <div className="dialog-body default-style" style={{ zIndex: 2, transform: 'none' }}>
            <VerifyGame betID={betID} />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default HiloDialog;

// CSS styles remain the same, but should be moved to a separate CSS file or styled-components
