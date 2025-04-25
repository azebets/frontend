import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CCPaymentService from '../../api/payment/ccpayment';
import { toast } from 'sonner';

export default function CCPaymentTransactions({ type, currency }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const ccPaymentService = new CCPaymentService();

  useEffect(() => {
    fetchTransactions();
  }, [type, currency, page]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      // Determine which API endpoint to call based on transaction type
      let response;
      if (type === 'deposit') {
        response = await ccPaymentService.getPermanentDeposits({
          currency: currency,
          page: page,
          limit: 10
        });
      } else if (type === 'withdrawal') {
        response = await ccPaymentService.getWithdrawalHistory({
          currency: currency,
          page: page,
          limit: 10
        });
      }

      if (response) {
        // Handle deposit response format
        if (type === 'deposit' && response.deposits) {
          if (page === 1) {
            setTransactions(response.deposits);
          } else {
            setTransactions(prev => [...prev, ...response.deposits]);
          }
          setHasMore(response.hasMore || false);
        }
        // Handle withdrawal response format
        else if (type === 'withdrawal' && response.withdrawals) {
          if (page === 1) {
            setTransactions(response.withdrawals);
          } else {
            setTransactions(prev => [...prev, ...response.withdrawals]);
          }
          setHasMore(response.hasMore || false);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${type} transactions:`, error);
      toast.error(`Failed to load ${type} history`);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'css-status-completed';
      case 'pending':
        return 'css-status-pending';
      case 'failed':
        return 'css-status-failed';
      default:
        return '';
    }
  };

  return (
    <div className="css-transaction-container">
      <h3 className="css-qgoclk">{type === 'deposit' ? 'Deposits' : 'Withdrawals'}</h3>

      {loading && page === 1 ? (
        <div className="css-loading">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="css-57x4g4">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" size="28" className="css-1ghf8pm">
            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"></path>
          </svg>
          <div color="text3" size="14" className="css-1ippc9u">No entries</div>
        </div>
      ) : (
        <>
          <div className="css-transaction-list">
            {transactions.map((tx, index) => (
              <div key={tx.id || index} className="css-transaction-item">
                <div className="css-transaction-info">
                  <div className="css-transaction-amount">
                    <img src={tx.currencyIcon || `https://assets.coingecko.com/coins/images/1/standard/bitcoin.png`} alt="" className="css-transaction-icon" />
                    <span>{tx.amount} {tx.currency}</span>
                  </div>
                  <div className="css-transaction-details">
                    <div className="css-transaction-id">ID: {tx.id || 'N/A'}</div>
                    <div className="css-transaction-date">{formatDate(tx.timestamp)}</div>
                  </div>
                </div>
                <div className={`css-transaction-status ${getStatusClass(tx.status)}`}>
                  {tx.status}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="css-load-more">
              <button
                onClick={loadMore}
                disabled={loading}
                className="css-load-more-button"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
