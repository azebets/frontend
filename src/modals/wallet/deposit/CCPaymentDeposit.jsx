import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import { toast } from 'sonner';
import { getCCPaymentService, getCoinIdFromSymbol, getDefaultExchangeRate } from '../../../utils/ccpayment';
import { useNavigate } from 'react-router-dom';

export default function CCPaymentDeposit({ selectedCoin, handleClose }) {
  const { updateWallet, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [depositAddress, setDepositAddress] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [conversionRate, setConversionRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState('100'); // Default amount for display
  const [cryptoAmount, setCryptoAmount] = useState('');
  // Create a unique storage key for this user and coin
  const getStorageKey = () => {
    const userId = user?.id || 'guest';
    return `notifiedDepositIds_${userId}_${selectedCoin.coin_name}`;
  };

  const [notifiedDepositIds, setNotifiedDepositIds] = useState(() => {
    // Initialize from localStorage if available
    const savedIds = localStorage.getItem(getStorageKey());
    return savedIds ? JSON.parse(savedIds) : [];
  }); // Track deposits that have been notified
  const addressRef = useRef(null);
  const memoRef = useRef(null);

  // Get CCPayment service instance
  const ccPaymentService = getCCPaymentService();

  // Fetch deposit address and conversion rate on component mount
  useEffect(() => {
    fetchDepositAddress();
    fetchDepositHistory();
    fetchConversionRate();

    // Set up interval to refresh deposit history and conversion rate
    const interval = setInterval(() => {
      fetchDepositHistory();
      fetchConversionRate();
    }, 30000); // Check every 30 seconds

    setRefreshInterval(interval);

    // Clean up interval on component unmount
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }

      // Clean up notified IDs when component unmounts
      cleanupNotifiedIds(notifiedDepositIds);
    };
  }, [selectedCoin, user?.id]);

  // Fetch conversion rate
  const fetchConversionRate = async () => {
    try {
      // Get coin ID from the cached coin list or fetch it
      const coinId = await getCoinIdFromSymbol(selectedCoin.coin_name);

      // Get price for the selected coin and USDT for reference
      const response = await ccPaymentService.getCurrencyPrices([coinId, '1280']); // 1280 is USDT

      if (response && response.data && response.data.prices) {
        const prices = response.data.prices;
        const coinPrice = parseFloat(prices[coinId]);
        const usdtPrice = parseFloat(prices['1280']) || 1; // USDT price, should be close to 1

        // Calculate rate in USD (assuming USDT ≈ USD)
        const rate = coinPrice / usdtPrice;
        setConversionRate(rate);

        // Calculate crypto amount based on default USD amount
        if (usdAmount) {
          const crypto = parseFloat(usdAmount) / rate;
          // Format based on currency - more decimals for BTC, fewer for others
          const decimals = selectedCoin.coin_name === 'BTC' ? 8 :
                          selectedCoin.coin_name === 'ETH' ? 6 : 4;
          setCryptoAmount(crypto.toFixed(decimals));
        }
      }
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
      // Use fallback rate if API fails
      const fallbackRate = getDefaultExchangeRate(selectedCoin.coin_name);
      setConversionRate(fallbackRate);

      // Calculate crypto amount with fallback rate
      if (usdAmount) {
        const crypto = parseFloat(usdAmount) / fallbackRate;
        const decimals = selectedCoin.coin_name === 'BTC' ? 8 :
                        selectedCoin.coin_name === 'ETH' ? 6 : 4;
        setCryptoAmount(crypto.toFixed(decimals));
      }
    }
  };

  // Fallback exchange rates if API fails
  const getDefaultExchangeRate = (currency) => {
    const rates = {
      'BTC': 50000,
      'ETH': 3000,
      'USDT': 1,
      'TRX': 0.1,
      'SOL': 100,
      'LTC': 70
    };
    return rates[currency] || 1;
  };

  // Fetch deposit address
  const fetchDepositAddress = async () => {
    try {
      setLoading(true);

      // Get or create a permanent deposit address
      const referenceId = `user_${Date.now()}`; // Generate a unique reference ID
      const data = {
        referenceId,
        chain: selectedCoin.chain || "ETH" // Default to ETH chain
      };

      const addressResponse = await ccPaymentService.getOrCreateDepositAddress(data);

      console.log('Address Response => ', addressResponse)
      console.log('Selected Coin => ', selectedCoin)

      // Process the address response
      let address = null;
      if (addressResponse && addressResponse.success && addressResponse.data) {
        address = {
          address: addressResponse.data.address,
          memo: addressResponse.data.memo || '',
          chain: addressResponse.data.chain,
          isFlagged: false
        };
      }

      // If address exists and is not flagged as risky
      if (address && !address.isFlagged) {
        setDepositAddress(address);
        generateQRCode(address.address);
      }
      // If address exists but is flagged as risky
      else if (address && address.isFlagged) {
        setDepositAddress(address);
        setIsFlagged(true);
      }
      // If no address exists, show error
      else {
        toast.error('Failed to get deposit address. Please try again.');
      }
    } catch (error) {
      console.log('Error =<> ', error.message)
      console.error('Error fetching deposit address:', error);
      toast.error('2 Failed to get deposit address. Please try again 2.');
    } finally {
      setLoading(false);
    }
  };

  // Function removed - fetchDepositAddress already handles getOrCreate functionality

  // Unbind a risky address and fetch a new one
  const handleUnbindAddress = async () => {
    try {
      setLoading(true);

      if (!depositAddress || !depositAddress.address) {
        toast.error('No address to unbind');
        return;
      }

      const data = {
        address: depositAddress.address,
        chain: depositAddress.chain || "ETH"
      };

      const response = await ccPaymentService.unbindAddress(data);

      if (response && response.success) {
        toast.success('Address unbound successfully');
        // Fetch a new deposit address after unbinding
        await fetchDepositAddress();
      } else {
        toast.error('Failed to unbind address');
      }
    } catch (error) {
      console.error('Error unbinding address:', error);
      toast.error('Error unbinding address: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Helper function to clean up old notified deposit IDs
  const cleanupNotifiedIds = (ids) => {
    // Keep only the most recent 100 IDs to prevent localStorage from growing too large
    if (ids.length > 100) {
      const trimmedIds = ids.slice(-100); // Keep only the last 100 IDs
      setNotifiedDepositIds(trimmedIds);
      localStorage.setItem(getStorageKey(), JSON.stringify(trimmedIds));
      return trimmedIds;
    }
    return ids;
  };

  // Fetch deposit history
  const fetchDepositHistory = async () => {
    try {
      // Get coin ID from the cached coin list or fetch it
      const coinId = await getCoinIdFromSymbol(selectedCoin.coin_name);

      const params = {
        coinId: coinId,
        limit: 5
      };

      const response = await ccPaymentService.getDepositRecords(params);

      if (response && response.success && response.data && response.data.records) {
        // Format the deposit records
        const formattedDeposits = response.data.records.map(record => ({
          id: record.recordId,
          amount: record.amount,
          currency: record.coinSymbol,
          status: record.status,
          timestamp: record.arrivedAt * 1000, // Convert to milliseconds
          address: record.toAddress,
          txId: record.txId,
          isNew: false // We don't have this info in the new API
        }));

        setDepositHistory(formattedDeposits);

        // Check if there are any new completed deposits (status = Success) that haven't been notified yet
        const newCompletedDeposits = formattedDeposits.filter(deposit =>
          deposit.status === 'Success' && !notifiedDepositIds.includes(deposit.id)
        );

        if (newCompletedDeposits.length > 0) {
          // Notify user of new deposits
          newCompletedDeposits.forEach(deposit => {
            toast.success(`Deposit of ${deposit.amount} ${deposit.currency} completed!`);

            // Update wallet with the deposit amount
            // maybe need to fetch the current wallet balance from backend
            updateWallet({
              coin_name: deposit.currency,
              coin_image: selectedCoin.coin_image,
              balance: (parseFloat(selectedCoin.balance || 0) + parseFloat(deposit.amount)).toString()
            });
          });

          // Add the notified deposit IDs to the tracking state
          const newNotifiedIds = [...notifiedDepositIds, ...newCompletedDeposits.map(d => d.id)];

          // Clean up and save the updated IDs
          cleanupNotifiedIds(newNotifiedIds);
        }
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
    }
  };

  // Generate QR code for address
  const generateQRCode = (address) => {
    if (!address) return;

    // Create QR code URL using a public QR code API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(address)}`;
    setQrCodeUrl(qrUrl);
  };

  // Copy address to clipboard
  const copyToClipboard = () => {
    if (addressRef.current) {
      navigator.clipboard.writeText(addressRef.current.value)
        .then(() => {
          toast.success('Address copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy address:', err);
          toast.error('Failed to copy address');
        });
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // View transaction history
  const viewTransactionHistory = () => {
    navigate(`/account/deposits?tab=${(selectedCoin.coin_name).toLowerCase()}`);
  };

  return (
    <div className="css-1slrani">
      {loading ? (
        <div className="css-loading">Loading deposit information...</div>
      ) : isFlagged ? (
        <div className="css-flagged-address">
          <div className="css-1x7hz3d" style={{ color: '#eb5757' }}>
            <strong>Warning:</strong> Your deposit address has been flagged as risky.
            Please generate a new address to continue.
          </div>
          <div style={{ height: "24px" }}></div>
          <button
            className="css-wrt0jz"
            onClick={handleUnbindAddress}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Generate New Address'}
          </button>
        </div>
      ) : depositAddress ? (
        <div>
          <div className="css-1x7hz3d">
            Send the amount of {selectedCoin.fullname} of your choice to the following address to
            receive the equivalent in Coins.
          </div>
          <div style={{ height: "16px" }}></div>

          {/* Warning Messages */}
          <div className="css-warning-container" style={{ marginBottom: '16px' }}>
            <div className="css-warning-message" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ color: '#f2c94c', marginRight: '8px', fontSize: '20px' }}>⚠</div>
              <div style={{ color: '#f2c94c', fontSize: '14px' }}>
                Only deposit over the {depositAddress.chain || 'ETH'} network. Do not use BSC/BNB, Base, Arbitrum or Optimism networks.
              </div>
            </div>
            <div className="css-warning-message" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ color: '#f2c94c', marginRight: '8px', fontSize: '20px' }}>⚠</div>
              <div style={{ color: '#f2c94c', fontSize: '14px' }}>
                Do NOT send NFT's to this {selectedCoin.coin_name} deposit address. In order to recover
                NFTs deposited to this address an administrative fee will be charged.
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <div className="css-1vec8iw" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
                YOUR PERSONAL {selectedCoin.coin_name} DEPOSIT ADDRESS
              </div>
              <div className="css-address-container" style={{ display: 'flex', marginTop: '8px' }}>
                <input
                  ref={addressRef}
                  type="text"
                  readOnly
                  value={depositAddress.address}
                  className="css-1f51ttt"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="css-copy-btn"
                  style={{ marginLeft: '8px', padding: '0 15px', background: '#f2c94c', color: '#000' }}
                >
                  COPY ADDRESS
                </button>
              </div>

              {/* Missing deposit or ERC-20 options */}
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                <a href="#" style={{ color: '#f2c94c', marginRight: '16px' }}>Request deposit address sweep</a>
                <a href="#" style={{ color: '#f2c94c' }}>Deposit ERC-20 tokens</a>
              </div>
            </div>
            {qrCodeUrl && (
              <div className="css-qr-code" style={{ marginLeft: '20px' }}>
                <img src={qrCodeUrl} alt="QR Code" style={{ width: '150px', height: '150px', border: '4px solid white' }} />
              </div>
            )}
          </div>

          {/* Memo field if applicable */}
          {depositAddress.memo && (
            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
              <label className="css-1vec8iw">
                Memo (Required)
              </label>
              <div className="css-address-container" style={{ display: 'flex', marginTop: '8px' }}>
                <input
                  ref={memoRef}
                  type="text"
                  readOnly
                  value={depositAddress.memo}
                  className="css-1f51ttt"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (memoRef.current) {
                      navigator.clipboard.writeText(memoRef.current.value);
                      toast.success('Memo copied to clipboard');
                    }
                  }}
                  className="css-copy-btn"
                  style={{ marginLeft: '8px', padding: '0 15px', background: '#f2c94c', color: '#000' }}
                >
                  COPY
                </button>
              </div>
            </div>
          )}

          {/* Conversion Calculator */}
          <div style={{ marginTop: '20px', marginBottom: '20px', padding: '16px', backgroundColor: '#1e2032', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
                <div style={{ marginRight: '8px' }}>🪙</div>
                <div>${usdAmount}</div>
              </div>
              <div style={{ margin: '0 16px' }}>=</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={selectedCoin.coin_image} alt="" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                <div>{cryptoAmount}</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '8px', color: '#8a8d98' }}>
              The value of {selectedCoin.coin_name} may change between now and the time we receive your payment
            </div>
          </div>

          {/* View Transactions Button */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              onClick={viewTransactionHistory}
              className="css-wrt0jz"
              style={{ width: 'auto', padding: '0 24px' }}
            >
              View Transactions
            </button>
          </div>

          {/* Recent Deposits */}
          {depositHistory.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <label className="css-1vec8iw">Recent Deposits</label>
              <div className="css-transaction-list">
                {depositHistory.map((deposit, index) => (
                  <div key={deposit.id || index} className="css-transaction-item">
                    <div className="css-transaction-info">
                      <div className="css-transaction-amount">
                        <img src={selectedCoin.coin_image} alt="" className="css-transaction-icon" />
                        <span>{deposit.amount} {deposit.currency}</span>
                      </div>
                      <div className="css-transaction-details">
                        <div className="css-transaction-id">ID: {deposit.id || 'N/A'}</div>
                        <div className="css-transaction-date">{formatDate(deposit.timestamp)}</div>
                      </div>
                    </div>
                    <div className={`css-transaction-status css-status-${deposit.status.toLowerCase()}`}>
                      {deposit.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="css-1x7hz3d" style={{ fontSize: '12px', margin: '16px 0px 0px' }}>
            *Deposits typically require multiple blockchain confirmations<br />
            *Your account will be credited once the deposit is confirmed<br />
            *The page will automatically refresh to show new deposits
          </div>
        </div>
      ) : (
        <div className="css-error">
          <div className="css-1x7hz3d" style={{ color: '#eb5757' }}>
            Failed to get deposit address. Please try again.
          </div>
          <div style={{ height: "24px" }}></div>
          <button
            className="css-wrt0jz"
            onClick={fetchDepositAddress}
            disabled={loading}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
