import React from 'react'
import { NavLink, Outlet } from 'react-router'

export default function Referrals() {
  return (
    <>
      <div className="css-1tizvjc">
        <div className="css-t3di03">Refer Friends And Get Rewarded</div>
        <div className="css-1mqv0a7">
            <div>
                <div className="css-1j76v2v">Total Wagered</div>
                <div className="css-1dpm5lj">$0.00</div>
            </div>
            <div>
                <div className="css-1j76v2v">Total Commission</div>
                <div className="css-1dpm5lj" style={{color: "rgb(114, 242, 56)"}}>$0.00</div>
            </div>
        </div>
        <button className="css-1wit1e6 button" disabled  style={{minWidth: "240px"}}>Nothing to Claim</button>
    </div>

    <div className="css-uqeajf" style={{marginBottom: "16px"}}>
        <div className="css-1mo5975">
            <NavLink to="/account/referrals/codes">
                <div className="css-8nql6g">Referral Codes</div>
            </NavLink>
            <NavLink to="/account/referrals/users">
                <div className="css-8nql6g">Referred Users</div>
            </NavLink>
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
    <Outlet />
    </>
  )
}
