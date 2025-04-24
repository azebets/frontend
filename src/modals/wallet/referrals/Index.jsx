import React from 'react'
import { AppContext } from '../../../context/AppContext'
import {assets} from "../../../constants"

export default function Index() {
    const {user} = React.useContext(AppContext)
    const [isloading, setIsloading] = React.useState(false)
    const [referralCode, setReferralCode] = React.useState("")
    
  return (
<div >
    <div className="css-1v87fmr">
        <img src={assets?.logo3D} alt=""  size="120" className="css-11k5gmp" style={{margin: "24px 0px 32px"}} />
        <h1 className="css-rhqiop">Apply Referral Code</h1>
        <div className="css-75vlcg">
            <div>
                <div className="css-1f51ttt">
                    <input type="text" readonly={user?.referral_code} name="code" placeholder="Enter Referral Code..." />
                </div>
            </div>
        </div>
        {user?.referral_code ?
            <div className="css-1rzueyc">Don't have a code? Enter {user?.referral_code}</div> 
        :
        <button className="css-1ylvjsg button" type="submit" style={{width: "140px", marginTop: "40px"}}>{isloading ? "Loading..." : "Apply"}</button> 
        }
    </div>
</div>
  )
}
