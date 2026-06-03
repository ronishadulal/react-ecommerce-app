"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );

        const fakeOrders = res.data.slice(0, 20).map((product, index) => ({
          id: `ORD-${1000 + index}`,
          customer: `Customer ${index + 1}`,
          product: product.title,
          amount: product.price,
          quantity: Math.floor(Math.random() * 5) + 1,
          status: ["Pending", "Processing", "Shipped", "Delivered"][
            Math.floor(Math.random() * 4)
          ],
          date: new Date().toLocaleDateString(),
        }));

        setOrders(fakeOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const getBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-500">
          Manage customer orders and deliveries
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {orders.length}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Delivered Orders</p>
          <h2 className="mt-2 text-3xl font-bold">
            {deliveredOrders}
          </h2>
        </div>

        <div className="rounded-xl border p-5">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="mt-2 text-3xl font-bold">
            ${totalRevenue}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-lg border p-3 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">{order.id}</td>

                <td className="p-4">{order.customer}</td>

                <td className="p-4 max-w-xs truncate">
                  {order.product}
                </td>

                <td className="p-4">{order.quantity}</td>

                <td className="p-4">${order.amount}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;