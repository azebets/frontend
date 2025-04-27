import api, { backendUrl } from "../axios";
import { toast } from "sonner";

export class CCPaymentService {
    constructor() {
        this.url = backendUrl();
    }

    /**
     * Get supported currencies and networks
     * Endpoint: /api/payment/ccpayment/currencies
     */
    async getSupportedCurrencies() {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/currencies`);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get currency prices in USD
     * Endpoint: /api/payment/ccpayment/prices
     * @param {string|array} coinIds - Comma-separated list or array of coin IDs
     */
    async getCurrencyPrices(coinIds) {
        try {
            const params = {};
            if (coinIds) {
                // If coinIds is an array, convert to comma-separated string
                if (Array.isArray(coinIds)) {
                    params.coinIds = coinIds.join(',');
                } else {
                    params.coinIds = coinIds;
                }
            }
            const response = await api.get(`${this.url}/api/payment/ccpayment/prices`, { params });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get or create a permanent deposit address
     * Endpoint: /api/payment/ccpayment/permanent-address (POST)
     * @param {Object} data - Request data
     * @param {string} data.referenceId - Required: 3-64 characters, unique reference ID for the user
     * @param {string} [data.chain="ETH"] - Symbol of the chain (defaults to 'ETH')
     */
    async getOrCreateDepositAddress(data) {
        try {
            // Default to ETH chain if not specified
            const requestData = {
                ...data,
                chain: data.chain || "ETH"
            };
            const response = await api.post(`${this.url}/api/payment/ccpayment/permanent-address`, requestData);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get deposit record by record ID
     * Endpoint: /api/payment/ccpayment/deposit-record (POST)
     * @param {string} recordId - CCPayment unique ID for a transaction
     */
    async getDepositRecord(recordId) {
        try {
            const response = await api.post(`${this.url}/api/payment/ccpayment/deposit-record`, { recordId });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get deposit records list
     * Endpoint: /api/payment/ccpayment/deposit/records (GET)
     * @param {Object} params - Query parameters
     * @param {number} [params.coinId] - Coin ID
     * @param {string} [params.referenceId] - Unique reference ID for the user
     * @param {string} [params.orderId] - Order ID
     * @param {string} [params.chain] - Symbol of the chain
     * @param {number} [params.startAt] - Retrieve records starting from this timestamp
     * @param {number} [params.endAt] - Retrieve records up to this timestamp
     * @param {string} [params.nextId] - Next ID for pagination
     */
    async getDepositRecords(params = {}) {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/deposit/records`, { params });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Unbind an address
     * Endpoint: /api/payment/ccpayment/unbind-address (POST)
     * @param {Object} data - Request data
     * @param {string} data.chain - Required: Chain symbol of the address to be unbound (defaults to 'ETH')
     * @param {string} data.address - Required: Address to be unbound
     */
    async unbindAddress(data) {
        try {
            const requestData = {
                ...data,
                chain: data.chain || "ETH"
            };
            const response = await api.post(`${this.url}/api/payment/ccpayment/unbind-address`, requestData);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Create a withdrawal request
     * Endpoint: /api/payment/ccpayment/withdraw (POST)
     * @param {Object} data - Request data
     * @param {string} data.amount - Required: Withdrawal amount
     * @param {number} data.coinId - Required: Coin ID
     * @param {string} data.address - Required: Withdrawal destination address
     * @param {string} [data.chain="ETH"] - Symbol of the chain (defaults to 'ETH')
     * @param {string} [data.memo] - Memo of the withdrawal address
     * @param {boolean} [data.merchantPayNetworkFee=false] - True if merchant pays network fee, false if user pays
     */
    async createWithdrawal(data) {
        try {
            // Default to ETH chain if not specified
            const requestData = {
                ...data,
                chain: data.chain || "ETH",
                merchantPayNetworkFee: data.merchantPayNetworkFee || false
            };
            const response = await api.post(`${this.url}/api/payment/ccpayment/withdraw`, requestData);
            if (response.success) {
                toast.success("Withdrawal request submitted successfully");
            }
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get withdrawal record status
     * Endpoint: /api/payment/ccpayment/withdraw/status/:withdrawalId (GET)
     * @param {string} withdrawalId - Your unique order ID for the withdrawal
     */
    async getWithdrawalStatus(withdrawalId) {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/withdraw/status/${withdrawalId}`);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get withdrawal records list
     * Endpoint: /api/payment/ccpayment/withdraw/records (GET)
     * @param {Object} params - Query parameters
     * @param {number} [params.coinId] - Coin ID
     * @param {string} [params.orderIds] - Comma-separated list of order IDs (max 20)
     * @param {string} [params.chain] - Symbol of the chain
     * @param {number} [params.startAt] - Retrieve records starting from this timestamp
     * @param {number} [params.endAt] - Retrieve records up to this timestamp
     * @param {string} [params.nextId] - Next ID for pagination
     */
    async getWithdrawalRecords(params = {}) {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/withdraw/records`, { params });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Convert amount between currencies
     * Endpoint: /api/payment/ccpayment/convert (GET)
     * @param {Object} params - Query parameters
     * @param {string} params.fromCurrency - Required: Source currency code
     * @param {string} params.toCurrency - Required: Target currency code
     * @param {number} params.amount - Required: Amount to convert
     */
    async convertAmount(params) {
        try {
            const { fromCurrency, toCurrency, amount } = params;
            const response = await api.get(`${this.url}/api/payment/ccpayment/convert`, {
                params: { fromCurrency, toCurrency, amount }
            });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get user's permanent deposit addresses (Legacy method - use getOrCreateDepositAddress instead)
     * @deprecated
     * @param {string} chain - Chain symbol (defaults to 'ETH')
     */
    async getPermanentAddresses(chain = "ETH") {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/permanent-addresses`, {
                params: { chain }
            });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Generate a new permanent deposit address (Legacy method - use getOrCreateDepositAddress instead)
     * @deprecated
     * @param {Object} data - Request data
     */
    async generatePermanentAddress(data) {
        return this.getOrCreateDepositAddress(data);
    }

    /**
     * Get permanent deposits history (Legacy method - use getDepositRecords instead)
     * @deprecated
     * @param {Object} params - Query parameters
     */
    async getPermanentDeposits(params) {
        try {
            const { currency, page = 1, limit = 10 } = params;
            const response = await api.get(`${this.url}/api/payment/ccpayment/permanent-deposits`, {
                params: { currency, page, limit }
            });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Check deposit status by record ID (Legacy method - use getDepositRecord instead)
     * @deprecated
     * @param {string} recordId - CCPayment unique ID for a transaction
     */
    async checkDepositStatus(recordId) {
        return this.getDepositRecord(recordId);
    }

    /**
     * Unbind a risky address (Legacy method - use unbindAddress instead)
     * @deprecated
     * @param {Object} data - Request data
     */
    async unbindRiskyAddress(data) {
        return this.unbindAddress(data);
    }

    /**
     * Get withdrawal history (Legacy method - use getWithdrawalRecords instead)
     * @deprecated
     * @param {Object} params - Query parameters
     */
    async getWithdrawalHistory(params) {
        try {
            const { currency, page = 1, limit = 10 } = params;
            const response = await api.get(`${this.url}/api/payment/ccpayment/withdraw/history`, {
                params: { currency, page, limit }
            });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    /**
     * Get coin USD price (Alias for getCurrencyPrices)
     * @param {string|array} coinIds - Comma-separated list or array of coin IDs
     */
    async getCoinUSDTPrice(coinIds) {
        return this.getCurrencyPrices(coinIds);
    }

    // Handle errors
    handleError(error) {
        if (error.response) {
            console.error('CCPayment API Error:', error.response.data);
            toast.error(error.response.data?.message || "Payment processing error");
        } else if (error.request) {
            console.error('Network Error:', error.request);
            toast.error("Network error while processing payment");
        } else {
            console.error('Error:', error.message);
            toast.error(error.message || "Unknown payment error");
        }
    }
}

export default CCPaymentService;
