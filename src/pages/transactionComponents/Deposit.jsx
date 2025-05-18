import React, { useState, useEffect, useContext } from 'react';
import { FaArrowDown, FaWallet, FaSearch, FaFilter, FaExternalLinkAlt, FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import api from '../../utils/api';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

const Deposit = () => {
    const { user } = useContext(AuthContext)
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDepositHistory();
  }, [filterStatus]);

  const fetchDepositHistory = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/ccpayment/deposit/records');
      console.log('Deposit History Response:', response.data);
      
      if (response.data.success) {
        setDeposits( []);
      } else {
        toast.error(response.data.message || 'Failed to load deposit history');
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
      toast.error('Failed to load deposit history');
    } finally {
      setLoading(false);
    }
  };

  // Filter deposits based on search term and status
  const filteredDeposits = deposits.filter(deposit => 
    (deposit.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     deposit.currency?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || deposit.status === filterStatus)
  );

  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center px-2 py-1 rounded-full text-xs bg-green-900 text-green-300">
            <FaCheck className="mr-1" /> Completed
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center px-2 py-1 rounded-full text-xs bg-yellow-900 text-yellow-300">
            <FaClock className="mr-1" /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center px-2 py-1 rounded-full text-xs bg-red-900 text-red-300">
            <FaTimes className="mr-1" /> Failed
          </span>
        );
      default:
        return (
          <span className="flex items-center px-2 py-1 rounded-full text-xs bg-gray-900 text-gray-300">
            {status}
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaArrowDown className="text-green-500 mr-2" />
          <h2 className="text-xl font-semibold text-white">Deposit History</h2>
        </div>
        <button
          onClick={() => window.location.href = '/deposit'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          <FaWallet className="mr-2" />
          New Deposit
        </button>
      </div>
      
      <div className="bg-[#071824] rounded-lg p-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID or currency..."
              className="w-full pl-10 pr-4 py-2 bg-[#0f212e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0f212e] border border-gray-700 rounded-lg text-white py-2 px-4 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">Loading deposits...</p>
          </div>
        ) : filteredDeposits.length === 0 ? (
          <div className="text-center py-10">
            <FaWallet className="mx-auto text-4xl text-gray-600 mb-3" />
            <p className="text-gray-400">No deposits found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-[#0a1a27] text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">Date</th>
                  <th scope="col" className="px-6 py-3">Transaction ID</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">USD Value</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeposits.map((deposit) => (
                  <tr key={deposit.orderId} className="border-b border-gray-800 hover:bg-[#0a1a27]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(deposit.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {deposit.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img 
                          src={`/assets/token/${deposit.currency?.toLowerCase()}.png`} 
                          alt={deposit.currency} 
                          className="w-5 h-5 mr-2" 
                          onError={(e) => {
                            e.target.src = '/assets/token/default.png';
                          }}
                        />
                        <span className="font-medium text-white">{deposit.amount} {deposit.currency}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">${deposit.amountUSD?.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(deposit.status)}
                    </td>
                    <td className="px-6 py-4">
                      {deposit.status === 'pending' && deposit.paymentUrl && (
                        <a 
                          href={deposit.paymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          Complete <FaExternalLinkAlt className="ml-1" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deposit;