import React from 'react';
import { DollarSign, Activity, Users, Zap, RefreshCw, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatCard from './components/StatCard';
import NetworkCard from './components/NetworkCard';
import TVLChart from './components/TVLChart';
import GasComparison from './components/GasComparison';
import MarketShareChart from './components/MarketShareChart';
import TransactionTable from './components/TransactionTable';
import NetworkComparison from './components/NetworkComparison';
import Footer from './components/Footer';
import { useL2Data } from './hooks/useL2Data';
import { formatNumber, formatCount, formatGasPrice } from './utils/helpers';

function App() {
  const {
    networks,
    networkStats,
    recentTransactions,
    loading,
    error,
    lastUpdated,
    refetch,
  } = useL2Data();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading real-time data from Layer-2 networks...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">Error loading data</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button
                onClick={refetch}
                className="btn-primary text-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Data Display */}
        {!loading && networks.length > 0 && (
          <>
            {/* Dashboard Section */}
            <section id="dashboard" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                {lastUpdated && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                    <button
                      onClick={refetch}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      title="Refresh data"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                  title="Total TVL"
                  value={formatNumber(networkStats.totalTVL)}
                  change={12.5}
                  icon={DollarSign}
                  color="primary"
                />
                <StatCard
                  title="24h Transactions"
                  value={formatCount(networkStats.totalTransactions24h)}
                  change={8.3}
                  icon={Activity}
                  color="green"
                />
                <StatCard
                  title="Active Users"
                  value={formatCount(networkStats.totalActiveUsers)}
                  change={15.7}
                  icon={Users}
                  color="blue"
                />
                <StatCard
                  title="Avg Gas Price"
                  value={formatGasPrice(networkStats.averageGasPrice)}
                  change={-5.2}
                  icon={Zap}
                  color="purple"
                />
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <TVLChart networks={networks} />
                <MarketShareChart networks={networks} />
              </div>

              <div className="mb-12">
                <GasComparison networks={networks} />
              </div>
            </section>

            {/* Networks Section */}
            <section id="networks" className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Layer-2 Networks</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Tracking {networks.length} networks
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {networks.map((network) => (
                  <NetworkCard key={network.id} network={network} />
                ))}
              </div>
            </section>

            {/* Analytics Section */}
            <section id="analytics" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Network Analytics</h2>
              <NetworkComparison networks={networks} />
            </section>

            {/* Transactions Section */}
            <section id="transactions" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Transactions</h2>
              <TransactionTable transactions={recentTransactions} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
