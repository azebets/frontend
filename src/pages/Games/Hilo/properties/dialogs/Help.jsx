import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const Help = ({ onClose }) => {
  const [currentTab, setCurrentTab] = useState(1);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="sc-bkkeKt kBjSXI" style={{ opacity: 1 }}>
      <div
        className="dialog"
        style={{
          opacity: 1,
          width: '464px',
          height: '582px',
          marginTop: '-291px',
          marginLeft: '-232px',
          transform: 'scale(1) translateZ(0px)',
        }}
      >
        {currentTab !== 1 && (
          <button
            onClick={() => setCurrentTab(1)}
            className="dialog-back"
            style={{ opacity: 1, transform: 'none' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="sc-gsDKAQ hxODWG icon"
            >
              <use xlinkHref="#icon_Arrow"></use>
            </svg>
          </button>
        )}
        <div className={`dialog-head has-close ${currentTab !== 1 ? 'has-back' : ''}`}>
          <div className="dialog-title">Help</div>
        </div>
        <button
          onClick={handleClose}
          className="sc-ieecCq fLASqZ close-icon dialog-close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_Close"></use>
          </svg>
        </button>
        <CSSTransition
          in={currentTab === 1}
          timeout={150}
          classNames="fade"
          unmountOnExit
        >
          <div
            className="dialog-body default-style"
            style={{ zIndex: 2, transform: 'none' }}
          >
            <div className="sc-dkPtRN jScFby scroll-view sc-cfJLRR cTaiTH">
              <div className="help-list">
                <div onClick={() => setCurrentTab(2)}>
                  <span>What Game Is This?</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-gsDKAQ hxODWG icon"
                  >
                    <use xlinkHref="#icon_Arrow"></use>
                  </svg>
                </div>
                <div onClick={() => setCurrentTab(3)}>
                  <span>Fairness</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-gsDKAQ hxODWG icon"
                  >
                    <use xlinkHref="#icon_Arrow"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={currentTab === 2}
          timeout={150}
          classNames="fade"
          unmountOnExit
        >
          <div
            className="dialog-body default-style"
            style={{ zIndex: 3, transform: 'none' }}
          >
            <div className="sc-dkPtRN jScFby scroll-view sc-jCHUfY cruphB">
              <div className="item">
                <h2>What Is Hi-lo?</h2>
                <div className="content">
                  <p>
                    Hi-lo is an online single player guessing game in which you
                    guess the card point is higher (hi) or lower (lo) compared to
                    the previous one.
                  </p>
                </div>
                <h2>How To Play It?</h2>
                <div className="content">
                  <p>The game is not timed.</p>
                  <p>Click "Bet" to start betting and get the first card.</p>
                  <p>
                    At this point you can guess the next card is "higher or same" or
                    "lower or same" or "skip".
                  </p>
                  <p>
                    If you guess right, you will get the corresponding payout. You
                    can choose to claim the win and stop this round or continue
                    guessing the next card.
                  </p>
                  <p>The more cards you guess, the bigger payout you get.</p>
                  <p>There is no max payout, only bet and profit limits.</p>
                  <p>
                    Ace is the lowest card, king is the highest card. The value
                    order is K,Q,J,10,9,8,7,6,5,4,3,2,A.
                  </p>
                </div>
                <h2>What Is the Return Rate of Hi-lo?</h2>
                <div className="content"><p>1% House Edge.</p></div>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={currentTab === 3}
          timeout={150}
          classNames="fade"
          unmountOnExit
        >
          <div
            className="dialog-body default-style"
            style={{ zIndex: 4, transform: 'none' }}
          >
            <div className="sc-dkPtRN jScFby scroll-view sc-jCHUfY cruphB">
              <div className="item">
                <h2>How Are the Results Calculated?</h2>
                <div className="content">
                  <p>
                    We calculate the hash value of the combination with HMAC_SHA256.
                    This gives us a 64-character hexadecimal string: hash =
                    HMAC_SHA256 (clientSeed:nonce:round, serverSeed).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Help;
