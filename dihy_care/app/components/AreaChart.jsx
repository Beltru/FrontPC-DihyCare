"use client";
import { Jaini } from "next/font/google";
import {AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from "recharts"
const productSales = [
   { 
 name: "Jan",
product1: 4000,
product2: 3000,
},
{   
name: "Feb",
product1: 5000,
product2: 2000,
},
{
name: "Mar",
product1: 2000,
product2: 1000,
},
{
    name: "Apr",
    product1: 3700,
    product2: 2400,
    },
 {
 name: "May",
  product1: 7800,
  product2: 9500,
  },
        {
name: "Jun",
product1: 2900,
product2: 8300,
            }

]



const AreaChartComponent = () => {
return(
    <ResponsiveContainer width="100%" height="100%" >
        <AreaChart width={500} height={400} data={productSales} margin={{right: 30}}>
        <YAxis/>
        <XAxis dataKey="name"/>
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip content={CustomToolTip}/>
        <Legend />
           <Area type="monotone" dataKey="product1" stroke="#2563eb" fill="#3b82f6" stackId="1"/>
           <Area type="monotone" dataKey="product2" stroke="#7c3aed" fill="#8b5cf6" stackId="1"/>
        </AreaChart>
    </ResponsiveContainer> 
    ) 
};
    const CustomToolTip = ({active, payload, label}) => {
    if (active && payload && payload.length) {
return( 
    
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
            <p className="text-medium text-lg">{label}</p>
            <p className="text-sm text-blue-400">
                Product 1:
                <span className="ml-2">${payload[0].value}</span>
            </p>
            <p className="text-sm text-blue-400">
                Product 2:
                <span className="ml-2">${payload[1].value}</span>
            </p>

        </div>
        );
    }
};

export default AreaChartComponent;
