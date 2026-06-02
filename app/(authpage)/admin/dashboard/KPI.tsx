"use client";

import { useEffect, useState } from "react";
import { Package, Tags, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function KpiCards() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await res.json();
    setProducts(data);
  };

  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map((item) => item.category?.name)
  ).size;

  const averagePrice =
    products.length > 0
      ? (
          products.reduce((sum, item) => sum + item.price, 0) /
          products.length
        ).toFixed(2)
      : 0;

  const highestPrice =
    products.length > 0
      ? Math.max(...products.map((item) => item.price))
      : 0;

  const kpis = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: Tags,
    },
    {
      title: "Average Price",
      value: `$${averagePrice}`,
      icon: DollarSign,
    },
    {
      title: "Highest Price",
      value: `$${highestPrice}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;

        return (
          <Card key={kpi.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {kpi.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {kpi.value}
                </h2>
              </div>

              <Icon className="h-8 w-8 text-muted-foreground" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}