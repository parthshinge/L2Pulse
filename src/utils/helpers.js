// Format large numbers with abbreviations
export const formatNumber = (num) => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
};

// Format number without currency
export const formatCount = (num) => {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }
  return num.toString();
};

// Format percentage
export const formatPercentage = (num) => {
  return `${num.toFixed(1)}%`;
};

// Format gas price
export const formatGasPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Get status color
export const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'error':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

// Calculate percentage change
export const calculateChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

// Truncate address
export const truncateAddress = (address, startLength = 6, endLength = 4) => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

// Sort networks by different criteria
export const sortNetworks = (networks, sortBy) => {
  const sorted = [...networks];
  
  switch (sortBy) {
    case 'tvl':
      return sorted.sort((a, b) => b.tvl - a.tvl);
    case 'tps':
      return sorted.sort((a, b) => b.tps - a.tps);
    case 'gasPrice':
      return sorted.sort((a, b) => a.gasPrice - b.gasPrice);
    case 'transactions':
      return sorted.sort((a, b) => b.transactions24h - a.transactions24h);
    case 'users':
      return sorted.sort((a, b) => b.activeUsers - a.activeUsers);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
};

// Filter networks by type
export const filterNetworksByType = (networks, type) => {
  if (type === 'all') return networks;
  return networks.filter(network => network.type === type);
};

// Get network type badge color
export const getNetworkTypeBadge = (type) => {
  switch (type) {
    case 'Optimistic Rollup':
      return 'bg-blue-100 text-blue-800';
    case 'ZK Rollup':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
