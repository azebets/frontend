import React, { useState, useEffect } from 'react';
import { useHiloGame } from './context/HiloContext';

const HiloControl = ({ onNextRound, onCashout, onBet }) => {
  const { hiloGame, processingRequest } = useHiloGame();
  const [betAmount, setBetAmount] = useState('');

  const handleBetAmountChange = (e) => {
    setBetAmount(e.target.value);
  };

  const handleHalveBet = () => {
    const currentAmount = parseFloat(betAmount) || 0;
    setBetAmount((currentAmount / 2).toString());
  };

  const handleDoubleBet = () => {
    const currentAmount = parseFloat(betAmount) || 0;
    setBetAmount((currentAmount * 2).toString());
  };

  const handleBet = () => {
    onBet({
      token: 'usdt',
      token_img: '/assets/tokens/usdt.png',
      bet_amount: parseFloat(betAmount)
    });
  };

  const handleHigher = () => {
    onNextRound({ hi: true, lo: false, skip: false });
  };

  const handleLower = () => {
    onNextRound({ hi: false, lo: true, skip: false });
  };

  const handleSkip = () => {
    onNextRound({ hi: false, lo: false, skip: true });
  };

  return (
    <div className="game-sidebar svelte-1dz8jt" style={{ minHeight: "0px" }}>
      <label className="stacked svelte-1ww0eyq">
        <div className="input-wrap svelte-1w7n5sk">
          <div className="input-content svelte-1w7n5sk">
            <div className="after-icon svelte-1w7n5sk">
              <svg fill="none" viewBox="0 0 96 96" className="svg-icon " style={{}}>
                <title></title>
                <path fill="#26A17B" d="M96 48c0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0s48 21.49 48 48"></path>
                <path fill="#fff" d="M53.766 52.149v-.006c-.33.024-2.031.126-5.826.126-3.03 0-5.163-.09-5.913-.126v.009c-11.664-.513-20.37-2.544-20.37-4.974 0-2.427 8.706-4.458 20.37-4.98v7.932c.762.054 2.946.183 5.964.183 3.62 0 5.436-.15 5.775-.18v-7.929c11.64.519 20.325 2.55 20.325 4.974 0 2.43-8.685 4.455-20.325 4.971m0-10.77v-7.098h16.242V23.457H25.785v10.824h16.242v7.095c-13.2.606-23.127 3.222-23.127 6.354s9.927 5.745 23.127 6.354V76.83h11.739V54.078c13.179-.606 23.082-3.219 23.082-6.348s-9.903-5.742-23.082-6.351"></path>
              </svg>
            </div>
            <input
              autoComplete="on"
              className="input spacing-expanded svelte-1w7n5sk"
              type="number"
              data-test="input-game-amount"
              data-bet-amount-active-currency="usdt"
              step="1e-8"
              value={betAmount}
              onChange={handleBetAmountChange}
            />
          </div>
          <div className="input-button-wrap svelte-1w7n5sk">
            <button
              type="button"
              tabIndex="0"
              className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none"
              data-testid="amount-halve"
              data-test="amount-halve"
              data-button-root=""
              onClick={handleHalveBet}
            >
              ½
            </button>
            <button
              type="button"
              tabIndex="0"
              className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none"
              data-test="amount-double"
              data-testid="amount-double"
              data-button-root=""
              onClick={handleDoubleBet}
            >
              2×
            </button>
          </div>
        </div>
        <span className="label-content full-width svelte-1dxhb9v">
          <div className="label-left-wrapper svelte-1w7n5sk">
            <span slot="label">Bet Amount</span>
          </div>
          <div className="currency-conversion svelte-e4myuj">
            <div className="svelte-e4myuj">$0.00</div>
          </div>
        </span>
      </label>
      <button
        type="button"
        tabIndex="0"
        className="inline-flex relativ items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem]"
        data-test-action-enabled="false"
        data-testid="higher-button"
        data-test="higher-button"
        disabled={!hiloGame || processingRequest}
        data-button-root=""
        onClick={handleHigher}
      >
        <span>Higher</span>
        <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon " style={{ color: "#ffce00" }}>
          <title></title>
          <path d="M32.271 17 9.201 40.071 16.128 47l16.145-16.145L48.418 47l6.93-6.929L32.275 17z"></path>
        </svg>
        <span>
          <span className="weight-semibold line-height-default align-left size-default text-size-default variant-subtle numeric with-icon-space svelte-794yvu" style={{}}>
            92.31%
          </span>
        </span>
      </button>
      <button
        type="button"
        tabIndex="0"
        className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.8125rem] px-[1rem]"
        data-test-action-enabled="false"
        data-testid="lower-button"
        data-test="lower-button"
        disabled={!hiloGame || processingRequest}
        data-button-root=""
        onClick={handleLower}
      >
        <span>Same</span>
        <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon " style={{ color: "#7F47FD" }}>
          <title></title>
          <path d="M0 15.365h64v11.428H0zm0 21.842h64v11.428H0z"></path>
        </svg>
        <span>
          <span className="weight-semibold line-height-default align-left size-default text-size-default variant-subtle numeric with-icon-space svelte-794yvu" style={{}}>
            7.69%
          </span>
        </span>
      </button>
      <button
        type="button"
        tabIndex="0"
        className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem]"
        data-action-enabled="true"
        data-testid="skip-button"
        data-test="skip-button"
        data-button-root=""
        onClick={handleSkip}
      >
        <span>Skip Card</span>
        <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon " style={{}}>
          <title></title>
          <path fillRule="evenodd" d="m0 49.74 7.793 7.794L33.328 32 7.793 6.466 0 14.259 17.74 32zm30.672 0 7.793 7.794L64 32 38.465 6.466l-7.793 7.793L48.412 32z" clipRule="evenodd"></path>
        </svg>
      </button>
      <button
        type="button"
        tabIndex="0"
        className="inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-green-500 text-neutral-black hover:bg-green-400 hover:text-neutral-black focus-visible:outline-white text-base leading-none shadow-md py-[1.125rem] px-[1.75rem]"
        data-testid="bet-button"
        data-test="bet-button"
        data-analytics="bet-button"
        data-test-action-enabled="true"
        data-button-root=""
        onClick={handleBet}
      >
        <div data-loader-content="" className="contents">
          <span>Bet</span>
        </div>
      </button>
    </div>
  );
};

export default HiloControl;