import React from 'react';
import { useLimboGame } from './LimboContext';
import './style.css';
import MultiplierView from './MultiplierView';
import LimboHistory from "./LimboHistory"

const LimboCanvas = () => {
  const { gameState, lastRoll, mode, target, handleTargetChange, showResult} = useLimboGame();
  
  return (
    <div className="flex-grow relative rounded-lg overflow-hidden">
         <div className="w-full mb-12">
             <LimboHistory />
         </div>
    <div className='relative'>
      <div className="content svelte-1otmwc3">
        <div className='flex justify-center items-center py-8 mb-12'>
            <h1 className={`text-[120px] ${!lastRoll ? "text-white" : lastRoll?.won ? "text-green-600" : "text-red-600"} font-bold`}>{ lastRoll?.roll ? parseFloat(lastRoll?.roll).toFixed(2) : "0.00"}x</h1>
        </div>
        {/* <div className="wrap svelte-1esfxtl bg-gray-800 cursor-pointer" data-test-dice-condition="above" style={{"--slider-height": "8px", "--drag-size": "36px", "--max-game-board-width": "730px", "--lines-asset": "url(/assets/games/Dice/lines.T9v8Oznt.svg)"}}>
        <div className="wrap svelte-16rlbb1">
            <div className="content svelte-16rlbb1" style={{left: "0%"}}>
                <div className="value svelte-16rlbb1">0</div> 
            </div>
            <div className="content svelte-16rlbb1" style={{left: "25%"}}>
                <div className="value svelte-16rlbb1">25</div> 
            </div>
            <div className="content svelte-16rlbb1" style={{left: "50%"}}>
                <div className="value svelte-16rlbb1">50</div> 
            </div>
            <div className="content svelte-16rlbb1" style={{left: "75%"}}>
                <div className="value svelte-16rlbb1">75</div> 
            </div>
            <div className="content svelte-16rlbb1" style={{left: "100%"}}>
                <div className="value svelte-16rlbb1">100</div> 
            </div>
        </div> 
        <div className="content svelte-1esfxtl">
            {lastRoll && 
            <div className="translate-x svelte-zv80zt relative -z-50" style={{"--dice-slide-transition": "300ms", transform: `translate(${lastRoll?.roll}%, 0px)`}}>
                <div className="hide-show neutral flex svelte-zv80zt is-hidden justify-center items-center" style={{"--dice-scale-transition": "500ms"}}>
                    <img className="dice svelte-zv80zt w-17" src="/assets/games/Dice/classic-dice.BVpplMR8.svg" alt="Dice" /> 
                    <div className={`result neutral svelte-zv80zt absolute ${lastRoll?.won ? "text-green-600" : "text-red-600"}  bold`} style={{"--dice-result-transition": "100ms"}}>{lastRoll?.roll}</div>
                </div>
            </div> }
            <div className="range svelte-1esfxtl">
                <div className={`lower ${mode !== "under" ? "above" : "below"}  svelte-1esfxtl`}></div> 
                <div className={`higher ${mode !== "under" ? "above" : "below"}  svelte-1esfxtl`} style={{width: target+"%"}}></div>
            </div> 
            <input min="2" max="98" type="range"  value={target}
            onChange={(e) => handleTargetChange(parseInt(e.target.value))} className="classic-slider svelte-1esfxtl" data-test="dice-slider" />
        </div>
        </div> */}
     </div>
      <MultiplierView />
    </div>


    </div>
  );
};

export default LimboCanvas;