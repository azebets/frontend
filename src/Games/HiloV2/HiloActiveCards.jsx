import React from 'react';

export default function HiloActiveCards() {
  return (
    <div className="footer scrollX svelte-1drtpsl">
      <div className="slide-down svelte-1drtpsl" style={{ "--slide-down-duration": "300ms" }}>
        <div className="slide-in svelte-qwqjm5">
          <button className="wrap svelte-1cwyebm" disabled>
            <div className="horizontal svelte-1cwyebm" style={{ "--transition-time": "300ms" }}>
              <div
                className="content svelte-1cwyebm small"
                style={{ width: "5em", height: "7.9em", "--transition-time": "300ms" }}
              >
                <div className="face none svelte-1cwyebm">
                  <div
                    className="face-content svelte-ofo6ka text-red-500 small"
                    style={{ color: "var(--red-500)" }}
                  >
                    <span>8</span>
                    <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
                      <title></title>
                      <path
                        fillRule="evenodd"
                        d="M30.907 55.396.457 24.946v.002A1.55 1.55 0 0 1 0 23.843c0-.432.174-.82.458-1.104l14.13-14.13a1.55 1.55 0 0 1 1.104-.458c.432 0 .821.175 1.104.458l14.111 14.13c.272.272.645.443 1.058.453l.1-.013h.004a1.55 1.55 0 0 0 1.045-.452l14.09-14.09a1.55 1.55 0 0 1 1.104-.457c.432 0 .82.174 1.104.457l14.13 14.121a1.557 1.557 0 0 1 0 2.209L33.114 55.396v-.002c-.27.268-.637.438-1.046.452v.001h.003l-.04.002h-.029c-.427 0-.815-.173-1.095-.453"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div
                  className="back svelte-1cwyebm"
                  style={{
                    backgroundImage: 'url(/assets/hilo/back-none.BGcPpGyo.svg)',
                  }}
                ></div>
              </div>
            </div>
          </button>
          <div className="payout-multiplier svelte-3yz8ax positive">Start Card</div>
        </div>
      </div>
    </div>
  );
}
