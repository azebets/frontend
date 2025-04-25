import React, { useState, useContext } from 'react'
import { wallet } from "../../../constants"
import Warning from './Warning'
import CCPaymentDeposit from './CCPaymentDeposit'
import { AppContext } from '../../../context/AppContext'

export default function Index() {
    const { user } = useContext(AppContext);
    const [isVerified, setIsVerified] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showCCPayment, setShowCCPayment] = useState(false);

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);

        // Check if user is verified
        if (user && !user.emailIsVerified) {
            setShowCCPayment(true);
        } else {
            setIsVerified(true);
        }
    };

    const handleClose = () => {
        setIsVerified(false);
        setShowCCPayment(false);
    };

    return (
        <div>
            {!showCCPayment ? (
                <>
                    <h1 className="css-rhqiop">Deposit options</h1>
                    <div className="css-1d5ntxf">
                        {wallet.map((wa) => (
                            <button
                                key={wa.fullname}
                                onClick={() => handleCoinSelect(wa)}
                                className="css-1yhwmxl"
                            >
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
            ) : (
                <>
                    <div className="css-mpks89">
                        <button onClick={handleClose} className="css-bofapj">
                            <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="9" color="#fff" className="css-6opzgw">
                                <title>arrow</title>
                                <g id="arrow" fillRule="currentColor">
                                    <path d="m8 12.534c.00312077-.3848019-.13982662-.7564651-.4-1.04l-4.252-4.494 4.252-4.494c.54019021-.58619481.54019021-1.48880519 0-2.075-.25191879-.27487269-.60764873-.43137897-.9805-.43137897s-.72858121.15650628-.9805.43137897l-5.232 5.532c-.54268879.58406274-.54268879 1.48793726 0 2.072l5.227 5.534c.25191879.2748727.60764873.431379.9805.431379s.72858121-.1565063.9805-.431379c.2598547-.2817328.40285194-.6517381.4-1.035"></path>
                                </g>
                            </svg>
                        </button>
                        <h1 className="css-rhqiop">Deposit {selectedCoin?.fullname}</h1>
                    </div>
                    <CCPaymentDeposit selectedCoin={selectedCoin} handleClose={handleClose} />
                </>
            )}
            {isVerified && <Warning handleClose={handleClose} />}
        </div>
    )
}
