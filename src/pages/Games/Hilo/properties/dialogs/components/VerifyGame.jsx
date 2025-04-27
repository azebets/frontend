import React, { useState, useEffect } from 'react';
import Loader from "../../../../../../components/Loader";
import useDeck from "../../hooks/useDeck";
import CryptoJS from "crypto-js";
import { fetchData } from "../../../../hook/useFetchData";

const VerifyGame = ({ betID }) => {
  const { getCardAt, getCardNumber } = useDeck();
  const [gameDetails, setGameDetails] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [verifyConfig, setVerifyConfig] = useState({
    hashPairs: [],
    decimalPairs: [],
    calcValues: [],
    sum: 0,
    index: 0,
    card: null,
    hmac: "",
    cardNumber: 0,
  });

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await fetchData(
          `/hilo-game/details/${betID}`
        );
        setGameDetails(data);
        setCurrentRound(data.betLog.round);
        calculateDrawnCard(data, data.betLog.round);
      } catch (error) {
        // error_msg.set(error.message);
        console.log(error)
      }
    };
    fetchGameDetails();
  }, [betID]);

  const handleRoundChange = (e) => {
    const newRound = parseInt(e.target.value || "0");
    setCurrentRound(newRound);
    calculateDrawnCard(gameDetails, newRound);
  };

  const calculateDrawnCard = (details, round) => {
    const hashPairs = [];
    const decimalPairs = [];
    const calcValues = [];
    let sum = 0;
    const hmac = String(
      CryptoJS.HmacSHA256(
        `${details.seedHistory.clientSeed}:${details.betLog.nonce}:${round}`,
        details.seedHistory.serverSeed
      )
    );
    for (let i = 0; i < hmac.length / 2; i++) {
      const pair = hmac.substring(i * 2, i * 2 + 2);
      const pairDecimal = parseInt(pair, 16);
      hashPairs.push(pair);
      decimalPairs.push(pairDecimal);
      if (i < 4) {
        const calc = pairDecimal / 256 ** (i + 1);
        calcValues.push(calc);
        sum += calc;
      }
    }
    const index = sum * 52;
    const card = getCardAt(Math.floor(index));

    setVerifyConfig({
      hashPairs,
      decimalPairs,
      sum,
      index,
      card,
      hmac,
      calcValues,
      cardNumber: getCardNumber(Math.floor(index)),
    });
  };

  if (!gameDetails) {
    return <div style={{ height: '500px' }}><Loader /></div>;
  }

  return (
    <div className="sc-dkPtRN jScFby scroll-view sc-dMOJrz cBvmGv">
      <h2>Input</h2>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">Server Seed</div>
        <div className="input-control">
          <input
            type="text"
            readOnly
            value={gameDetails.seedHistory.serverSeed}
          />
        </div>
      </div>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">Client Seed</div>
        <div className="input-control">
          <input
            type="text"
            readOnly
            value={gameDetails.seedHistory.clientSeed}
          />
        </div>
      </div>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">Nonce</div>
        <div className="input-control">
          <input readOnly type="text" value={gameDetails.betLog.nonce} />
        </div>
      </div>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">Round</div>
        <div className="input-control">
          <input
            onChange={handleRoundChange}
            type="number"
            value={currentRound}
          />
        </div>
      </div>
      <h2>Output</h2>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">Sha256(server_seed)</div>
        <div className="input-control">
          <input
            type="text"
            readOnly
            value={gameDetails.seedHistory.serverSeedHash}
          />
        </div>
      </div>
      <div className="sc-ezbkAF kDuLvp input">
        <div className="input-label">
          HMAC_Sha256(client_seed:nonce:round, server_seed)
        </div>
        <div className="input-control">
          <input type="text" readOnly value={verifyConfig.hmac} />
        </div>
      </div>
      <h3>Bytes</h3>
      <div className="sc-hAWBJg fgopBr">
        <table className="byte-table">
          <tbody>
            <tr>
              {verifyConfig.hashPairs.map((pair, index) => (
                <td key={`${index}_${pair}`}>{pair}</td>
              ))}
            </tr>
            <tr>
              {verifyConfig.decimalPairs.map((pair, index) => (
                <td key={`${index}_${pair}`}>{pair}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Bytes to Number</h3>
      <div className="sc-hAWBJg fgopBr">
        <div className="flex">
          <table className="sc-dYtuZ fWuhdN">
            <tbody>
              <tr>
                <td colSpan="3">
                  <span>(</span>
                  <span className="cl-primary">
                    {verifyConfig.decimalPairs.slice(0, 4).join()}
                  </span>
                  <span>) =&gt; [0, ..., 52)</span>
                  <br />
                  <span>= </span>
                  <span className="cl-primary">28</span>
                </td>
              </tr>
              {verifyConfig.calcValues.map((value, index) => (
                <tr key={index}>
                  <td>{index === 0 ? '' : '+'}</td>
                  <td>{value.toFixed(8)}</td>
                  <td>({verifyConfig.decimalPairs[index]} / (256^{index + 1}))</td>
                </tr>
              ))}
              <tr>
                <td>=</td>
                <td>{verifyConfig.sum}</td>
              </tr>
              <tr>
                <td>*</td>
                <td className="cl-primary">52</td>
              </tr>
              <tr>
                <td>=</td>
                <td className="cl-primary">{verifyConfig.index}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h2>Final Result</h2>
      <div className="sc-eTwdGJ ipqrmS">
        <div>
          <span className="card">
            {`${verifyConfig.card?.suite}${verifyConfig.card?.rank}`}
          </span>
          ,{Math.floor(verifyConfig.index)},{verifyConfig.cardNumber}
        </div>
        <hr />
        <div className="table-wrap">
          <table>
            <tbody>
              <tr>
                {[...Array(52)].map((_, i) => (
                  <td key={i}>{i}</td>
                ))}
              </tr>
              <tr>
                {[...Array(52)].map((_, i) => (
                  <td key={i}>
                    <span className="card">{getCardAt(i).suite + getCardAt(i).rank}</span>
                  </td>
                ))}
              </tr>
              <tr>
                {[...Array(52)].map((_, i) => (
                  <td key={i}>{161 + i}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerifyGame;
