import React from 'react'
import ManualControllers from './ManualControllers'

export default function Controls() {
    const [tab, setTab] = React.useState(1)
    const newScreen = 1233
  return (
    <>
      <div id="classNameicDice-control-0" className={`sc-hLVXRe cYiOHZ game-control ${newScreen < 1200 ? "style1" : "style0" } `}>
            {/* <div className="sc-iwjdpV ikWSlH radio game-control-switch">
                <button onClick={()=> setTab(1)} className={`${tab === 1 && "is-active"}`}>
                    <div className="label">Manual</div>
                </button>
                <button  onClick={()=> setTab(2)} className={`${tab === 2  && "is-active"} `}>
                    <div className="label">Auto</div>
                </button>
            </div> */}

            <ManualControllers />
{/* 
            {#if tab === 1}
                
            {/if}
        {#if tab === 2}
                <AutoControllers />
            {/if} */}

        </div>
    </>
  )
}
