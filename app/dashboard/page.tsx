"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getGumCreationStats, getGumViewStats, getWeeklyGumCreationStats, getWeeklyGumViewStats } from "./actions";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<Array<{ date: string; gums: number; users: number }>>([]);
  const [viewStats, setViewStats] = useState<Array<{ date: string; views: number }>>([]);
  const [weeklyStats, setWeeklyStats] = useState<Array<{ week: string; gums: number; users: number }>>([]);
  const [weeklyViewStats, setWeeklyViewStats] = useState<Array<{ week: string; views: number }>>([]);

  // Add function to calculate rounded max value
  const calculateYAxisMax = (
    data: Array<{ gums?: number; users?: number; views?: number }>,
    key: "gums" | "users" | "views",
  ) => {
    if (data.length === 0) return 10; // Default value if no data
    const max = Math.max(...data.map((item) => (item[key] as number) || 0));
    const roundedMax = Math.ceil(max / 10) * 10; // Round up to nearest 10
    return roundedMax;
  };

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGumCreationStats();
      const viewData = await getGumViewStats();
      const weeklyData = await getWeeklyGumCreationStats();
      const weeklyViewData = await getWeeklyGumViewStats();

      setStats(data);
      setViewStats(viewData);
      setWeeklyStats(weeklyData);
      setWeeklyViewStats(weeklyViewData);
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>

      <div className="space-y-12">
        <div>
          <h2 className="mb-6 text-3xl font-bold">Daily Stats (Last 7 Days)</h2>
          <div className="space-y-8">
            {/* Gums Created Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Gums Created Per Day</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(stats, "gums")]}
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
                    <Bar dataKey="gums" name="Gums Created" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Active Users Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Active Users Per Day</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(stats, "users")]}
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
                    <Bar dataKey="users" name="Active Users" fill="#000" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gum Views Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Gum Views Per Day</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(viewStats, "views")]}
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

        <div>
          <h2 className="mb-6 text-3xl font-bold">Weekly Stats (All Time)</h2>
          <div className="space-y-8">
            {/* Weekly Gums Created Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Gums Created Per Week</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(weeklyStats, "gums")]}
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
                    <Bar dataKey="gums" name="Gums Created" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Active Users Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Active Users Per Week</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(weeklyStats, "users")]}
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
                    <Bar dataKey="users" name="Active Users" fill="#000" radius={[4, 4, 0, 0]} maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Weekly Gum Views Chart */}
            <div className="rounded-lg bg-black/5 p-6 backdrop-blur-lg">
              <h3 className="mb-4 text-2xl font-semibold">Gum Views Per Week</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyViewStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" stroke="#000" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#000"
                      fontSize={12}
                      tickLine={false}
                      domain={[0, calculateYAxisMax(weeklyViewStats, "views")]}
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
      </div>
    </div>
  );
}
