import React, { useEffect } from 'react'
import {wallet} from "../../../constants"
import { AppContext } from '../../../context/AppContext'
import Details from './Details'
import { useLocation } from 'react-router'

export default function Index() {
    const {Modalroutes} = React.useContext(AppContext)
    const [activeWallet, setActiveWallet] = React.useState(null)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const curtab = params.get("cur")

    useEffect(() => {
        const active = wallet?.find(item => item.is_active === true)
        setActiveWallet(active)
    }, [wallet])
  return (
    <div>
        {
        !curtab ?
            <>
             <h1 className="css-rhqiop">Withdrawal options</h1>
                <div className="css-1d5ntxf">
                {wallet.map((wa) => (
                    <button key={wa.coin_name} onClick={()=> Modalroutes("wallet","withdraw", {cur: wa.coin_name})} className="css-1yhwmxl">
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
            </>
              : 
              <Details activeWallet={activeWallet}/>
        }
       
        
        
    </div>
  )
}
