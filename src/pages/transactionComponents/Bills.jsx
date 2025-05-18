import React, { useState, useEffect } from 'react';
import { FaFileInvoiceDollar, FaSearch } from 'react-icons/fa';
import api from '../../utils/api';
import { format } from 'date-fns';

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await api.get('/api/transactions/bills');
        setBills(response.data.bills || []);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBills();
  }, []);
  
  // Filter bills based on search term
  const filteredBills = bills.filter(bill => 
    bill.transaction_type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <FaFileInvoiceDollar className="text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold text-white">Transaction History</h2>
      </div>
      
      <div className="bg-[#071824] rounded-lg p-6">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-[#0f212e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">Loading transactions...</p>
          </div>
        ) : filteredBills.length === 0 ? (
          <div className="text-center py-10">
            <FaFileInvoiceDollar className="mx-auto text-4xl text-gray-600 mb-3" />
            <p className="text-gray-400">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-[#0a1a27] text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-tl-lg">Date</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.bill_id} className="border-b border-gray-800 hover:bg-[#0a1a27]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(bill.datetime), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img src={bill.token_img} alt={bill.token_name} className="w-5 h-5 mr-2" />
                        <span>{bill.transaction_type}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 font-medium ${bill.trx_amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {bill.trx_amount > 0 ? '+' : ''}{bill.trx_amount} {bill.token_name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        bill.status ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {bill.status ? 'Completed' : 'Failed'}
                      </span>
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

export default Bills;