import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { l2Networks, generateHistoricalData } from '../data/mockData';

const TVLChart = () => {
  // Generate combined historical data
  const days = 30;
  const data = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const dataPoint = { date: dateStr };
    
    l2Networks.slice(0, 5).forEach(network => {
      const variance = 1 + (Math.random() - 0.5) * 0.15;
      dataPoint[network.id] = Math.round((network.tvl / 1e9) * variance);
    });
    
    data.push(dataPoint);
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}B
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Total Value Locked (TVL) Trend</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'TVL (Billions $)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="arbitrum" 
            stroke="#28A0F0" 
            strokeWidth={2}
            name="Arbitrum"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="optimism" 
            stroke="#FF0420" 
            strokeWidth={2}
            name="Optimism"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="base" 
            stroke="#0052FF" 
            strokeWidth={2}
            name="Base"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="zksync" 
            stroke="#8C8DFC" 
            strokeWidth={2}
            name="zkSync Era"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="polygon-zkevm" 
            stroke="#8247E5" 
            strokeWidth={2}
            name="Polygon zkEVM"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TVLChart;
