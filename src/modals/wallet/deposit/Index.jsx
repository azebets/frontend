import React from 'react'
import {wallet} from "../../../constants"
import Warning from './Warning'

export default function Index() {
    const [isVerified, setIsVerified] = React.useState(false)
  return (

    <div>
        <h1 className="css-rhqiop">Deposit options</h1>
        <div className="css-1d5ntxf">
            {wallet.map((wa) => (
                <button key={wa.fullname} onClick={()=> setIsVerified(!isVerified)} className="css-1yhwmxl">
                    <div className="css-tt41bp">
                        <img src={wa.coin_image} alt="" size="32" className="css-bzek24" />
                    </div>
                    <div className="css-1v92hyt">
                        {wa.fullname}
                        <div className="css-h7b5qw">{wa.coin_name}</div>
                    </div>
                </button>
            ))}
        </div>
        { isVerified && <Warning handleClose={()=> setIsVerified(!isVerified)}/>}
 
    </div>
  )
}
