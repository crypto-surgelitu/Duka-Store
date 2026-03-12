/**
 * @file views/pages/vendor/VendorDashboard.jsx
 * Main vendor dashboard with overview stats, analytics chart, and recent orders.
 */
import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
    LayoutDashboard, Store, Package, BarChart2, Settings,
    TrendingUp, ShoppingBag, Eye, Users, ArrowUp, Plus
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const NAV_ITEMS = [
    { label: "Dashboard", to: "/vendor", Icon: LayoutDashboard },
    { label: "My Shops", to: "/vendor/shops", Icon: Store },
    { label: "Products", to: "/vendor/products", Icon: Package },
    { label: "Analytics", to: "/vendor/analytics", Icon: BarChart2 },
    { label: "Settings", to: "/vendor/settings", Icon: Settings },
];

const REVENUE_DATA = [
    { month: "Jan", revenue: 45000 }, { month: "Feb", revenue: 52000 },
    { month: "Mar", revenue: 48000 }, { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 55000 }, { month: "Jun", revenue: 72000 },
    { month: "Jul", revenue: 68000 }, { month: "Aug", revenue: 79000 },
];

const STATS = [
    { label: "Total Revenue", value: "KES 480K", change: "+18%", Icon: TrendingUp, color: "#2f7f33" },
    { label: "Orders Today", value: "24", change: "+5", Icon: ShoppingBag, color: "#f97316" },
    { label: "Store Views", value: "1.2K", change: "+210", Icon: Eye, color: "#3b82f6" },
    { label: "Conversion Rate", value: "3.8%", change: "+0.4%", Icon: Users, color: "#8b5cf6" },
];

const TOP_PRODUCTS = [
    { name: "Handmade Pottery Set", sales: 142, revenue: "KES 76,680", status: "In Stock", emoji: "🏺" },
    { name: "Wildflower Honey 500g", sales: 98, revenue: "KES 21,168", status: "Low Stock", emoji: "🍯" },
    { name: "Heritage Woven Basket", sales: 67, revenue: "KES 28,140", status: "In Stock", emoji: "🧺" },
    { name: "Ethiopian Dark Roast", sales: 54, revenue: "KES 14,580", status: "In Stock", emoji: "☕" },
];

const VendorDashboard = () => {
    return (
        <DashboardLayout navItems={NAV_ITEMS} title="Vendor Dashboard">
            {/* Quick actions banner */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-black text-slate-800">Store Overview</h2>
                    <p className="text-slate-400 text-sm">Last 30 days performance</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.href = "/vendor/shops/new"}
                        className="flex items-center gap-2 border border-[#2f7f33] text-[#2f7f33] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2f7f33]/5 transition-all"
                    >
                        <Plus className="w-4 h-4" /> Add Shop
                    </button>
                    <button
                        onClick={() => window.location.href = "/vendor/products/new"}
                        className="flex items-center gap-2 bg-[#2f7f33] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1e5e21] transition-all"
                    >
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {STATS.map(({ label, value, change, Icon, color }) => (
                    <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-slate-500 text-xs font-medium">{label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                                <Icon className="w-4 h-4" style={{ color }} />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-slate-800">{value}</p>
                        <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
                            <ArrowUp className="w-3 h-3" /> {change} this month
                        </p>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Revenue Overview</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">↑ 18% this month</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={REVENUE_DATA}>
                        <defs>
                            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2f7f33" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#2f7f33" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                        <Tooltip formatter={(v) => [`KES ${v.toLocaleString()}`, "Revenue"]} />
                        <Area type="monotone" dataKey="revenue" stroke="#2f7f33" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: "#2f7f33", r: 3 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">Top Selling Products</h3>
                    <button className="text-[#2f7f33] text-sm font-semibold hover:underline">View all →</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {TOP_PRODUCTS.map((p) => (
                        <div key={p.name} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f6f8f6] transition-colors">
                            <span className="text-2xl w-10 text-center">{p.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-slate-800 truncate">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.sales} units sold</p>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === "In Stock" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-600"}`}>
                                {p.status}
                            </span>
                            <p className="font-bold text-sm text-slate-700 whitespace-nowrap">{p.revenue}</p>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VendorDashboard;
