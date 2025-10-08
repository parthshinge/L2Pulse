import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { l2Networks } from '../data/mockData';

const MarketShareChart = () => {
  const data = l2Networks.map(network => ({
    name: network.name,
    value: network.marketShare,
    color: network.color,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">Market Share: {payload[0].value.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry) => {
    return `${entry.value.toFixed(1)}%`;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Market Share Distribution</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span className="text-sm text-gray-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketShareChart;
