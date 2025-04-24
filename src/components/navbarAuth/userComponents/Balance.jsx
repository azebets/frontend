import React from 'react'
import { AppContext } from '../../../context/AppContext'

export default function Balance() {
       const { wallet} = React.useContext(AppContext)
  return (
    <div id="rollbit-modal-popover-container">
        <div className="css-1nfl9e5" style={{height: "225.583px", maxHeight: "225.583px", top: "59.8333px"}}>
            <div className="css-rymlxq">
                    <div style={{padding: "16px 16px 4px"}}>
                        <div className="css-1yx9de1">
                            {wallet.map((item) => (
                                <div key={item.coin_name} className="css-1e0k2gt">
                                    <div className={`css-ayxvns ${item?.is_active && "active"}`}>
                                        <div className="css-rx3rp4">
                                            <div>
                                                <label htmlFor="proof-radio-34760" className={`css-13ahkye ${item?.is_active && "active"}`}>
                                                    <span className="css-dm6haw"></span>
                                                </label>
                                            </div>
                                            <div className="css-cebha4">
                                                <div className="jehslJs css-1ooew8q">
                                                    <img src="{wallet?.coin_image}" className="coin" alt="" />
                                                    <div className="css-15smzfl">{item?.coin_name}</div>
                                                </div>
                                                <div className="css-1ooew8q">
                                                    ${(parseFloat(item?.balance)).toFixed(2)}
                                                </div>
                                            </div>  
                                        </div>
                                    </div>                  
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
