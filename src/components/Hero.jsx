import React from 'react';
import { Activity, TrendingUp, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Activity className="w-12 h-12 animate-pulse" />
            <h1 className="text-5xl font-bold">L2Pulse</h1>
          </div>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Real-time tracking and analytics for Ethereum Layer-2 networks. Monitor TVL, transactions, gas prices, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Live Metrics</h3>
            </div>
            <p className="text-primary-100 text-sm">
              Track TVL, transactions, and active users across all major L2 networks in real-time.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Gas Analytics</h3>
            </div>
            <p className="text-primary-100 text-sm">
              Compare gas prices and optimize your transactions across different Layer-2 solutions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Network Insights</h3>
            </div>
            <p className="text-primary-100 text-sm">
              Deep dive into network performance, market share, and ecosystem growth trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
