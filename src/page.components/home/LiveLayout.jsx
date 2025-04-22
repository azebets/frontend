import React from 'react'

export default function LiveLayout() {
    const [tab, setTab] = React.useState(0)
  return (
    <div className="css-tpc4x9">
        <div className="css-njdirk">
            <button onClick={()=> setTab(0)} className={!tab ? "css-1ezjk2y" : "css-ap4xiv "}>
                <div className="css-e63igi" style={{margin: "0px 6px -1px 0px"}}></div>
                LIVE WINS
            </button>
            <button onClick={()=> setTab() } className={tab === 1 ? "css-1ezjk2y" : "css-ap4xiv"}>M</button>
            <button onClick={()=> setTab()} className={tab === 2 ? "css-1ezjk2y" : "css-ap4xiv"}>W</button>
            <button onClick={()=> setTab() } className={tab === 3 ? "css-1ezjk2y" : "css-ap4xiv"}>D</button>
        </div>
    
        <div className="css-1am9shg">
            <div className="css-1pylomy">
                {[1,3,4,5,6,7,8,0,9,18,27,26,25,24,23,22,21].map((item) =>
                    <div key={item} className="css-3ezs24">
                    <a href="/">
                        <div className="css-e4tx6e">
                            <img className="css-18g7uso" src="/assets/games/Beheaded.webp" alt="" />
                        </div>
                    </a>
                    <a href="/">
                        <div className="css-3v2xup" size="10">
                            <div size="15" className="css-1holazi">
                                <img src="/assets/games/Icon 5.webp" alt="" scale="1" className="css-1ago99h"/>
                            </div>
                            <div className="css-o3tivt" style={{color: 'white', fontWeight: 500}}>MMHKB02</div>
                        </div>
                        <div className="css-1ypeake">$106.90</div>
                    </a>
                </div>
                )}
            </div>
        </div>

    </div>

  )
}
