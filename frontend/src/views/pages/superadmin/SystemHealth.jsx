/**
 * @file views/pages/superadmin/SystemHealth.jsx
 * Detailed system health monitoring.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Server, Database, Globe,
    Cpu, HardDrive, Wifi, Clock, CheckCircle, AlertTriangle,
    RefreshCw
} from "lucide-react";
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

const MOCK_SERVICES = [
    { name: "API Server", status: "healthy", uptime: "15 days", responseTime: "124ms", requests: "2.4M", icon: Server },
    { name: "Database (MySQL)", status: "healthy", uptime: "30 days", responseTime: "45ms", requests: "15.6M", icon: Database },
    { name: "Web Server (Nginx)", status: "healthy", uptime: "30 days", responseTime: "12ms", requests: "8.2M", icon: Globe },
    { name: "M-Pesa Integration", status: "healthy", uptime: "30 days", responseTime: "890ms", requests: "45.2K", icon: Activity },
    { name: "Email Service", status: "healthy", uptime: "30 days", responseTime: "234ms", requests: "12.8K", icon: Activity },
    { name: "SMS Service (AT)", status: "degraded", uptime: "28 days", responseTime: "1200ms", requests: "89.4K", icon: Activity },
    { name: "CDN", status: "healthy", uptime: "30 days", responseTime: "8ms", requests: "45.6M", icon: Globe },
    { name: "Background Jobs", status: "healthy", uptime: "30 days", responseTime: "N/A", requests: "234.5K", icon: Cpu },
];

const MOCK_METRICS = [
    { label: "CPU Usage", value: "42%", status: "healthy", history: [35, 42, 38, 45, 42, 40, 42] },
    { label: "Memory Usage", value: "68%", status: "healthy", history: [65, 68, 70, 66, 68, 72, 68] },
    { label: "Disk Usage", value: "45%", status: "healthy", history: [44, 44, 45, 45, 45, 45, 45] },
    { label: "Network In", value: "125 MB/s", status: "healthy", history: [120, 130, 115, 125, 140, 135, 125] },
    { label: "Network Out", value: "89 MB/s", status: "healthy", history: [85, 90, 82, 88, 95, 91, 89] },
    { label: "Active Connections", value: "1,247", status: "healthy", history: [1100, 1250, 1180, 1300, 1350, 1280, 1247] },
];

const SystemHealth = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const overallStatus = MOCK_SERVICES.every(s => s.status === "healthy") ? "healthy" : "degraded";

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
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-red-500/20 text-red-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
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
                        <h1 className="text-lg font-bold text-slate-800">System Health</h1>
                        <p className="text-xs text-slate-400">Real-time system and service monitoring</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleRefresh}
                            className={`flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 ${isRefreshing ? 'animate-spin' : ''}`}
                        >
                            <RefreshCw className="w-4 h-4" /> Refresh
                        </button>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* Overall Status */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className={`col-span-1 md:col-span-2 bg-white rounded-xl p-6 border ${overallStatus === 'healthy' ? 'border-green-200' : 'border-orange-200'} shadow-sm`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${overallStatus === 'healthy' ? 'bg-green-100' : 'bg-orange-100'}`}>
                                    {overallStatus === 'healthy' ? (
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    ) : (
                                        <AlertTriangle className="w-8 h-8 text-orange-600" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800">System {overallStatus === 'healthy' ? 'Operational' : 'Degraded'}</h2>
                                    <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Server className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-slate-500">Services</span>
                            </div>
                            <p className="text-2xl font-black text-slate-800">{MOCK_SERVICES.filter(s => s.status === 'healthy').length}/{MOCK_SERVICES.length}</p>
                            <p className="text-xs text-green-600">All operational</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="w-5 h-5 text-purple-500" />
                                <span className="text-sm text-slate-500">Uptime</span>
                            </div>
                            <p className="text-2xl font-black text-slate-800">30 days</p>
                            <p className="text-xs text-green-600">Since Jul 16, 2024</p>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <h3 className="font-bold text-slate-800 mb-4">Services Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {MOCK_SERVICES.map((service) => (
                            <div key={service.name} className={`bg-white rounded-xl p-4 border ${service.status === 'healthy' ? 'border-gray-100' : 'border-orange-200'} shadow-sm`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <service.icon className={`w-5 h-5 ${service.status === 'healthy' ? 'text-green-500' : 'text-orange-500'}`} />
                                        <span className="font-semibold text-slate-800 text-sm">{service.name}</span>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${service.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {service.status}
                                    </span>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Uptime</span>
                                        <span className="text-slate-800 font-medium">{service.uptime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Response</span>
                                        <span className="text-slate-800 font-medium">{service.responseTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Requests</span>
                                        <span className="text-slate-800 font-medium">{service.requests}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Server Metrics */}
                    <h3 className="font-bold text-slate-800 mb-4">Server Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {MOCK_METRICS.map((metric) => (
                            <div key={metric.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-500">{metric.label}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${metric.status === 'healthy' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {metric.status}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-slate-800 mb-3">{metric.value}</p>
                                <div className="flex items-end gap-1 h-8">
                                    {metric.history.map((val, idx) => (
                                        <div 
                                            key={idx} 
                                            className="flex-1 bg-blue-500 rounded-sm"
                                            style={{ height: `${(val / Math.max(...metric.history)) * 100}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Database Info */}
                    <div className="mt-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Database className="w-5 h-5 text-blue-500" /> Database Information
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Database Size</p>
                                <p className="font-semibold text-slate-800">2.4 GB</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Tables</p>
                                <p className="font-semibold text-slate-800">8</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Total Rows</p>
                                <p className="font-semibold text-slate-800">~1.2M</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Connections</p>
                                <p className="font-semibold text-slate-800">24 / 100</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SystemHealth;
