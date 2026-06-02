"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

type Product = {
  id: number;
  price: number;
};

export default function PriceDistributionChart() {
  const [chartData, setChartData] = useState<
    { range: string; count: number }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/products"
      );

      const products: Product[] = await response.json();

      const ranges = {
        "0-20": 0,
        "21-40": 0,
        "41-60": 0,
        "61-80": 0,
        "81+": 0,
      };

      products.forEach((product) => {
        if (product.price <= 20) ranges["0-20"]++;
        else if (product.price <= 40) ranges["21-40"]++;
        else if (product.price <= 60) ranges["41-60"]++;
        else if (product.price <= 80) ranges["61-80"]++;
        else ranges["81+"]++;
      });

      setChartData(
        Object.entries(ranges).map(([range, count]) => ({
          range,
          count,
        }))
      );
    };

    fetchProducts();
  }, []);

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Product Price Distribution
        </h2>
        <p className="text-sm text-muted-foreground">
          Number of products within each price range
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />

          <XAxis dataKey="range">
            <Label
              value="Price Range ($)"
              offset={-5}
              position="insideBottom"
            />
          </XAxis>

          <YAxis>
            <Label
              value="Number of Products"
              angle={-90}
              position="insideLeft"
            />
          </YAxis>

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}