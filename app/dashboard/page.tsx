"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getGumCreationStats, getGumViewStats } from "./actions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<Array<{ date: string; gums: number; users: number }>>([]);
  const [viewStats, setViewStats] = useState<Array<{ date: string; views: number }>>([]);

  // Add function to calculate rounded max value
  const calculateYAxisMax = (data: Array<{ gums: number; users: number }>, key: "gums" | "users") => {
    const max = Math.max(...data.map((item) => item[key]));
    const roundedMax = Math.ceil(max / 10) * 10; // Round up to nearest 10
    return roundedMax;
  };

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGumCreationStats();
      const viewData = await getGumViewStats();
      setStats(data);
      setViewStats(viewData);
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>

      <div className="space-y-8">
        {/* Gums Created Chart */}
        <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-2xl font-semibold">Gums Created Per Day</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                <YAxis stroke="#000" fontSize={12} tickLine={false} domain={[0, calculateYAxisMax(stats, "gums")]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    color: "#000",
                  }}
                />
                <Bar dataKey="gums" name="Gums Created" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Users Chart */}
        <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-2xl font-semibold">Active Users Per Day</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                <YAxis stroke="#000" fontSize={12} tickLine={false} domain={[0, calculateYAxisMax(stats, "users")]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    color: "#000",
                  }}
                />
                <Bar dataKey="users" name="Active Users" fill="#000" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Gum Views Chart */}
        <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
          <h2 className="mb-4 text-2xl font-semibold">Gum Views Per Day</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#000"
                  fontSize={12}
                  tickLine={false}
                  domain={[0, (dataMax: number) => Math.ceil(dataMax / 10) * 10]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    color: "#000",
                  }}
                />
                <Bar dataKey="views" name="Gum Views" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
