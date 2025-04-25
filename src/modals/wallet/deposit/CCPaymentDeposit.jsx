import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../../context/AppContext';
import { toast } from 'sonner';
import CCPaymentService from '../../../api/payment/ccpayment';

export default function CCPaymentDeposit({ selectedCoin, handleClose }) {
  const { updateWallet } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [depositAddress, setDepositAddress] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const addressRef = useRef(null);

  const ccPaymentService = new CCPaymentService();

  // Fetch deposit address on component mount
  useEffect(() => {
    fetchDepositAddress();
    fetchDepositHistory();

    // Set up interval to refresh deposit history
    const interval = setInterval(() => {
      fetchDepositHistory();
    }, 30000); // Check every 30 seconds

    setRefreshInterval(interval);

    // Clean up interval on component unmount
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [selectedCoin]);

  // Fetch deposit address
  const fetchDepositAddress = async () => {
    try {
      setLoading(true);

      // Get user's permanent addresses
      const addresses = await ccPaymentService.getPermanentAddresses();

      // Find address for selected coin
      let address = null;
      if (addresses && addresses.addresses) {
        address = addresses.addresses.find(addr =>
          addr.currency === selectedCoin.coin_name
        );
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
      // If no address exists, generate a new one
      else {
        await generateNewAddress();
      }
    } catch (error) {
      console.error('Error fetching deposit address:', error);
      toast.error('Failed to get deposit address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate a new deposit address
  const generateNewAddress = async () => {
    try {
      setLoading(true);

      const data = {
        currency: selectedCoin.coin_name,
        chain: "ETH" // Default to ETH chain
      };

      const response = await ccPaymentService.generatePermanentAddress(data);

      if (response && response.address) {
        setDepositAddress(response);
        setIsFlagged(false);
        generateQRCode(response.address);
        toast.success('New deposit address generated successfully');
      } else {
        toast.error('Failed to generate deposit address');
      }
    } catch (error) {
      console.error('Error generating address:', error);
      toast.error('Error generating address: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  // Unbind a risky address and generate a new one
  const handleUnbindAddress = async () => {
    try {
      setLoading(true);

      if (!depositAddress || !depositAddress.id) {
        toast.error('No address to unbind');
        return;
      }

      const data = {
        addressId: depositAddress.id
      };

      const response = await ccPaymentService.unbindRiskyAddress(data);

      if (response && response.success) {
        toast.success('Address unbound successfully');
        await generateNewAddress();
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

  // Fetch deposit history
  const fetchDepositHistory = async () => {
    try {
      const params = {
        currency: selectedCoin.coin_name,
        page: 1,
        limit: 5
      };

      const response = await ccPaymentService.getPermanentDeposits(params);

      if (response && response.deposits) {
        setDepositHistory(response.deposits);

        // Check if there are any new completed deposits
        const newCompletedDeposits = response.deposits.filter(deposit =>
          deposit.status === 'completed' &&
          deposit.isNew
        );

        // Notify user of new deposits
        newCompletedDeposits.forEach(deposit => {
          toast.success(`Deposit of ${deposit.amount} ${deposit.currency} completed!`);

          // Update wallet if walletUpdate is provided
          if (deposit.walletUpdate) {
            updateWallet(deposit.walletUpdate);
          }
        });
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
            Please send your {selectedCoin.fullname} to the address below.
            Only send {selectedCoin.fullname} on the {depositAddress.chain || 'ETH'} network.
          </div>
          <div style={{ height: "16px" }}></div>

          {/* QR Code */}
          {qrCodeUrl && (
            <div className="css-qr-code" style={{ textAlign: 'center', margin: '20px 0' }}>
              <img src={qrCodeUrl} alt="QR Code" style={{ width: '150px', height: '150px' }} />
            </div>
          )}

          {/* Deposit Address */}
          <div>
            <label className="css-1vec8iw">
              {selectedCoin.fullname} Deposit Address ({depositAddress.chain || 'ETH'} Network)
            </label>
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
                style={{ marginLeft: '8px', padding: '0 15px', background: '#2a2c3b' }}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Memo field if applicable */}
          {depositAddress.memo && (
            <div style={{ marginTop: '16px' }}>
              <label className="css-1vec8iw">
                Memo (Required)
              </label>
              <div className="css-address-container" style={{ display: 'flex', marginTop: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={depositAddress.memo}
                  className="css-1f51ttt"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(depositAddress.memo);
                    toast.success('Memo copied to clipboard');
                  }}
                  className="css-copy-btn"
                  style={{ marginLeft: '8px', padding: '0 15px', background: '#2a2c3b' }}
                >
                  Copy
                </button>
              </div>
            </div>
          )}

          <div className="css-1x7hz3d" style={{ fontSize: '12px', margin: '16px 0px 0px', color: '#f2c94c' }}>
            <strong>Important:</strong> Only send {selectedCoin.fullname} on the {depositAddress.chain || 'ETH'} network to this address.
            Sending any other cryptocurrency or using a different network may result in permanent loss of funds.
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
            *Deposits typically require multiple blockchain confirmations<br/>
            *Your account will be credited once the deposit is confirmed<br/>
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
