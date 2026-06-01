"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useEffect, useState } from "react";

export const description = "A horizontal bar chart";

const chartConfig = {
  productQuantity: {
    label: "Products",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;



export default function ChartBarCategory() {
  const [chartData, setChartData] = useState([]);

  const fetchProduct = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");

    const data = await res.json();

    console.log(data);

    const categoryMap: Record<string, number> = {};

    data.map((item: any) => {
      if (categoryMap[item.category.name]) {
        categoryMap[item.category.name]++;
      } else {
        categoryMap[item.category.name] = 1;
      }
    });

    const output = Object.entries(categoryMap).map((item) => {
      return {
        category: item[0],
        productQuantity: item[1],
      };
    });

    setChartData(output as any);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Horizontal</CardTitle>

        <CardDescription>Product Category</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <XAxis type="number" dataKey="productQuantity" hide />

            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="productQuantity"
              fill="var(--color-productQuantity)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending product categories
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Showing products grouped by category
        </div>
      </CardFooter>
    </Card>
    
  );
}
