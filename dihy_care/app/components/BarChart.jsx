"use client";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const salesData = [
  { name: "Jan", revenue: 4000, profit: 3000 },
  { name: "Feb", revenue: 5000, profit: 2000 },
  { name: "Mar", revenue: 2000, profit: 1000 },
  { name: "Apr", revenue: 3700, profit: 2400 },
  { name: "May", revenue: 7800, profit: 9500 },
  { name: "Jun", revenue: 2900, profit: 8300 },
];

const BarChartComponent = () => {
  const maxRevenue = Math.max(...salesData.map((item) => item.revenue));
  const maxProfit = Math.max(...salesData.map((item) => item.profit));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData} margin={{ right: 30 }}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={CustomToolTip} />
        <Legend/>

        {/* Revenue Bar */}
        <Bar dataKey="revenue" name="Revenue" stackId="">
          {salesData.map((entry, index) => (
            <Cell
              key={`revenue-cell-${index}`}
              fill={entry.revenue === maxRevenue ? "#03f1dd" : "#3b82f6"} 
            />
          ))}
        </Bar>

        {/* Profit Bar */}
        <Bar dataKey="profit" name="Profit" stackId="1">
          {salesData.map((entry, index) => (
            <Cell
              key={`profit-cell-${index}`}
              fill={entry.profit === maxProfit ? "#f103f1" : "#8b5cf6"} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400"> 
          Revenue:
          <span className="ml-2">${payload[0]?.value ?? "N/A"}</span>
        </p>
        <p className="text-sm text-blue-400">
          Profit:
          <span className="ml-2">${payload[1]?.value ?? "N/A"}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default BarChartComponent;
