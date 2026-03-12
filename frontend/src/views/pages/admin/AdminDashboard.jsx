/**
 * @file views/pages/admin/AdminDashboard.jsx
 * Super Admin dashboard with platform-wide metrics.
 */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Users, Store, CreditCard, Activity, Settings,
    TrendingUp, ShoppingBag, DollarSign, AlertCircle, ArrowUp
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Logo from "../../components/Logo";

const ADMIN_NAV = [
    { label: "Overview", to: "/admin", Icon: LayoutDashboard },
    { label: "Vendors", to: "/admin/vendors", Icon: Store },
    { label: "Users", to: "/admin/users", Icon: Users },
    { label: "Payouts", to: "/admin/payouts", Icon: CreditCard },
    { label: "System Health", to: "/admin/health", Icon: Activity },
    { label: "Settings", to: "/admin/settings", Icon: Settings },
];

const CHART_DATA = [
    { month: "Jan", vendors: 120, users: 890 }, { month: "Feb", vendors: 145, users: 1020 },
    { month: "Mar", vendors: 132, users: 950 }, { month: "Apr", vendors: 180, users: 1240 },
    { month: "May", vendors: 210, users: 1380 }, { month: "Jun", vendors: 235, users: 1620 },
    { month: "Jul", vendors: 260, users: 1850 }, { month: "Aug", vendors: 290, users: 2100 },
];

const PLATFORM_STATS = [
    { label: "Total Revenue", value: "KES 14.2M", change: "+22%", Icon: DollarSign, color: "#3b82f6" },
    { label: "Active Vendors", value: "3,248", change: "+290", Icon: Store, color: "#2f7f33" },
    { label: "Total Users", value: "82,400", change: "+4.1K", Icon: Users, color: "#f97316" },
    { label: "Pending Payouts", value: "KES 420K", change: "38 requests", Icon: CreditCard, color: "#ef4444" },
];

const ACTIVITIES = [
    { icon: "🏪", text: "New vendor 'Savanna Crafts' created a shop", time: "2m ago", color: "#2f7f33" },
    { icon: "💳", text: "Payout of KES 12,400 processed for Mountain Brew", time: "15m ago", color: "#3b82f6" },
    { icon: "👤", text: "250 new users signed up from Mombasa region", time: "1h ago", color: "#f97316" },
    { icon: "⚠️", text: "Vendor 'AgroHub' flagged for policy review", time: "2h ago", color: "#ef4444" },
    { icon: "✅", text: "System backup completed successfully", time: "3h ago", color: "#2f7f33" },
];

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex bg-[#f6f8f6]">
            {/* Dark Admin Sidebar */}
            <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0f172a] flex flex-col z-40">
                <div className="h-16 flex items-center px-5 border-b border-white/10">
                    <Logo size={34} textSize="text-base" />
                </div>
                <div className="px-3 py-2">
                    <span className="text-xs text-slate-500 font-semibold px-3 uppercase tracking-wider">Super Admin</span>
                </div>
                <nav className="flex-1 py-2 px-3 space-y-1 overflow-y-auto">
                    {ADMIN_NAV.map(({ label, to, Icon }) => (
                        <NavLink key={to} to={to} end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-[#3b82f6]/20 text-[#3b82f6]" : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`
                            }>
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#3b82f6]" : "text-slate-500"}`} />
                                    {label}
                                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-sm font-bold">S</div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">Super Admin</p>
                            <p className="text-xs text-slate-500 truncate">admin@dukastore.com</p>
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
                        <span className="px-3 py-1.5 bg-[#ef4444]/10 text-red-600 text-xs font-bold rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> 3 alerts
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#0f172a] flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* Platform Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                        {/* Dual Axis Growth Chart */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Platform Growth: Vendors vs Users</h3>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={CHART_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="vendors" fill="#2f7f33" radius={[4, 4, 0, 0]} name="New Vendors" />
                                    <Bar dataKey="users" fill="#f97316" radius={[4, 4, 0, 0]} name="New Users" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Activity Feed */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="font-bold text-slate-800">Recent Activity</h3>
                            </div>
                            <div className="p-4 space-y-1">
                                {ACTIVITIES.map((a, i) => (
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
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
