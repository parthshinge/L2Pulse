import { useState, useEffect } from 'react';
import {
  fetchAllNetworksData,
  calculateNetworkStats,
  generateHistoricalData,
  fetchRecentTransactions,
} from '../services/api';

export const useL2Data = () => {
  const [networks, setNetworks] = useState([]);
  const [networkStats, setNetworkStats] = useState({
    totalTVL: 0,
    totalTransactions24h: 0,
    totalActiveUsers: 0,
    averageGasPrice: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all network data
      const networksData = await fetchAllNetworksData();
      setNetworks(networksData);

      // Calculate statistics
      const stats = calculateNetworkStats(networksData);
      setNetworkStats(stats);

      // Fetch recent transactions
      const transactions = await fetchRecentTransactions();
      setRecentTransactions(transactions);

      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching L2 data:', err);
      setError(err.message || 'Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Generate derived data
  const tvlHistoricalData = networks.map((network) => ({
    name: network.name,
    data: generateHistoricalData(network.tvl, 0.15),
    color: network.color,
  }));

  const gasPriceData = networks.map((network) => ({
    name: network.name.split(' ')[0],
    gasPrice: network.gasPrice,
    fill: network.color,
  }));

  const transactionVolumeData = generateHistoricalData(
    networkStats.totalTransactions24h,
    0.2
  ).map((item) => ({
    ...item,
    arbitrum: Math.round(item.value * 0.35),
    optimism: Math.round(item.value * 0.24),
    base: Math.round(item.value * 0.20),
    zksync: Math.round(item.value * 0.12),
    others: Math.round(item.value * 0.09),
  }));

  return {
    networks,
    networkStats,
    recentTransactions,
    tvlHistoricalData,
    gasPriceData,
    transactionVolumeData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  };
};
