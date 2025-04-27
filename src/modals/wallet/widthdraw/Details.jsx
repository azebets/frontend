import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import { useNavigate } from 'react-router'
import { assets } from '../../../constants'
import { toast } from 'sonner'
import { getCCPaymentService, getCoinIdFromSymbol, getDefaultExchangeRate } from '../../../utils/ccpayment'
import { useRef } from 'react'

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
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [withdrawalData, setWithdrawalData] = useState(null)
    const [supportedChains, setSupportedChains] = useState([])
    const [minWithdrawal, setMinWithdrawal] = useState(10) // Default min withdrawal in USD
    const addressRef = useRef(null)

    // Get CCPayment service instance
    const ccPaymentService = getCCPaymentService()

    // Fetch exchange rate and supported currencies on component mount
    useEffect(() => {
        if (activeWallet) {
            fetchExchangeRate()
            fetchSupportedCurrencies()
        }
    }, [activeWallet])

    // Fetch supported currencies and chains
    const fetchSupportedCurrencies = async () => {
        try {
            const response = await ccPaymentService.getSupportedCurrencies()

            if (response && response.success && response.data && response.data.coins) {
                // Find the current coin in the supported currencies
                const currentCoin = response.data.coins.find(coin =>
                    coin.symbol.toUpperCase() === activeWallet.coin_name.toUpperCase()
                )

                if (currentCoin) {
                    // Extract networks from the coin data
                    const networks = Object.values(currentCoin.networks || {})
                    setSupportedChains(networks)

                    // Set minimum withdrawal amount if available
                    if (networks && networks.length > 0) {
                        // Try to find ETH network or use the first available
                        const defaultNetwork = networks.find(n => n.chain === 'ETH') || networks[0]

                        if (defaultNetwork.minimumWithdrawAmount) {
                            // Convert min withdrawal to USD using exchange rate
                            if (exchangeRate) {
                                const minInUsd = parseFloat(defaultNetwork.minimumWithdrawAmount) * exchangeRate
                                setMinWithdrawal(Math.max(10, minInUsd)) // Use at least $10 as minimum
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching supported currencies:', error)
        }
    }

    // Fetch current exchange rate
    const fetchExchangeRate = async () => {
        try {
            // Get coin ID from the cached coin list or fetch it
            const coinId = await getCoinIdFromSymbol(activeWallet.coin_name);

            // Get price for the selected coin and USDT for reference
            const response = await ccPaymentService.getCurrencyPrices([coinId, '1280']); // 1280 is USDT

            if (response && response.data && response.data.prices) {
                const prices = response.data.prices;
                const coinPrice = parseFloat(prices[coinId]);
                const usdtPrice = parseFloat(prices['1280']) || 1; // USDT price, should be close to 1

                // Calculate rate in USD (assuming USDT ≈ USD)
                const rate = coinPrice / usdtPrice;
                setExchangeRate(rate);
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error)
            // Use fallback rate if API fails
            setExchangeRate(getDefaultExchangeRate(activeWallet.coin_name))
        }
    }

    // Removed getDefaultExchangeRate - now using the shared utility function

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

        // Validate minimum withdrawal amount
        if (parseFloat(amountUSD) < minWithdrawal) {
            toast.error(`Minimum withdrawal amount is $${minWithdrawal.toFixed(2)}`)
            return
        }

        // Get coin ID for the withdrawal
        const coinId = await getCoinIdFromSymbol(activeWallet.coin_name);

        // Prepare withdrawal data
        const data = {
            coinId: parseInt(coinId), // Required by the API
            amount: parseFloat(amountCrypto),
            address: address,
            chain: chain, // Use the selected chain
            memo: "", // Optional memo field
            merchantPayNetworkFee: false // User pays network fee by default
        }

        // Show confirmation dialog
        setWithdrawalData(data)
        setShowConfirmation(true)
    }

    // Handle withdrawal confirmation
    const handleConfirmWithdrawal = async () => {
        if (!withdrawalData) return

        try {
            setLoading(true)

            const response = await ccPaymentService.createWithdrawal(withdrawalData)

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
            setShowConfirmation(false)
        }
    }

    // Cancel withdrawal
    const handleCancelWithdrawal = () => {
        setShowConfirmation(false)
        setWithdrawalData(null)
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

      {showConfirmation ? (
        <div className="css-1slrani">
          <div className="css-confirmation-dialog" style={{ padding: '20px', backgroundColor: '#1e2032', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: '0', color: '#f2c94c' }}>Confirm Withdrawal</h3>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Amount:</span>
                <span>{withdrawalData?.amount} {activeWallet?.coin_name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>USD Value:</span>
                <span>${withdrawalData?.amountUSD}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Network Fee:</span>
                <span>${networkFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Network:</span>
                <span>{chain}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Receiving Address:</span>
                <span style={{ wordBreak: 'break-all' }}>{withdrawalData?.address}</span>
              </div>
            </div>

            <div className="css-warning-message" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ color: '#f2c94c', marginRight: '8px', fontSize: '20px' }}>⚠</div>
              <div style={{ color: '#f2c94c', fontSize: '14px' }}>
                IMPORTANT: Make sure your withdrawal address is on the {chain} network. Sending to the wrong network may result in permanent loss of funds.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={handleCancelWithdrawal}
                className="css-wrt0jz"
                style={{ backgroundColor: '#2a2c3b', width: '48%' }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWithdrawal}
                className="css-wrt0jz"
                style={{ backgroundColor: '#f2c94c', color: '#000', width: '48%' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      ) : (
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
                  style={{padding: "10px", cursor: "pointer", color: "white"}}
                >
                  {supportedChains.length > 0 ? (
                    supportedChains.map(network => (
                      <option key={network.chain} value={network.chain}>
                        {network.chainFullName || network.chain} {network.minimumWithdrawAmount && `(Min: ${network.minimumWithdrawAmount} ${activeWallet?.coin_name})`}
                      </option>
                    ))
                  ) : (
                    <>
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
                    </>
                  )}
                </select>
              </div>

              <label htmlFor="rollbit-field-11131" className="css-1vec8iw">Receiving {activeWallet?.fullname} address<span className="css-1vr6qde"> *</span></label>
              <div>
                <div className="css-1f51ttt">
                  <input
                    ref={addressRef}
                    type="text"
                    name="address"
                    placeholder={`Enter ${activeWallet?.fullname} address (${chain} network)`}
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
      )}
    </>
  )
}
