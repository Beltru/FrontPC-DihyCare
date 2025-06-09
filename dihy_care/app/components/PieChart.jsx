"use client";
import { Jaini } from "next/font/google";
import {PieChart, Area, Pie, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from "recharts"
const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  
];
const data02 = [
  {
    "name": "Group A",
    "value": 2400
  },
  {
    "name": "Group B",
    "value": 4567
  },
  {
    "name": "Group C",
    "value": 1400
  },
 
];
    

const PieChartComponent = () => {
return(
    <ResponsiveContainer width="100%" height="100%" >
       
          <PieChart width={730} height={250}> 
        <Legend/>       
        <Tooltip content={CustomToolTip}/>
            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#3b82f6" />
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8b5cf6" label />
          </PieChart>
    </ResponsiveContainer> 
    ) 
};
   const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Product 1:
          <span className="ml-2">${payload[0]?.value ?? 'N/A'}</span>
        </p>
        {payload[1] && (
          <p className="text-sm text-blue-400">
            Product 2:
            <span className="ml-2">${payload[1].value}</span>
          </p>
        )}
      </div>
    );
  }

};


export default PieChartComponent;
