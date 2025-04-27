import React, { useState, useEffect, useCallback } from 'react';
import Loader from "../../../../../../components/Loader";
import { fetchData } from "../../../../hook/useFetchData";

const SeedSettings = ({ fromDetail, onClose }) => {
  const [gameSeeds, setGameSeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [clientSeeds, setClientSeeds] = useState('');

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const generateString = useCallback((length) => {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }, [characters]);

  useEffect(() => {
    setClientSeeds(generateString(10));
  }, [generateString]);

  const handleRandomSeed = () => {
    if (loading) return;
    setClientSeeds(generateString(10));
  };

  const handleUpdateSeeds = async () => {
    if (!clientSeeds || clientSeeds.length < 10) {
      console.log("client seed must have at least 10 characters");
      return;
    }
    try {
      setLoading(true);
      const data = await fetchData(
        `/hilo-game/user/update-seeds`,
        { client_seed: clientSeeds }
      );
      console.log(data)
      onClose(fromDetail);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGameSeeds = async () => {
      try {
        const data  = await fetchData(`/hilo-game/seeds`);
        setGameSeeds(data.seedHistory);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchGameSeeds();
  }, []);

  if (!gameSeeds) {
    return (
      <div style={{ height: '500px' }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="sc-dkPtRN jScFby scroll-view sc-hxaKAp iGYNgq dialog-box">
      <div className="warn">
        You may use this function to set a new server seed + a new client seed,
        they can be randomly generated or customized (at least 10 characters), and
        the number of bets will be reset to zero.
      </div>
      <div className="detailForm">
        <div className="title">Current seeds</div>
        <div className="sc-ezbkAF kDuLvp input">
          <div className="input-label">Server Seed (hash)</div>
          <div className="input-control">
            <input type="text" readOnly value={gameSeeds.serverSeedHash} />
          </div>
        </div>
        <div className="formFlex">
          <div className="sc-ezbkAF kDuLvp input">
            <div className="input-label">Client Seed</div>
            <div className="input-control">
              <input type="text" readOnly value={gameSeeds.clientSeed} />
            </div>
          </div>
          <div className="sc-ezbkAF kDuLvp input">
            <div className="input-label">Nonce</div>
            <div className="input-control">
              <input type="text" readOnly value={gameSeeds.maxNonce} />
            </div>
          </div>
        </div>
      </div>
      <div className="devide"></div>
      <div className="detailForm">
        <div className="title">New seeds</div>
        <div className="sc-ezbkAF kDuLvp input">
          <div className="input-label">Server Seed (hash)</div>
          <div className="input-control">
            <input
              type="text"
              placeholder="The seed hasn't been revealed yet"
              readOnly
              value={gameSeeds.nxt_hash}
            />
          </div>
        </div>
        <div className="formFlex">
          <div className="sc-ezbkAF kDuLvp input">
            <div className="input-label">Client Seed</div>
            <div className={`input-control ${isFocused ? 'is-focus' : ''}`}>
              <input
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                type="text"
                readOnly={loading}
                disabled={loading}
                onChange={(e) => setClientSeeds(e.target.value)}
                value={clientSeeds}
              />
              <svg
                onClick={handleRandomSeed}
                xmlns="http://www.w3.org/2000/svg"
                className="sc-gsDKAQ hxODWG icon rotate-icon"
              >
                <use xlinkHref="#icon_Refresh"></use>
              </svg>
            </div>
          </div>
          <div className="sc-ezbkAF kDuLvp input">
            <div className="input-label">Nonce</div>
            <div className="input-control">
              <input type="text" readOnly value="0" />
            </div>
          </div>
        </div>
      </div>
      <div className="submit">
        <button
          disabled={!clientSeeds || clientSeeds.length < 10 || loading}
          onClick={handleUpdateSeeds}
          className="sc-iqseJM sc-egiyK cBmlor fnKcEH button button-normal"
        >
          <div className="button-inner">
            {loading ? <Loader /> : 'Use New Seeds'}
          </div>
        </button>
      </div>
    </div>
  );
};

export default SeedSettings;
