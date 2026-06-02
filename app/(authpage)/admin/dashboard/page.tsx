import React from "react";
import ChartBarCategory from "./category";
import CustomizeLabels from "./price-distribution";
import KpiCards from "./KPI";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor products, categories, and pricing analytics.
        </p>
      </div>

      {/* KPI Section */}
      <div className="mb-8">
        <KpiCards />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        
        {/* Price Distribution */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <CustomizeLabels />
        </div>

        {/* Category Distribution */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold">
            Products by Category
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Distribution of products across categories.
          </p>

          <ChartBarCategory />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;