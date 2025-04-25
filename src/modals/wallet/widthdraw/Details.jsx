import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router'
import { assets } from '../../../constants'
import { toast } from 'sonner'
import CCPaymentService from '../../../api/payment/ccpayment'

export default function Details({activeWallet}) {
    const { updateWallet } = useContext(AppContext)
    const navigate = useNavigate()
    const [address, setAddress] = useState('')
    const [amountUSD, setAmountUSD] = useState('')
    const [amountCrypto, setAmountCrypto] = useState('')
    const [loading, setLoading] = useState(false)
    const [networkFee, setNetworkFee] = useState('2.05') // Default network fee
    const [chain, setChain] = useState('ETH') // Default chain
    const [exchangeRate, setExchangeRate] = useState(null)

    const ccPaymentService = new CCPaymentService()

    // Fetch exchange rate on component mount
    useEffect(() => {
        if (activeWallet) {
            fetchExchangeRate()
        }
    }, [activeWallet])

    // Fetch current exchange rate
    const fetchExchangeRate = async () => {
        try {
            const response = await ccPaymentService.getExchangeRates('USD')
            if (response && response.rates && response.rates[activeWallet.coin_name]) {
                setExchangeRate(response.rates[activeWallet.coin_name])
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            // Use fallback rate if API fails
            setExchangeRate(getDefaultExchangeRate(activeWallet.coin_name))
        }
    }

    // Fallback exchange rates if API fails
    const getDefaultExchangeRate = (currency) => {
        const rates = {
            'BTC': 50000,
            'ETH': 3000,
            'USDT': 1,
            'TRX': 0.1,
            'SOL': 100,
            'LTC': 70
        }
        return rates[currency] || 1
    }

    // Handle address input change
    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    // Handle USD amount input change
    const handleUSDAmountChange = (e) => {
        const value = e.target.value
        // Only allow numbers and decimal point
        if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
            setAmountUSD(value)
            // Convert USD to crypto using exchange rate
            if (value && !isNaN(parseFloat(value)) && exchangeRate) {
                const rate = typeof exchangeRate === 'number' ? exchangeRate : 1
                const cryptoAmount = parseFloat(value) / rate

                // Format based on currency - more decimals for BTC, fewer for others
                const decimals = activeWallet.coin_name === 'BTC' ? 8 :
                                activeWallet.coin_name === 'ETH' ? 6 : 4

                setAmountCrypto(cryptoAmount.toFixed(decimals))
            } else {
                setAmountCrypto('')
            }
        }
    }

    // Handle crypto amount input change
    const handleCryptoAmountChange = (e) => {
        const value = e.target.value
        // Only allow numbers and decimal point
        if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
            setAmountCrypto(value)
            // Convert crypto to USD using exchange rate
            if (value && !isNaN(parseFloat(value)) && exchangeRate) {
                const rate = typeof exchangeRate === 'number' ? exchangeRate : 1
                const usdAmount = parseFloat(value) * rate
                setAmountUSD(usdAmount.toFixed(2))
            } else {
                setAmountUSD('')
            }
        }
    }

    // Handle chain selection
    const handleChainChange = (selectedChain) => {
        setChain(selectedChain)
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate inputs
        if (!address) {
            toast.error('Please enter a valid wallet address')
            return
        }

        if (!amountUSD || parseFloat(amountUSD) <= 0) {
            toast.error('Please enter a valid amount')
            return
        }

        // Check if user has sufficient balance
        if (activeWallet && parseFloat(amountUSD) > parseFloat(activeWallet.balance || 0)) {
            toast.error('Insufficient balance')
            return
        }

        // Validate minimum withdrawal amount (can be adjusted based on currency)
        const minAmount = 10 // $10 USD minimum
        if (parseFloat(amountUSD) < minAmount) {
            toast.error(`Minimum withdrawal amount is $${minAmount}`)
            return
        }

        try {
            setLoading(true)

            const data = {
                currency: activeWallet.coin_name,
                amount: parseFloat(amountCrypto),
                amountUSD: parseFloat(amountUSD),
                address: address,
                networkFee: parseFloat(networkFee),
                chain: chain // Use the selected chain
            }

            const response = await ccPaymentService.createWithdrawal(data)

            if (response && response.success) {
                toast.success('Withdrawal request submitted successfully')

                // Update wallet balance if provided in response
                if (response.walletUpdate) {
                    updateWallet(response.walletUpdate)
                }

                // Navigate to withdrawals page
                navigate(`/account/withdrawals?tab=${(activeWallet.coin_name).toLowerCase()}`)
            } else {
                toast.error(response?.message || 'Failed to process withdrawal')
            }
        } catch (error) {
            console.error('Withdrawal error:', error)
            toast.error('Error processing withdrawal: ' + (error.message || 'Unknown error'))
        } finally {
            setLoading(false)
        }
    }

  return (
    <>
      <div className="css-mpks89">
        <button onClick={()=> navigate(-1)} className="css-bofapj">
            <svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" size="9" color="#fff" className="css-6opzgw">
                <title>arrow</title>
                <g id="arrow" fillRule="currentColor">
                    <path d="M8,12.534 C8.00312077,12.1491981 7.86017338,11.7775349 7.6,11.494 L3.348,7 L7.6,2.506 C8.14019021,1.91980519 8.14019021,1.01719481 7.6,0.431 C7.34808121,0.156127315 6.99235127,-0.000378973093 6.6195,-0.000378973093 C6.24664873,-0.000378973093 5.89091879,0.156127315 5.639,0.431 L0.407,5.963 C-0.135688789,6.54706274 -0.135688789,7.45093726 0.407,8.035 L5.634,13.569 C5.88591879,13.8438727 6.24164873,14.000379 6.6145,14.000379 C6.98735127,14.000379 7.34308121,13.8438727 7.595,13.569 C7.8548547,13.2872672 7.99785194,12.9172619 7.995,12.534" id="Arrow-left-1"></path>
                </g>
            </svg>
        </button>
    <img src={activeWallet?.coin_image} alt="" size="32" className="css-bzek24" />
    Withdraw {activeWallet?.fullname}
    <button onClick={()=> navigate(`/account/withdrawals?tab=${(activeWallet.coin_name).toLowerCase()}`)} className="css-1w9eatj">View Transactions</button>
</div>

<div className="css-1slrani">
    <form onSubmit={handleSubmit}>
        <div className="css-1x7hz3d">Please enter the {activeWallet?.fullname} wallet address you wish to receive the funds on. Once confirmed, the withdrawal is usually processed within a few minutes.</div>
        <div style={{height: "8px"}}></div>
        <div>
            <label htmlFor="chain-select" className="css-1vec8iw">Network/Chain<span className="css-1vr6qde"> *</span></label>
            <div style={{marginBottom: "16px"}}>
                <select
                    id="chain-select"
                    className="css-1f51ttt"
                    value={chain}
                    onChange={(e) => handleChainChange(e.target.value)}
                    disabled={loading}
                    style={{padding: "10px", cursor: "pointer"}}
                >
                    <option value="ETH">Ethereum (ETH)</option>
                    {activeWallet?.coin_name === 'USDT' && (
                        <>
                            <option value="TRC20">Tron (TRC20)</option>
                            <option value="BSC">Binance Smart Chain (BSC)</option>
                        </>
                    )}
                    {activeWallet?.coin_name === 'BTC' && (
                        <option value="BTC">Bitcoin</option>
                    )}
                    {activeWallet?.coin_name === 'TRX' && (
                        <option value="TRX">Tron</option>
                    )}
                    {activeWallet?.coin_name === 'SOL' && (
                        <option value="SOL">Solana</option>
                    )}
                    {activeWallet?.coin_name === 'LTC' && (
                        <option value="LTC">Litecoin</option>
                    )}
                </select>
            </div>

            <label htmlFor="rollbit-field-11131" className="css-1vec8iw">Receiving {activeWallet?.fullname} address<span className="css-1vr6qde"> *</span></label>
            <div>
                <div className="css-1f51ttt">
                    <input
                        type="text"
                        name="address"
                        placeholder={`Paste your ${activeWallet?.fullname} wallet address here (${chain} network)`}
                        id="rollbit-field-11131"
                        value={address}
                        onChange={handleAddressChange}
                        disabled={loading}
                    />
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
                        <input
                            type="text"
                            name="amountUSD"
                            id="rb-withdraw-amount"
                            value={amountUSD}
                            onChange={handleUSDAmountChange}
                            disabled={loading}
                        />
                    </div>
                </div>
            </div>
            <div className="css-kaz972">=</div>
            <div style={{width: "100%"}}><div>
                <div className="css-1f51ttt">
                    <img src={activeWallet?.coin_image} alt='' size="20" className="css-1lgqybz" style={{marginRight: "10px"}} />
                    <input
                        type="text"
                        name="amountCrypto"
                        value={amountCrypto}
                        onChange={handleCryptoAmountChange}
                        disabled={loading}
                    />
                </div>
                </div>
            </div>
            <button
                className="css-wrt0jz"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Request withdrawal'}
            </button>
        </div>
        <div className="css-g5wbxx">Network Fee: ${networkFee}</div>
    </form>
    <div className="css-1x7hz3d" style={{fontSize: "12px", margin: "16px 0px 0px"}}>
        *You will receive the specified {activeWallet?.fullname} amount to your withdrawal address<br/>
        *The value subtracted from your balance may vary between now and the time we process your withdrawal<br/>
        *Withdrawals are processed via CCPayment gateway<br/>
        <span style={{color: "#f2c94c", fontWeight: "bold"}}>*IMPORTANT: Make sure your withdrawal address is on the {chain} network. Sending to the wrong network may result in permanent loss of funds.</span>
    </div>
</div>
    </>
  )
}
