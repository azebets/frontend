import React from 'react'
import { AppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router'
import { assets } from '../../../constants'

export default function Details({activeWallet}) {
    const {Modalroutes} = React.useContext(AppContext)
    const navigete = useNavigate()

  return (
    <>
      <div className="css-mpks89">
        <button onClick={()=> history.back()} className="css-bofapj">
            <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="9" color="#fff" className="css-6opzgw">
                <title>arrow</title>
                <g id="arrow" fillRule="currentColor">
                    <path d="M8,12.534 C8.00312077,12.1491981 7.86017338,11.7775349 7.6,11.494 L3.348,7 L7.6,2.506 C8.14019021,1.91980519 8.14019021,1.01719481 7.6,0.431 C7.34808121,0.156127315 6.99235127,-0.000378973093 6.6195,-0.000378973093 C6.24664873,-0.000378973093 5.89091879,0.156127315 5.639,0.431 L0.407,5.963 C-0.135688789,6.54706274 -0.135688789,7.45093726 0.407,8.035 L5.634,13.569 C5.88591879,13.8438727 6.24164873,14.000379 6.6145,14.000379 C6.98735127,14.000379 7.34308121,13.8438727 7.595,13.569 C7.8548547,13.2872672 7.99785194,12.9172619 7.995,12.534" id="Arrow-left-1"></path>
                </g>
            </svg>
        </button>
    <img src={activeWallet?.coin_image} alt="" size="32" className="css-bzek24" />
    Withdraw Bitcoin
    <button onClick={()=> navigete(`/account/withdrawals?tab=${(activeWallet.coin_name).toLowerCase()}`)} className="css-1w9eatj">View Transactions</button>
</div>

<div className="css-1slrani">
    <form>
        <div className="css-1x7hz3d">Please enter the {activeWallet?.fullname} wallet address you wish to receive the funds on. Once confirmed, the withdrawal is usually processed within a few minutes.</div>
        <div style={{height: "8px"}}></div>
        <div>
            <label htmlFor="rollbit-field-11131" className="css-1vec8iw">Receiving {activeWallet?.fullname} address<span className="css-1vr6qde"> *</span></label>
            <div>
                <div className="css-1f51ttt">
                    <input type="text" name="address" placeholder={`Paste your ${activeWallet?.fullname} wallet address here`} id="rollbit-field-11131"  />
                </div>
            </div>
        </div>
        <div style={{height: "24px"}}></div>
        <label htmlFor="rb-withdraw-amount" className="css-1vec8iw">Withdrawal amount<span className="css-1vr6qde"> *</span></label>
        <div className="css-191t7fp">
            <div style={{width: "100%"}}>
                <div>
                    <div className="css-1f51ttt">
                        <img src={assets?.logo3D} size="20" alt="" className="css-1vhuwci" style={{marginRight: "10px", marginBottom: "-2px"}} />
                        <div className="css-azvonf" style={{fontSize: "17px"}}>$</div>
                        <input type="text" name="amountUSD" id="rb-withdraw-amount"  />
                    </div>
                </div>
            </div>
            <div className="css-kaz972">=</div>
            <div style={{width: "100%"}}><div>
                <div className="css-1f51ttt">
                    <img src={activeWallet?.coin_image} alt='' size="20" className="css-1lgqybz" style={{marginRight: "10px"}} />
                     <input type="text" name="amountCrypto"  />
                    </div>
                </div>
            </div>
            <button className="css-wrt0jz" type="submit">Request withdrawal</button>
        </div>
        <div className="css-g5wbxx">Network Fee: $2.05</div>
    </form>
    <div className="css-1x7hz3d" style={{fontSize: "12px", margin: "16px 0px 0px"}}>*You will receive the specified {activeWallet?.fullname} amount to your withdrawal address<br/>*The value subtracted from your balance may vary between now and the time we process your withdrawal</div>
</div>
    </>
  )
}
