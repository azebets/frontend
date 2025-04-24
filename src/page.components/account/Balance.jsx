import React from 'react'
import { AppContext } from '../../context/AppContext'

export default function Balance() {
    const { user , wallet} = React.useContext(AppContext)
    return (
    <div className="css-t60dms">
        <div className="css-9sgg3p">
            <h3 className="css-qgoclk" style={{margin: "0px auto 0px 0px"}}>Balances</h3>
            {/* <!-- <button className="css-d9xzbh">Create Referral Balance</button> --> */}
        </div>
        <div className="css-1yx9de1">
            <div className="css-q0akof">
            <div className="css-1sg2lsz">
                Balance
            </div>
            {/* <div className="css-n4mkve">Total:<span>${(parseFloat(totalBal)).toFixed(2)}</span></div> */}
        </div>
        <div className="css-1e0k2gt">
            {wallet?.map((item) => (
                <button key={item.coin_image} className={`css-ayxvns ${item?.is_active && "active"}`}>
                    <div className="css-rx3rp4">
                        <div>
                            <label htmlFor="proof-radio-37235" className={`css-13ahkye ${item?.is_active && "active"}`}>
                                <span className="css-dm6haw"></span>
                            </label>
                        </div>
                        <div className="css-cebha4">
                            <div className="css-15smzfl">{item?.coin_name}</div>
                            <div className="css-1ooew8q">
                                <img src={item?.coin_image} className="coin" alt="" />
                                ${(parseFloat(item?.balance)).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </button>
            ))}
            
        </div>
    </div>
    </div>
  )
}
