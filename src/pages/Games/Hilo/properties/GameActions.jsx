import React, { useState, useEffect, useContext } from 'react';
import { HiloContext } from "./store";
import Hotkeys from "./dialogs/Hotkeys";
import LiveStats from "./dialogs/LiveStats";
import Help from "./dialogs/Help";
import HiloDialog from "./dialogs/HiloDialog";

const GameActions = () => {
  const { soundSettings, soundManager, hiloGame, setSoundManager } = useContext(HiloContext);
  const [showHotkeyDialog, setShowHotkeyDialog] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showLiveStatsDialog, setShowLiveStatsDialog] = useState(false);
  const [hiloDialogDialogData, setHiloDialogDialogData] = useState(null);

  const handChangeSettings = (settings) => {
    return (e) => {
      const newSettings = { ...soundSettings, ...settings };
      localStorage.setItem("HILO_SOUND_SETTINGS", JSON.stringify(newSettings));
      setSoundManager(newSettings);
      if (settings.music !== undefined) {
        if (!newSettings.music) {
          soundManager.pause("hilo");
        } else {
          soundManager.play("hilo");
        }
      }
      soundManager.setAudioEnabled(newSettings.soundFx);
    };
  };

  return (
    <>
      <div className="game-actions">
        <button
          onClick={handChangeSettings({ music: !soundSettings.music })}
          className={`action-item ${soundSettings.music ? 'active' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref={`#icon_Music${soundSettings.music ? 'On' : 'Off'}`} />
          </svg>
        </button>
        <button
          onClick={handChangeSettings({ soundFx: !soundSettings.soundFx })}
          className={`action-item ${soundSettings.soundFx ? 'active' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref={`#icon_Sound${soundSettings.soundFx ? 'On' : 'Off'}`} />
          </svg>
        </button>
        {/* {screenWidth > 660 && ( */}
          <button onClick={() => setShowHotkeyDialog(true)} className="action-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="sc-gsDKAQ hxODWG icon"
            >
              <use xlinkHref="#icon_HotKeys" />
            </svg>
          </button>
        {/* )} */}
        <button
          onClick={() => {
            if (hiloGame?.bet_id) {
              setHiloDialogDialogData({
                betID: hiloGame.bet_id,
                tab: 2,
              });
            }
          }}
          className="action-item"
          id="set_seed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_Seed" />
          </svg>
        </button>
        <button onClick={() => setShowLiveStatsDialog(true)} className="action-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_LiveStats" />
          </svg>
        </button>
        <button onClick={() => setShowHelpDialog(true)} className="action-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="sc-gsDKAQ hxODWG icon"
          >
            <use xlinkHref="#icon_Help" />
          </svg>
        </button>
      </div>
      {showHotkeyDialog && <Hotkeys onClose={() => setShowHotkeyDialog(false)} />}
      {showHelpDialog && <Help onClose={() => setShowHelpDialog(false)} />}
      {showLiveStatsDialog && <LiveStats onClose={() => setShowLiveStatsDialog(false)} />}
      {Boolean(hiloDialogDialogData) && (
        <HiloDialog
          launchConf={hiloDialogDialogData}
          onClose={() => setHiloDialogDialogData(null)}
        />
      )}

    </>
  );
};

export default GameActions;
