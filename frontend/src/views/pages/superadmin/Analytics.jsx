/**
 * @file views/pages/superadmin/Analytics.jsx
 * Platform-wide analytics and metrics.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, TrendingUp, TrendingDown,
    DollarSign, ShoppingBag, ArrowUp
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Logo from "../../components/Logo";

const SUPERADMIN_NAV = [
    { label: "Overview", to: "/superadmin", Icon: LayoutDashboard, end: true },
    { label: "Shops", to: "/superadmin/shops", Icon: Store },
    { label: "Vendors", to: "/superadmin/vendors", Icon: Shield },
    { label: "Customers", to: "/superadmin/customers", Icon: Users },
    { label: "Analytics", to: "/superadmin/analytics", Icon: BarChart2 },
    { label: "Audit Logs", to: "/superadmin/audit-logs", Icon: FileText },
    { label: "System Health", to: "/superadmin/system-health", Icon: Activity },
    { label: "System Controls", to: "/superadmin/system-controls", Icon: Settings },
];

const REVENUE_DATA = [
    { month: "Jan", revenue: 1200000, orders: 1234 },
    { month: "Feb", revenue: 1450000, orders: 1456 },
    { month: "Mar", revenue: 1380000, orders: 1389 },
    { month: "Apr", revenue: 1680000, orders: 1678 },
    { month: "May", revenue: 1920000, orders: 1923 },
    { month: "Jun", revenue: 2150000, orders: 2156 },
    { month: "Jul", revenue: 2480000, orders: 2489 },
    { month: "Aug", revenue: 2820000, orders: 2823 },
];

const CATEGORY_DATA = [
    { name: "Electronics", value: 35, color: "#3b82f6" },
    { name: "Fashion", value: 25, color: "#f97316" },
    { name: "Food & Beverage", value: 20, color: "#2f7f33" },
    { name: "Home & Garden", value: 12, color: "#8b5cf6" },
    { name: "Others", value: 8, color: "#06b6d4" },
];

const LOCATION_DATA = [
    { location: "Nairobi", vendors: 1200, customers: 28000 },
    { location: "Mombasa", vendors: 650, customers: 18000 },
    { location: "Kisumu", vendors: 420, customers: 12000 },
    { location: "Nakuru", vendors: 380, customers: 8900 },
    { location: "Eldoret", vendors: 290, customers: 6500 },
    { location: "Others", vendors: 1308, customers: 11000 },
];

const TOP_VENDORS = [
    { name: "Urban Tech", sales: 1200000, orders: 890, rating: 4.8 },
    { name: "Kili Electronics", sales: 890000, orders: 567, rating: 4.6 },
    { name: "Coastal Fashion", sales: 234000, orders: 234, rating: 4.5 },
    { name: "Savanna Crafts", sales: 156000, orders: 234, rating: 4.9 },
    { name: "Nairobi Home Decor", sales: 189000, orders: 123, rating: 4.7 },
];

const Analytics = () => {
    const [dateRange, setDateRange] = useState("8months");

    return (
        <div className="min-h-screen flex bg-[#f6f8f6]">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0f172a] flex flex-col z-40">
                <div className="h-16 flex items-center px-5 border-b border-white/10">
                    <Logo size={34} textSize="text-base" />
                </div>
                <div className="px-3 py-2">
                    <span className="text-xs text-red-400 font-semibold px-3 uppercase tracking-wider flex items-center gap-2">
                        <Shield className="w-3 h-3" /> Super Admin
                    </span>
                </div>
                <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
                    {SUPERADMIN_NAV.map(({ label, to, Icon, end }) => (
                        <NavLink key={to} to={to} end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`
                            }>
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-red-400" : "text-slate-500"}`} />
                                    {label}
                                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-red-400" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">Super Admin</p>
                            <p className="text-xs text-slate-500 truncate">superadmin@dukastore.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 h-16 flex items-center justify-between px-6 shadow-sm">
                    <div>
                        <h1 className="text-lg font-bold text-slate-800">Platform Analytics</h1>
                        <p className="text-xs text-slate-400">Comprehensive platform-wide metrics and insights</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
                        >
                            <option value="30days">Last 30 Days</option>
                            <option value="3months">Last 3 Months</option>
                            <option value="6months">Last 6 Months</option>
                            <option value="8months">Last 8 Months</option>
                            <option value="1year">Last 1 Year</option>
                        </select>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-xs font-medium">Total Revenue</p>
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <DollarSign className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-800">KES 14.2M</p>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <ArrowUp className="w-3 h-3" /> +22% from last period
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-xs font-medium">Total Orders</p>
                                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <ShoppingBag className="w-4 h-4 text-purple-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-800">156,789</p>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <ArrowUp className="w-3 h-3" /> +18% from last period
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-xs font-medium">Avg Order Value</p>
                                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-800">KES 2,856</p>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <ArrowUp className="w-3 h-3" /> +5% from last period
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-slate-500 text-xs font-medium">Conversion Rate</p>
                                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-orange-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-slate-800">3.8%</p>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                <ArrowUp className="w-3 h-3" /> +0.4% from last period
                            </p>
                        </div>
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Revenue & Orders Chart */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Revenue & Orders Trend</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <AreaChart data={REVENUE_DATA}>
                                    <defs>
                                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip formatter={(value, name) => [name === 'revenue' ? `KES ${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']} />
                                    <Legend />
                                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revenueGrad)" name="Revenue" />
                                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} dot={{ fill: "#f97316", r: 3 }} name="Orders" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Category Distribution */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Sales by Category</h3>
                            <div className="flex items-center">
                                <ResponsiveContainer width="50%" height={280}>
                                    <PieChart>
                                        <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                            {CATEGORY_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex-1 space-y-3">
                                    {CATEGORY_DATA.map((cat) => (
                                        <div key={cat.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                                                <span className="text-sm text-slate-600">{cat.name}</span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-800">{cat.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Location Distribution */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Vendors & Customers by Location</h3>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={LOCATION_DATA} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis type="category" dataKey="location" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="vendors" fill="#ef4444" radius={[0, 4, 4, 0]} name="Vendors" />
                                    <Bar dataKey="customers" fill="#f97316" radius={[0, 4, 4, 0]} name="Customers" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Top Vendors */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Top Performing Vendors</h3>
                            <div className="space-y-4">
                                {TOP_VENDORS.map((vendor, index) => (
                                    <div key={vendor.name} className="flex items-center gap-4">
                                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="font-semibold text-slate-800">{vendor.name}</p>
                                                <p className="text-sm font-bold text-slate-800">KES {vendor.sales.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span>{vendor.orders} orders</span>
                                                <span className="flex items-center gap-1">★ {vendor.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Analytics;
