import CCPaymentService from '../api/payment/ccpayment';

// Create a singleton instance of the CCPayment service
const ccPaymentService = new CCPaymentService();

// Cache for coin list
let coinListCache = null;

/**
 * Get coin ID from symbol by fetching from API or using cache
 * @param {string} symbol - Cryptocurrency symbol (e.g., 'BTC', 'ETH')
 * @returns {Promise<string>} - Coin ID as string
 */
export const getCoinIdFromSymbol = async (symbol) => {
  try {
    // Use cached coin list if available
    if (coinListCache) {
      const coin = coinListCache.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
      if (coin) return coin.coinId.toString();
    }
    
    // Fetch coin list if not cached
    const response = await ccPaymentService.getSupportedCurrencies();
    
    if (response && response.success && response.data && response.data.coins) {
      // Cache the coin list
      coinListCache = response.data.coins;
      
      // Find the coin by symbol
      const coin = response.data.coins.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
      if (coin) return coin.coinId.toString();
    }
    
    // Fallback to default mapping if coin not found
    const fallbackMap = {
      'BTC': '1155',
      'ETH': '1161',
      'USDT': '1280',
      'SOL': '1186',
      'LTC': '1173',
      'TRX': '1482',
      'TETH': '1891',
      //'USDC': '1282'.
      //
    };
    
    return fallbackMap[symbol] || '1161'; // Default to ETH if not found
  } catch (error) {
    console.error('Error getting coin ID:', error);
    return '1161'; // Default to ETH on error
  }
};

/**
 * Get CCPayment service instance
 * @returns {CCPaymentService} - CCPayment service instance
 */
export const getCCPaymentService = () => {
  return ccPaymentService;
};

/**
 * Get fallback exchange rate for a currency
 * @param {string} currency - Cryptocurrency symbol
 * @returns {number} - Exchange rate in USD
 */
export const getDefaultExchangeRate = (currency) => {
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

export default {
  getCoinIdFromSymbol,
  getCCPaymentService,
  getDefaultExchangeRate
};
