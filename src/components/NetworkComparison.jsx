import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { l2Networks } from '../data/mockData';
import { formatNumber, formatCount, formatGasPrice, sortNetworks } from '../utils/helpers';

const NetworkComparison = () => {
  const [sortBy, setSortBy] = useState('tvl');
  const [sortedNetworks, setSortedNetworks] = useState(sortNetworks(l2Networks, 'tvl'));

  const handleSort = (criteria) => {
    setSortBy(criteria);
    setSortedNetworks(sortNetworks(l2Networks, criteria));
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Network Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Network
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-600"
                onClick={() => handleSort('tvl')}
              >
                <div className="flex items-center space-x-1">
                  <span>TVL</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-600"
                onClick={() => handleSort('tps')}
              >
                <div className="flex items-center space-x-1">
                  <span>TPS</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-600"
                onClick={() => handleSort('gasPrice')}
              >
                <div className="flex items-center space-x-1">
                  <span>Gas Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-600"
                onClick={() => handleSort('transactions')}
              >
                <div className="flex items-center space-x-1">
                  <span>24h Transactions</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-primary-600"
                onClick={() => handleSort('users')}
              >
                <div className="flex items-center space-x-1">
                  <span>Active Users</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedNetworks.map((network) => (
              <tr key={network.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{network.logo}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{network.name}</div>
                      <div className="text-xs text-gray-500">{network.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatNumber(network.tvl)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{formatCount(network.tps)}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-primary-600">
                    {formatGasPrice(network.gasPrice)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {formatCount(network.transactions24h)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {formatCount(network.activeUsers)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkComparison;
