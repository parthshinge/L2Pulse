// Mock data for Layer-2 networks
export const l2Networks = [
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    logo: '🔷',
    type: 'Optimistic Rollup',
    tvl: 12450000000,
    tps: 4000,
    gasPrice: 0.15,
    transactions24h: 1250000,
    activeUsers: 125000,
    marketShare: 32.5,
    status: 'active',
    website: 'https://arbitrum.io',
    color: '#28A0F0',
  },
  {
    id: 'optimism',
    name: 'Optimism',
    logo: '🔴',
    type: 'Optimistic Rollup',
    tvl: 8200000000,
    tps: 2000,
    gasPrice: 0.18,
    transactions24h: 850000,
    activeUsers: 95000,
    marketShare: 21.4,
    status: 'active',
    website: 'https://optimism.io',
    color: '#FF0420',
  },
  {
    id: 'base',
    name: 'Base',
    logo: '🔵',
    type: 'Optimistic Rollup',
    tvl: 6800000000,
    tps: 1800,
    gasPrice: 0.12,
    transactions24h: 720000,
    activeUsers: 88000,
    marketShare: 17.8,
    status: 'active',
    website: 'https://base.org',
    color: '#0052FF',
  },
  {
    id: 'zksync',
    name: 'zkSync Era',
    logo: '⚡',
    type: 'ZK Rollup',
    tvl: 4500000000,
    tps: 2500,
    gasPrice: 0.10,
    transactions24h: 520000,
    activeUsers: 62000,
    marketShare: 11.7,
    status: 'active',
    website: 'https://zksync.io',
    color: '#8C8DFC',
  },
  {
    id: 'polygon-zkevm',
    name: 'Polygon zkEVM',
    logo: '🟣',
    type: 'ZK Rollup',
    tvl: 2800000000,
    tps: 2000,
    gasPrice: 0.08,
    transactions24h: 380000,
    activeUsers: 45000,
    marketShare: 7.3,
    status: 'active',
    website: 'https://polygon.technology',
    color: '#8247E5',
  },
  {
    id: 'linea',
    name: 'Linea',
    logo: '🌐',
    type: 'ZK Rollup',
    tvl: 1900000000,
    tps: 1500,
    gasPrice: 0.14,
    transactions24h: 280000,
    activeUsers: 35000,
    marketShare: 5.0,
    status: 'active',
    website: 'https://linea.build',
    color: '#61DFFF',
  },
  {
    id: 'scroll',
    name: 'Scroll',
    logo: '📜',
    type: 'ZK Rollup',
    tvl: 1200000000,
    tps: 1200,
    gasPrice: 0.11,
    transactions24h: 180000,
    activeUsers: 28000,
    marketShare: 3.1,
    status: 'active',
    website: 'https://scroll.io',
    color: '#FFEEDA',
  },
  {
    id: 'starknet',
    name: 'Starknet',
    logo: '🌟',
    type: 'ZK Rollup',
    tvl: 850000000,
    tps: 1000,
    gasPrice: 0.09,
    transactions24h: 120000,
    activeUsers: 18000,
    marketShare: 2.2,
    status: 'active',
    website: 'https://starknet.io',
    color: '#EC796B',
  },
];

// Historical data for charts (last 30 days)
export const generateHistoricalData = (baseValue, variance = 0.1) => {
  const data = [];
  const days = 30;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const randomVariance = 1 + (Math.random() - 0.5) * variance;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(baseValue * randomVariance),
    });
  }
  
  return data;
};

// TVL historical data for all networks
export const tvlHistoricalData = l2Networks.map(network => ({
  name: network.name,
  data: generateHistoricalData(network.tvl, 0.15),
  color: network.color,
}));

// Transaction volume data
export const transactionVolumeData = generateHistoricalData(3500000, 0.2).map(item => ({
  ...item,
  arbitrum: Math.round(item.value * 0.35),
  optimism: Math.round(item.value * 0.24),
  base: Math.round(item.value * 0.20),
  zksync: Math.round(item.value * 0.12),
  others: Math.round(item.value * 0.09),
}));

// Gas price comparison data
export const gasPriceData = l2Networks.map(network => ({
  name: network.name.split(' ')[0],
  gasPrice: network.gasPrice,
  fill: network.color,
}));

// Recent transactions (mock)
export const recentTransactions = [
  {
    id: '0x1a2b3c...',
    network: 'Arbitrum One',
    type: 'Swap',
    value: '1,234.56',
    token: 'ETH',
    gasUsed: 0.15,
    timestamp: '2 mins ago',
    status: 'success',
  },
  {
    id: '0x4d5e6f...',
    network: 'Optimism',
    type: 'Transfer',
    value: '500.00',
    token: 'USDC',
    gasUsed: 0.12,
    timestamp: '5 mins ago',
    status: 'success',
  },
  {
    id: '0x7g8h9i...',
    network: 'Base',
    type: 'Bridge',
    value: '2,500.00',
    token: 'ETH',
    gasUsed: 0.18,
    timestamp: '8 mins ago',
    status: 'success',
  },
  {
    id: '0xjklmno...',
    network: 'zkSync Era',
    type: 'Mint',
    value: '1',
    token: 'NFT',
    gasUsed: 0.08,
    timestamp: '12 mins ago',
    status: 'success',
  },
  {
    id: '0xpqrstu...',
    network: 'Polygon zkEVM',
    type: 'Swap',
    value: '750.25',
    token: 'MATIC',
    gasUsed: 0.06,
    timestamp: '15 mins ago',
    status: 'success',
  },
];

// Network statistics
export const networkStats = {
  totalTVL: l2Networks.reduce((sum, network) => sum + network.tvl, 0),
  totalTransactions24h: l2Networks.reduce((sum, network) => sum + network.transactions24h, 0),
  totalActiveUsers: l2Networks.reduce((sum, network) => sum + network.activeUsers, 0),
  averageGasPrice: l2Networks.reduce((sum, network) => sum + network.gasPrice, 0) / l2Networks.length,
};
