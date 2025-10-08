import axios from 'axios';

// DefiLlama API for TVL data (more reliable than L2Beat)
const DEFILLAMA_API = 'https://api.llama.fi';

// Alternative: Use CoinGecko for some data
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Network configurations with RPC endpoints
export const NETWORK_CONFIGS = {
  arbitrum: {
    id: 'arbitrum',
    name: 'Arbitrum One',
    logo: '🔷',
    type: 'Optimistic Rollup',
    chainId: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerApi: 'https://api.arbiscan.io/api',
    website: 'https://arbitrum.io',
    color: '#28A0F0',
    l2beatId: 'arbitrum',
    defillamaId: 'Arbitrum',
  },
  optimism: {
    id: 'optimism',
    name: 'Optimism',
    logo: '🔴',
    type: 'Optimistic Rollup',
    chainId: 10,
    rpcUrl: 'https://mainnet.optimism.io',
    explorerApi: 'https://api-optimistic.etherscan.io/api',
    website: 'https://optimism.io',
    color: '#FF0420',
    l2beatId: 'optimism',
    defillamaId: 'Optimism',
  },
  base: {
    id: 'base',
    name: 'Base',
    logo: '🔵',
    type: 'Optimistic Rollup',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    explorerApi: 'https://api.basescan.org/api',
    website: 'https://base.org',
    color: '#0052FF',
    l2beatId: 'base',
    defillamaId: 'Base',
  },
  zksync: {
    id: 'zksync',
    name: 'zkSync Era',
    logo: '⚡',
    type: 'ZK Rollup',
    chainId: 324,
    rpcUrl: 'https://mainnet.era.zksync.io',
    explorerApi: 'https://api-era.zksync.network/api',
    website: 'https://zksync.io',
    color: '#8C8DFC',
    l2beatId: 'zksync-era',
    defillamaId: 'zkSync Era',
  },
  'polygon-zkevm': {
    id: 'polygon-zkevm',
    name: 'Polygon zkEVM',
    logo: '🟣',
    type: 'ZK Rollup',
    chainId: 1101,
    rpcUrl: 'https://zkevm-rpc.com',
    explorerApi: 'https://api-zkevm.polygonscan.com/api',
    website: 'https://polygon.technology',
    color: '#8247E5',
    l2beatId: 'polygonzkevm',
    defillamaId: 'Polygon zkEVM',
  },
  linea: {
    id: 'linea',
    name: 'Linea',
    logo: '🌐',
    type: 'ZK Rollup',
    chainId: 59144,
    rpcUrl: 'https://rpc.linea.build',
    explorerApi: 'https://api.lineascan.build/api',
    website: 'https://linea.build',
    color: '#61DFFF',
    l2beatId: 'linea',
    defillamaId: 'Linea',
  },
  scroll: {
    id: 'scroll',
    name: 'Scroll',
    logo: '📜',
    type: 'ZK Rollup',
    chainId: 534352,
    rpcUrl: 'https://rpc.scroll.io',
    explorerApi: 'https://api.scrollscan.com/api',
    website: 'https://scroll.io',
    color: '#FFEEDA',
    l2beatId: 'scroll',
    defillamaId: 'Scroll',
  },
  starknet: {
    id: 'starknet',
    name: 'Starknet',
    logo: '🌟',
    type: 'ZK Rollup',
    chainId: null,
    rpcUrl: 'https://starknet-mainnet.public.blastapi.io',
    explorerApi: null,
    website: 'https://starknet.io',
    color: '#EC796B',
    l2beatId: 'starknet',
    defillamaId: 'Starknet',
  },
};

// Fetch TVL data from DefiLlama
export const fetchTVLData = async () => {
  try {
    const response = await axios.get(`${DEFILLAMA_API}/chains`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TVL data:', error);
    // Return empty array on error instead of throwing
    return [];
  }
};

// Fetch gas price from RPC endpoint
export const fetchGasPrice = async (rpcUrl) => {
  try {
    const response = await axios.post(rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
      id: 1,
    });
    
    // Convert hex to gwei
    const gasPriceWei = parseInt(response.data.result, 16);
    const gasPriceGwei = gasPriceWei / 1e9;
    return gasPriceGwei;
  } catch (error) {
    console.error(`Error fetching gas price from ${rpcUrl}:`, error);
    return null;
  }
};

