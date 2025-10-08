import React from 'react';
import { ExternalLink, TrendingUp, Users, Zap, DollarSign } from 'lucide-react';
import { formatNumber, formatCount, formatGasPrice, getNetworkTypeBadge } from '../utils/helpers';

const NetworkCard = ({ network }) => {
  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{network.logo}</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{network.name}</h3>
            <span className={`badge ${getNetworkTypeBadge(network.type)}`}>
              {network.type}
            </span>
          </div>
        </div>
        <a
          href={network.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary-600 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">TVL</span>
          </div>
          <span className="font-semibold text-gray-900">{formatNumber(network.tvl)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Zap className="w-4 h-4" />
            <span className="text-sm">TPS</span>
          </div>
          <span className="font-semibold text-gray-900">{formatCount(network.tps)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">24h Transactions</span>
          </div>
          <span className="font-semibold text-gray-900">{formatCount(network.transactions24h)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">Active Users</span>
          </div>
          <span className="font-semibold text-gray-900">{formatCount(network.activeUsers)}</span>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Gas Price</span>
            <span className="font-bold text-primary-600">{formatGasPrice(network.gasPrice)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Market Share</span>
          <span className="font-semibold text-gray-900">{network.marketShare.toFixed(1)}%</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${network.marketShare}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
