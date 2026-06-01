"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

type Product = {
  id: number;
  price: number;
};

export default function PriceChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      const products: Product[] = await res.json();

      const ranges = {
        "0-20": 0,
        "21-40": 0,
        "41-60": 0,
        "61-80": 0,
        "81+": 0,
      };

      products.forEach((p) => {
        const price = p.price;

        if (price <= 20) ranges["0-20"]++;
        else if (price <= 40) ranges["21-40"]++;
        else if (price <= 60) ranges["41-60"]++;
        else if (price <= 80) ranges["61-80"]++;
        else ranges["81+"]++;
      });

      setData(
        Object.entries(ranges).map(([range, count]) => ({
          range,
          count,
        }))
      );
    };

    fetchData();
  }, []);

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}