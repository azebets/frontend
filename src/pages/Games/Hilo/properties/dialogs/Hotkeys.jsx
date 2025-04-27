import React, { useState, useEffect, useContext } from 'react';
import { HiloContext } from '../store';

const Hotkeys = ({ onClose }) => {
  const {hotkeysEnabled, setHotkeysEnabled} = useContext(HiloContext)

  const handleToggleHotKeys = () => {
    setHotkeysEnabled(!hotkeysEnabled);
    localStorage.setItem("HILO_HOTKEYS_ENABLED", hotkeysEnabled ? "true" : "false");
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
        <div className="dialog-head has-close">
          <div className="dialog-title">Hot keys</div>
        </div>
        <button onClick={onClose} className="sc-ieecCq fLASqZ close-icon dialog-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_Close"></use>
          </svg>
        </button>
        <div className="dialog-body default-style" style={{ zIndex: 2, transform: 'none' }}>
          <div className="sc-dkPtRN jScFby scroll-view sc-hIagIn cxLQEF dialog-box">
            <div className="hotkey-list">
              <div className="hotkey-item">
                <div className="hotkey-txt">Half bet amount</div>
                <div className="hotkey-key">A</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Double bet amount</div>
                <div className="hotkey-key">S</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Make a bet</div>
                <div className="hotkey-key">Space</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Higher or Same</div>
                <div className="hotkey-key">Q</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Lower or Same</div>
                <div className="hotkey-key">W</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Skip Current Card</div>
                <div className="hotkey-key">E</div>
              </div>
              <div className="hotkey-item">
                <div className="hotkey-txt">Cashout</div>
                <div className="hotkey-key">R</div>
              </div>
            </div>
            <div className="hotkey-enabled">
              <div
                onClick={handleToggleHotKeys}
                className={`hotkey-select ${hotkeysEnabled ? "active" : ""}`}
              ></div>
              <div>Hotkeys Enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotkeys;
