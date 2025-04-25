import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CCPaymentTransactions from './CCPaymentTransactions'
import { AppContext } from '../../context/AppContext'

export default function Deposit() {
    const location = useLocation()
    const navigate = useNavigate()
    const { Modalroutes } = React.useContext(AppContext)
    const params = new URLSearchParams(location.search)
    const pageTab = params.get("tab") || "btc"

    const handleTabChange = (tab) => {
        navigate(`/account/deposit?tab=${tab}`)
    }

    const handleDeposit = () => {
        Modalroutes("wallet", "deposit")
    }

    return (
        <>
            <div className="css-uqeajf">
                <div className="css-1mo5975">
                    <button onClick={() => handleTabChange("btc")} className={pageTab === "btc" ? "css-ak6yid" : "css-1otg8po"}>BTC</button>
                    <button onClick={() => handleTabChange("eth")} className={pageTab === "eth" ? "css-ak6yid" : "css-1otg8po"}>ETH</button>
                    <button onClick={() => handleTabChange("ltc")} className={pageTab === "ltc" ? "css-ak6yid" : "css-1otg8po"}>LTC</button>
                    <button onClick={() => handleTabChange("sol")} className={pageTab === "sol" ? "css-ak6yid" : "css-1otg8po"}>SOL</button>
                    <button onClick={() => handleTabChange("trx")} className={pageTab === "trx" ? "css-ak6yid" : "css-1otg8po"}>TRX</button>
                    <button onClick={() => handleTabChange("usdt")} className={pageTab === "usdt" ? "css-ak6yid" : "css-1otg8po"}>USDT</button>
                </div>

                <button onClick={handleDeposit} className="css-wrt0jz" style={{ marginLeft: 'auto', marginRight: '20px' }}>
                    Make a Deposit
                </button>
            </div>

            <CCPaymentTransactions type="deposit" currency={pageTab.toUpperCase()} />
        </>
    )
}
