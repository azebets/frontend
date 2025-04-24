import React from 'react'
import { AppContext } from '../../context/AppContext'
import { useLocation } from 'react-router'
import CloseButton from '../../components/CloseButton'
import Deposit from './deposit/Index'
import Withdraw from './widthdraw/Index'
import Referral from './referrals/Index'
import "../../styles/wallet.css"

export default function WalletLayout() {
    const {Modalroutes,} = React.useContext(AppContext)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const pageTab = params.get("modal")
  return (
    <div className="css-1yogdko" >
        <div className="css-17zcsfw" >
            <div className="css-15hip2x" type="button" >
                <div className="css-1nc5kzu">
                   <CloseButton />
                </div>
                <div className="css-1h2fqou">
                    <div className="css-lcqjyq">
                        <div className="css-1mo5975">
                            <button onClick={()=> Modalroutes("wallet","deposit")} className={pageTab === "deposit" ? "css-ak6yid" : "css-1otg8po"}>Deposit</button>
                            <button onClick={()=> Modalroutes("wallet","withdraw")} className={pageTab === "withdraw" ? "css-ak6yid" : "css-1otg8po"}>Withdraw</button>
                            <button onClick={()=> Modalroutes("wallet","referral")} className={pageTab === "referral" ? "css-ak6yid" : "css-1otg8po"}>Referrals</button>
                        </div>
                        <div className="css-1xat6c" style={{display: "none"}}>
                            <button className="css-lui29e">
                                <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" className="css-rrpfla">
                                    <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                                </svg>
                            </button>
                            <button className="css-lui29e">
                                <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" size="6" color="hsl(225.70000000000005, 15.6%, 58.8%)" className="css-8adv44">
                                    <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    {pageTab === "deposit" && <Deposit />}
                    {pageTab === "withdraw" && <Withdraw />}
                    {pageTab === "referral" && <Referral />}
                </div>
            </div>
        </div>
    </div>
  )
}
