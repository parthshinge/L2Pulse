import React from 'react';
import { DollarSign, Activity, Users, Zap } from 'lucide-react';
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
import { l2Networks, networkStats } from './data/mockData';
import { formatNumber, formatCount, formatGasPrice } from './utils/helpers';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Section */}
        <section id="dashboard" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
          
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
            <TVLChart />
            <MarketShareChart />
          </div>

          <div className="mb-12">
            <GasComparison />
          </div>
        </section>

        {/* Networks Section */}
        <section id="networks" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Layer-2 Networks</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Tracking {l2Networks.length} networks
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {l2Networks.map((network) => (
              <NetworkCard key={network.id} network={network} />
            ))}
          </div>
        </section>

        {/* Analytics Section */}
        <section id="analytics" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Network Analytics</h2>
          <NetworkComparison />
        </section>

        {/* Transactions Section */}
        <section id="transactions" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Transactions</h2>
          <TransactionTable />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
