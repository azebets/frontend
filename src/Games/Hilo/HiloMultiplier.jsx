import React from 'react';

export default function HiloMultiplier() {
  return (
    <div className="flex flex-col gap-2 wrap svelte-73syg7">
      {/* Profit Higher */}
      <div className="profit">
        <label className="flex flex-col gap-1">
          <span
            style={{ color: "rgb(177, 186, 211)" }}
            className="text-xs font-bold mb-1"
          >
            Profit Higher (2.15×)
          </span>
          <div
            className="flex items-center gap-2 rounded px-2 py-1 shadow"
            style={{ backgroundColor: "rgb(47, 69, 83)" }}
          >
            <span className="">
              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
                <title></title>
                <path d="M64 32.8 32 .8l-32 32h16.234v30.4H47.78V32.8z"></path>
              </svg>
            </span>
            <input
              autoComplete="on"
              readOnly
              className="input w-10 bg-transparent flex-1 text-gray-200 text-center outline-none border-0 focus:ring-0"
              type="text"
              data-test="profit-input"
              value="0.000000"
            />
            <span>
              <svg fill="none" viewBox="0 0 96 96" className="svg-icon " > <title></title> <path fill="#26A17B" d="M96 48c0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0s48 21.49 48 48"></path><path fill="#fff" d="M53.766 52.149v-.006c-.33.024-2.031.126-5.826.126-3.03 0-5.163-.09-5.913-.126v.009c-11.664-.513-20.37-2.544-20.37-4.974 0-2.427 8.706-4.458 20.37-4.98v7.932c.762.054 2.946.183 5.964.183 3.62 0 5.436-.15 5.775-.18v-7.929c11.64.519 20.325 2.55 20.325 4.974 0 2.43-8.685 4.455-20.325 4.971m0-10.77v-7.098h16.242V23.457H25.785v10.824h16.242v7.095c-13.2.606-23.127 3.222-23.127 6.354s9.927 5.745 23.127 6.354V76.83h11.739V54.078c13.179-.606 23.082-3.219 23.082-6.348s-9.903-5.742-23.082-6.351"></path></svg>
            </span>
          </div>
        </label>
      </div>
      {/* Profit Lower */}
      <div className="profit">
        <label className="flex flex-col gap-1">
          <span
            style={{ color: "rgb(177, 186, 211)" }}
            className="text-xs font-bold mb-1"
          >
            Profit Lower (1.61×)
          </span>
          <div
            className="flex items-center gap-2 rounded px-2 py-1 shadow input-wrap svelte-1w7n5sk"
            style={{ backgroundColor: "rgb(47, 69, 83)" }}
          >
            <span>
              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon w-5 h-5">
                <title></title>
                <path d="m0 31.199 32 32 32-32H47.78V.8H16.234v30.398z"></path>
              </svg>
            </span>
            <input
              autoComplete="on"
              readOnly
              className="input bg-transparent w-10 flex-1 text-gray-200 text-center outline-none border-0 focus:ring-0"
              type="text"
              data-test="profit-input"
              value="0.000000"
            />
            <span>
              <svg fill="none" viewBox="0 0 96 96" className="svg-icon w-5 h-5">
                <title></title>
                <path fill="#26A17B" d="M96 48c0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0s48 21.49 48 48"></path>
                <path fill="#fff" d="M53.766 52.149v-.006c-.33.024-2.031.126-5.826.126-3.03 0-5.163-.09-5.913-.126v.009c-11.664-.513-20.37-2.544-20.37-4.974 0-2.427 8.706-4.458 20.37-4.98v7.932c.762.054 2.946.183 5.964.183 3.62 0 5.436-.15 5.775-.18v-7.929c11.64.519 20.325 2.55 20.325 4.974 0 2.43-8.685 4.455-20.325 4.971m0-10.77v-7.098h16.242V23.457H25.785v10.824h16.242v7.095c-13.2.606-23.127 3.222-23.127 6.354s9.927 5.745 23.127 6.354V76.83h11.739V54.078c13.179-.606 23.082-3.219 23.082-6.348s-9.903-5.742-23.082-6.351"></path>
              </svg>
            </span>
          </div>
        </label>
      </div>
      {/* Total Profit */}
      <div className="profit">
        <label className="flex flex-col gap-1">
          <span
            style={{ color: "rgb(177, 186, 211)" }}
            className="text-xs font-bold mb-1"
          >
            Total Profit (1.00×)
          </span>
          <div
            className="flex items-center gap-2 rounded px-2 py-1 shadow"
            style={{ backgroundColor: "rgb(47, 69, 83)" }}
          >
            <span className="w-5 h-5 before-icon svelte-1w7n5sk" />
            <input
              autoComplete="on"
              readOnly
              className="input bg-transparent w-10 flex-1 text-gray-200 text-center outline-none border-0 focus:ring-0"
              type="text"
              data-test="profit-input"
              value="0.000000"
            />
            <span>
              <svg fill="none" viewBox="0 0 96 96" className="svg-icon w-5 h-5">
                <title></title>
                <path fill="#26A17B" d="M96 48c0 26.51-21.49 48-48 48S0 74.51 0 48 21.49 0 48 0s48 21.49 48 48"></path>
                <path fill="#fff" d="M53.766 52.149v-.006c-.33.024-2.031.126-5.826.126-3.03 0-5.163-.09-5.913-.126v.009c-11.664-.513-20.37-2.544-20.37-4.974 0-2.427 8.706-4.458 20.37-4.98v7.932c.762.054 2.946.183 5.964.183 3.62 0 5.436-.15 5.775-.18v-7.929c11.64.519 20.325 2.55 20.325 4.974 0 2.43-8.685 4.455-20.325 4.971m0-10.77v-7.098h16.242V23.457H25.785v10.824h16.242v7.095c-13.2.606-23.127 3.222-23.127 6.354s9.927 5.745 23.127 6.354V76.83h11.739V54.078c13.179-.606 23.082-3.219 23.082-6.348s-9.903-5.742-23.082-6.351"></path>
              </svg>
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
