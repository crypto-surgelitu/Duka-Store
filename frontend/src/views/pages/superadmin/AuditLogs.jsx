/**
 * @file views/pages/superadmin/AuditLogs.jsx
 * Comprehensive audit logs for all admin actions.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Search, Filter, Download,
    User, ShoppingBag, Store as StoreIcon, AlertTriangle, CheckCircle
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

const MOCK_AUDIT_LOGS = [
    { id: 1, action: "VENDOR_SUSPENDED", targetType: "vendor", targetName: "AgroHub", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Policy violation - selling prohibited items", ip: "192.168.1.100", timestamp: "2024-08-15 14:32:00" },
    { id: 2, action: "CUSTOMER_SUSPENDED", targetType: "customer", targetName: "emma@gmail.com", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Suspected fraud - chargebacks", ip: "192.168.1.100", timestamp: "2024-08-15 12:15:00" },
    { id: 3, action: "SHOP_DELETED", targetType: "shop", targetName: "Fake Products Store", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Violation of terms of service", ip: "192.168.1.100", timestamp: "2024-08-14 16:45:00" },
    { id: 4, action: "VENDOR_ACTIVATED", targetType: "vendor", targetName: "Rift Valley Organics", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Reinstated after review", ip: "192.168.1.100", timestamp: "2024-08-14 10:20:00" },
    { id: 5, action: "MAINTENANCE_MODE_ENABLED", targetType: "system", targetName: "Platform", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Scheduled system maintenance", ip: "192.168.1.100", timestamp: "2024-08-13 22:00:00" },
    { id: 6, action: "VENDOR_SUSPENDED", targetType: "vendor", targetName: "Western Kenya Crafts", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Suspected fraudulent activity", ip: "192.168.1.100", timestamp: "2024-08-13 15:30:00" },
    { id: 7, action: "SHOP_VERIFIED", targetType: "shop", targetName: "Kili Electronics", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Verified business documents", ip: "192.168.1.100", timestamp: "2024-08-12 11:45:00" },
    { id: 8, action: "CUSTOMER_ACTIVATED", targetType: "customer", targetName: "jack@outlook.com", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Reinstated after appeal", ip: "192.168.1.100", timestamp: "2024-08-12 09:10:00" },
    { id: 9, action: "SYSTEM_BACKUP", targetType: "system", targetName: "Database", admin: "System", adminEmail: "system@dukastore.com", details: "Automated daily backup completed", ip: "127.0.0.1", timestamp: "2024-08-11 23:59:00" },
    { id: 10, action: "VENDOR_SUSPENDED", targetType: "vendor", targetName: "Scam Electronics", admin: "Super Admin", adminEmail: "superadmin@dukastore.com", details: "Customer complaints - not delivering products", ip: "192.168.1.100", timestamp: "2024-08-11 14:20:00" },
    { id: 11, action: "PAYOUT_PROCESSED", targetType: "payout", targetName: "Mountain Brew Coffee", admin: "System", adminEmail: "system@dukastore.com", details: "Automated payout - KES 12,400", ip: "127.0.0.1", timestamp: "2024-08-10 10:00:00" },
    { id: 12, action: "SHOP_CREATED", targetType: "shop", targetName: "Nairobi Home Decor", admin: "Vendor", adminEmail: "peter@vendor.com", details: "New shop registration", ip: "192.168.1.50", timestamp: "2024-08-09 16:30:00" },
];

const ACTION_COLORS = {
    VENDOR_SUSPENDED: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
    CUSTOMER_SUSPENDED: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
    SHOP_DELETED: { bg: "bg-red-100", text: "text-red-700", icon: AlertTriangle },
    VENDOR_ACTIVATED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
    CUSTOMER_ACTIVATED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
    SHOP_VERIFIED: { bg: "bg-blue-100", text: "text-blue-700", icon: CheckCircle },
    MAINTENANCE_MODE_ENABLED: { bg: "bg-orange-100", text: "text-orange-700", icon: Activity },
    SYSTEM_BACKUP: { bg: "bg-gray-100", text: "text-gray-700", icon: Activity },
    PAYOUT_PROCESSED: { bg: "bg-purple-100", text: "text-purple-700", icon: CheckCircle },
    SHOP_CREATED: { bg: "bg-green-100", text: "text-green-700", icon: StoreIcon },
};

const AuditLogs = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [actionFilter, setActionFilter] = useState("all");
    const [targetFilter, setTargetFilter] = useState("all");

    const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
        const matchesSearch = log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.details.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAction = actionFilter === "all" || log.action === actionFilter;
        const matchesTarget = targetFilter === "all" || log.targetType === targetFilter;
        return matchesSearch && matchesAction && matchesTarget;
    });

    const uniqueActions = [...new Set(MOCK_AUDIT_LOGS.map(l => l.action))];
    const uniqueTargets = [...new Set(MOCK_AUDIT_LOGS.map(l => l.targetType))];

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
                        <h1 className="text-lg font-bold text-slate-800">Audit Logs</h1>
                        <p className="text-xs text-slate-400">Track all admin actions and system events</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">
                            <Download className="w-4 h-4" /> Export Logs
                        </button>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* Stats Summary */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Total Actions</p>
                            <p className="text-2xl font-black text-slate-800">{MOCK_AUDIT_LOGS.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Suspensions</p>
                            <p className="text-2xl font-black text-red-600">{MOCK_AUDIT_LOGS.filter(l => l.action.includes('SUSPENDED')).length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Activations</p>
                            <p className="text-2xl font-black text-green-600">{MOCK_AUDIT_LOGS.filter(l => l.action.includes('ACTIVATED')).length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">System Events</p>
                            <p className="text-2xl font-black text-blue-600">{MOCK_AUDIT_LOGS.filter(l => l.targetType === 'system').length}</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search logs by target, admin, or details..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={actionFilter}
                                    onChange={(e) => setActionFilter(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                >
                                    <option value="all">All Actions</option>
                                    {uniqueActions.map(action => (
                                        <option key={action} value={action}>{action}</option>
                                    ))}
                                </select>
                                <select
                                    value={targetFilter}
                                    onChange={(e) => setTargetFilter(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                >
                                    <option value="all">All Targets</option>
                                    {uniqueTargets.map(target => (
                                        <option key={target} value={target}>{target}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Audit Logs Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Action</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Target</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Performed By</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Details</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">IP Address</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredLogs.map((log) => {
                                        const actionStyle = ACTION_COLORS[log.action] || { bg: "bg-gray-100", text: "text-gray-700", icon: Activity };
                                        const Icon = actionStyle.icon;
                                        return (
                                            <tr key={log.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${actionStyle.bg} ${actionStyle.text}`}>
                                                        <Icon className="w-3 h-3" />
                                                        {log.action.replace(/_/g, ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {log.targetType === 'vendor' && <Shield className="w-4 h-4 text-slate-400" />}
                                                        {log.targetType === 'customer' && <User className="w-4 h-4 text-slate-400" />}
                                                        {log.targetType === 'shop' && <StoreIcon className="w-4 h-4 text-slate-400" />}
                                                        {log.targetType === 'system' && <Activity className="w-4 h-4 text-slate-400" />}
                                                        {log.targetType === 'payout' && <ShoppingBag className="w-4 h-4 text-slate-400" />}
                                                        <span className="text-sm text-slate-800 font-medium">{log.targetName}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400 capitalize">{log.targetType}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-slate-800">{log.admin}</p>
                                                    <p className="text-xs text-slate-400">{log.adminEmail}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{log.details}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.ip}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{log.timestamp}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {filteredLogs.length === 0 && (
                            <div className="p-12 text-center">
                                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">No audit logs found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AuditLogs;
