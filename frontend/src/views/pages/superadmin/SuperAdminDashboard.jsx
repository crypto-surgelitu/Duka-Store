/**
 * @file views/pages/superadmin/SuperAdminDashboard.jsx
 * Main Super Admin dashboard with platform-wide metrics and navigation.
 */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, DollarSign, ShoppingBag,
    AlertCircle, ArrowUp, Power, Wrench
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
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

const GROWTH_DATA = [
    { month: "Jan", vendors: 120, users: 890, revenue: 1200000 },
    { month: "Feb", vendors: 145, users: 1020, revenue: 1450000 },
    { month: "Mar", vendors: 132, users: 950, revenue: 1380000 },
    { month: "Apr", vendors: 180, users: 1240, revenue: 1680000 },
    { month: "May", vendors: 210, users: 1380, revenue: 1920000 },
    { month: "Jun", vendors: 235, users: 1620, revenue: 2150000 },
    { month: "Jul", vendors: 260, users: 1850, revenue: 2480000 },
    { month: "Aug", vendors: 290, users: 2100, revenue: 2820000 },
];

const PLATFORM_STATS = [
    { label: "Total Revenue", value: "KES 14.2M", change: "+22%", Icon: DollarSign, color: "#3b82f6" },
    { label: "Active Vendors", value: "3,248", change: "+290", Icon: Shield, color: "#2f7f33" },
    { label: "Total Customers", value: "82,400", change: "+4.1K", Icon: Users, color: "#f97316" },
    { label: "Total Shops", value: "4,521", change: "+520", Icon: Store, color: "#8b5cf6" },
    { label: "Total Orders", value: "156,789", change: "+12.5K", Icon: ShoppingBag, color: "#06b6d4" },
    { label: "Pending Payouts", value: "KES 420K", change: "38 requests", Icon: DollarSign, color: "#ef4444" },
];

const RECENT_ACTIVITIES = [
    { icon: "🏪", text: "New vendor 'Savanna Crafts' created a shop", time: "2m ago", color: "#2f7f33" },
    { icon: "💳", text: "Payout of KES 12,400 processed for Mountain Brew", time: "15m ago", color: "#3b82f6" },
    { icon: "👤", text: "250 new users signed up from Mombasa region", time: "1h ago", color: "#f97316" },
    { icon: "⚠️", text: "Vendor 'AgroHub' flagged for policy review", time: "2h ago", color: "#ef4444" },
    { icon: "✅", text: "System backup completed successfully", time: "3h ago", color: "#2f7f33" },
    { icon: "🚫", text: "Customer 'john@example.com' suspended for fraud", time: "4h ago", color: "#ef4444" },
    { icon: "🛒", text: "Order #156789 delivered successfully", time: "5h ago", color: "#3b82f6" },
    { icon: "⭐", text: "New shop 'Kili Electronics' verified", time: "6h ago", color: "#2f7f33" },
];

const SYSTEM_STATUS = [
    { label: "Platform Status", value: "Active", status: "healthy", Icon: Power },
    { label: "Maintenance Mode", value: "Off", status: "healthy", Icon: Wrench },
    { label: "Database", value: "Connected", status: "healthy", Icon: Activity },
    { label: "API Response", value: "124ms", status: "healthy", Icon: Activity },
];

const SuperAdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-[#f6f8f6]">
            {/* Dark Super Admin Sidebar */}
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
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
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
                        <h1 className="text-lg font-bold text-slate-800">Super Admin Portal</h1>
                        <p className="text-xs text-slate-400">{new Date().toLocaleDateString("en-KE", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                            <Power className="w-3 h-3" /> System Active
                        </span>
                        <span className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> 3 alerts
                        </span>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* System Status Cards */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {SYSTEM_STATUS.map(({ label, value, status, Icon }) => (
                            <div key={label} className={`bg-white rounded-xl p-4 border ${status === 'healthy' ? 'border-green-200' : 'border-red-200'} shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <p className="text-slate-500 text-xs font-medium">{label}</p>
                                    <Icon className={`w-4 h-4 ${status === 'healthy' ? 'text-green-500' : 'text-red-500'}`} />
                                </div>
                                <p className={`text-lg font-bold mt-1 ${status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Platform Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                        {PLATFORM_STATS.map(({ label, value, change, Icon, color }) => (
                            <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-slate-500 text-xs font-medium">{label}</p>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                                        <Icon className="w-4 h-4" style={{ color }} />
                                    </div>
                                </div>
                                <p className="text-2xl font-black" style={{ color }}>{value}</p>
                                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                    <ArrowUp className="w-3 h-3 text-green-500" /> {change}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Growth Chart */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Platform Growth: Vendors & Customers</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={GROWTH_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="vendors" fill="#ef4444" radius={[4, 4, 0, 0]} name="Vendors" />
                                    <Bar dataKey="users" fill="#f97316" radius={[4, 4, 0, 0]} name="Customers" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Revenue Chart */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Revenue Trend</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={GROWTH_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                                    <Tooltip formatter={(v) => [`KES ${v.toLocaleString()}`, "Revenue"]} />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800">Recent Platform Activity</h3>
                            <button onClick={() => navigate('/superadmin/audit-logs')} className="text-red-500 text-sm font-semibold hover:underline">View All Logs →</button>
                        </div>
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {RECENT_ACTIVITIES.map((a, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#f6f8f6] transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-[#f6f8f6] flex items-center justify-center text-base flex-shrink-0">{a.icon}</div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-700 leading-relaxed">{a.text}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button onClick={() => navigate('/superadmin/vendors')} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-red-300 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">Manage Vendors</p>
                                <p className="text-xs text-slate-400">Suspend or activate vendors</p>
                            </div>
                        </button>
                        <button onClick={() => navigate('/superadmin/customers')} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">Manage Customers</p>
                                <p className="text-xs text-slate-400">View or suspend customers</p>
                            </div>
                        </button>
                        <button onClick={() => navigate('/superadmin/shops')} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Store className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">View All Shops</p>
                                <p className="text-xs text-slate-400">Monitor shop activity</p>
                            </div>
                        </button>
                        <button onClick={() => navigate('/superadmin/system-controls')} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Settings className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800">System Controls</p>
                                <p className="text-xs text-slate-400">Maintenance & shutdown</p>
                            </div>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