// Fetch block number
export const fetchBlockNumber = async (rpcUrl) => {
  try {
    const response = await axios.post(rpcUrl, {
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 1,
    });
    return parseInt(response.data.result, 16);
  } catch (error) {
    console.error(`Error fetching block number from ${rpcUrl}:`, error);
    return null;
  }
};

// Fetch network data combining L2Beat and RPC data
export const fetchNetworkData = async (networkConfig) => {
  try {
    const [gasPrice, blockNumber] = await Promise.all([
      fetchGasPrice(networkConfig.rpcUrl),
      fetchBlockNumber(networkConfig.rpcUrl),
    ]);

    return {
      ...networkConfig,
      gasPrice: gasPrice ? parseFloat(gasPrice.toFixed(4)) : 0,
      blockNumber,
      status: 'active',
    };
  } catch (error) {
    console.error(`Error fetching data for ${networkConfig.name}:`, error);
    return {
      ...networkConfig,
      gasPrice: 0,
      blockNumber: 0,
      status: 'error',
    };
  }
};

// Fetch all L2 networks data
export const fetchAllNetworksData = async () => {
  try {
    // Fetch TVL data from DefiLlama
    const tvlData = await fetchTVLData();
    
    // Fetch RPC data for each network
    const networkPromises = Object.values(NETWORK_CONFIGS).map(async (config) => {
      const networkData = await fetchNetworkData(config);
      
      // Find matching TVL data from DefiLlama
      const chainData = tvlData.find(
        (chain) => chain.name === config.defillamaId
      );
      
      const networkTVL = chainData?.tvl || 0;
      
      // Calculate market share
      const l2Networks = tvlData.filter(chain => 
        ['Arbitrum', 'Optimism', 'Base', 'zkSync Era', 'Polygon zkEVM', 'Linea', 'Scroll', 'Starknet'].includes(chain.name)
      );
      const totalTVL = l2Networks.reduce((sum, chain) => sum + (chain.tvl || 0), 0) || 1;
      const marketShare = totalTVL > 0 ? (networkTVL / totalTVL) * 100 : 0;
      
      return {
        ...networkData,
        tvl: networkTVL,
        marketShare: parseFloat(marketShare.toFixed(2)),
        // Estimate other metrics based on TVL
        tps: Math.round((networkTVL / 1e9) * 100),
        transactions24h: Math.round((networkTVL / 1e6) * 50),
        activeUsers: Math.round((networkTVL / 1e7) * 10),
      };
    });

    const networks = await Promise.all(networkPromises);
    return networks.sort((a, b) => b.tvl - a.tvl);
  } catch (error) {
    console.error('Error fetching all networks data:', error);
    // Return networks with default values instead of throwing
    return Object.values(NETWORK_CONFIGS).map(config => ({
      ...config,
      tvl: 0,
      gasPrice: 0,
      blockNumber: 0,
      marketShare: 0,
      tps: 0,
      transactions24h: 0,
      activeUsers: 0,
      status: 'error',
    }));
  }
};

// Calculate network statistics
export const calculateNetworkStats = (networks) => {
  const totalTVL = networks.reduce((sum, network) => sum + (network.tvl || 0), 0);
  const totalTransactions24h = networks.reduce((sum, network) => sum + (network.transactions24h || 0), 0);
  const totalActiveUsers = networks.reduce((sum, network) => sum + (network.activeUsers || 0), 0);
  const validGasPrices = networks.filter(n => n.gasPrice > 0);
  const averageGasPrice = validGasPrices.length > 0
    ? validGasPrices.reduce((sum, network) => sum + network.gasPrice, 0) / validGasPrices.length
    : 0;

  return {
    totalTVL,
    totalTransactions24h,
    totalActiveUsers,
    averageGasPrice: parseFloat(averageGasPrice.toFixed(4)),
  };
};

// Generate historical data (placeholder - would need historical API)
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

// Fetch recent transactions (mock for now - would need indexer API)
export const fetchRecentTransactions = async () => {
  // This would require a blockchain indexer API like Etherscan, Blockscout, or The Graph
  // For now, returning structured mock data
  return [
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
  ];
};
