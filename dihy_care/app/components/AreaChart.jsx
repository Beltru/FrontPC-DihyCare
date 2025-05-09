"use client";
import { Jaini } from "next/font/google";
import {AreaChart, Area } from "recharts"
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
<AreaChart width={500} height={400} data={productSales}>
<Area dataKey="product1"/>
</AreaChart>
  ) 
};

export default AreaChartComponent;
