import api, { backendUrl } from "../axios";
import { toast } from "sonner";

export class CCPaymentService {
    constructor() {
        this.url = backendUrl();
    }

    // Get supported currencies
    async getSupportedCurrencies() {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/currencies`);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Get user's permanent deposit addresses
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

    // Generate a new permanent deposit address
    async generatePermanentAddress(data) {
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

    // Get permanent deposits history
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

    // Unbind a risky address
    async unbindRiskyAddress(data) {
        try {
            const response = await api.post(`${this.url}/api/payment/ccpayment/unbind-address`, data);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Create a withdrawal request
    async createWithdrawal(data) {
        try {
            // Default to ETH chain if not specified
            const requestData = {
                ...data,
                chain: data.chain || "ETH"
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

    // Get withdrawal status
    async getWithdrawalStatus(withdrawalId) {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/withdraw/status/${withdrawalId}`);
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Get withdrawal history
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

    // Get exchange rates
    async getExchangeRates(currency = "USD") {
        try {
            const response = await api.get(`${this.url}/api/payment/ccpayment/rates`, {
                params: { currency }
            });
            return response;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    // Convert amount between currencies
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
