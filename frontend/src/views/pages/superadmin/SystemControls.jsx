/**
 * @file views/pages/superadmin/SystemControls.jsx
 * System controls: maintenance mode, shutdown, restart.
 */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Power, Wrench, AlertTriangle,
    Play, Square, Bell
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

const SystemControls = () => {
    const navigate = useNavigate();
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [maintenanceMessage, setMaintenanceMessage] = useState("System is under maintenance. Please try again later.");
    const [showShutdownModal, setShowShutdownModal] = useState(false);
    const [showRestartModal, setShowRestartModal] = useState(false);
    const [shutdownReason, setShutdownReason] = useState("");
    const [systemStatus, setSystemStatus] = useState("running");

    const handleToggleMaintenance = () => {
        if (window.confirm(maintenanceMode 
            ? "Are you sure you want to disable maintenance mode?" 
            : "Are you sure you want to enable maintenance mode? Users will see a maintenance page.")) {
            setMaintenanceMode(!maintenanceMode);
        }
    };

    const handleShutdown = () => {
        if (!shutdownReason.trim()) {
            alert("Please provide a reason for shutdown");
            return;
        }
        setSystemStatus("shutdown");
        setShowShutdownModal(false);
        alert("System has been shut down. Users cannot access the platform.");
    };

    const handleRestart = () => {
        setSystemStatus("restarting");
        setShowRestartModal(false);
        setTimeout(() => {
            setSystemStatus("running");
            alert("System has been restarted successfully.");
        }, 3000);
    };

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
                        <h1 className="text-lg font-bold text-slate-800">System Controls</h1>
                        <p className="text-xs text-slate-400">Manage platform status and system operations</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 text-xs font-bold rounded-full flex items-center gap-1 ${
                            systemStatus === 'running' ? 'bg-green-100 text-green-700' :
                            systemStatus === 'restarting' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            <Power className="w-3 h-3" /> 
                            {systemStatus === 'running' ? 'System Running' : 
                             systemStatus === 'restarting' ? 'Restarting...' : 'System Shutdown'}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* System Status Card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                        <h3 className="font-bold text-slate-800 mb-4">Platform Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className={`p-4 rounded-xl border-2 ${systemStatus === 'running' ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Power className={`w-6 h-6 ${systemStatus === 'running' ? 'text-green-600' : 'text-gray-400'}`} />
                                    <span className="font-semibold text-slate-800">Platform</span>
                                </div>
                                <p className={`text-2xl font-black ${systemStatus === 'running' ? 'text-green-600' : 'text-gray-400'}`}>
                                    {systemStatus === 'running' ? 'Active' : systemStatus === 'restarting' ? 'Restarting' : 'Shutdown'}
                                </p>
                            </div>
                            <div className={`p-4 rounded-xl border-2 ${maintenanceMode ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <Wrench className={`w-6 h-6 ${maintenanceMode ? 'text-orange-600' : 'text-green-600'}`} />
                                    <span className="font-semibold text-slate-800">Maintenance</span>
                                </div>
                                <p className={`text-2xl font-black ${maintenanceMode ? 'text-orange-600' : 'text-green-600'}`}>
                                    {maintenanceMode ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50">
                                <div className="flex items-center gap-3 mb-2">
                                    <Activity className="w-6 h-6 text-blue-600" />
                                    <span className="font-semibold text-slate-800">Last Backup</span>
                                </div>
                                <p className="text-2xl font-black text-blue-600">2 hours ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Control Actions */}
                    <h3 className="font-bold text-slate-800 mb-4">System Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Maintenance Mode */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <Wrench className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Maintenance Mode</h4>
                                    <p className="text-sm text-slate-500">Show maintenance page to users</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Maintenance Message</label>
                                <textarea
                                    value={maintenanceMessage}
                                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                    rows={3}
                                    disabled={!maintenanceMode}
                                />
                            </div>
                            <button
                                onClick={handleToggleMaintenance}
                                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                    maintenanceMode 
                                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                                }`}
                            >
                                {maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
                            </button>
                        </div>

                        {/* Shutdown System */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                    <Square className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Shutdown System</h4>
                                    <p className="text-sm text-slate-500">Completely stop the platform</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">
                                This will take the entire platform offline. Users will not be able to access any part of the system until you restart it.
                            </p>
                            <button
                                onClick={() => setShowShutdownModal(true)}
                                disabled={systemStatus === 'shutdown'}
                                className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Shutdown Platform
                            </button>
                        </div>
                    </div>

                    {/* Restart System */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Play className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800">Restart System</h4>
                                <p className="text-sm text-slate-500">Restart all services and clear cache</p>
                            </div>
                            <button
                                onClick={() => setShowRestartModal(true)}
                                disabled={systemStatus !== 'running'}
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Restart Now
                            </button>
                        </div>
                        <p className="text-sm text-slate-500">
                            System restart will temporarily interrupt service for approximately 30 seconds. All active users will be disconnected.
                        </p>
                    </div>

                    {/* Notifications Settings */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-slate-500" /> Notification Settings
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-slate-800">System Alerts</p>
                                    <p className="text-sm text-slate-500">Receive alerts for system issues</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-slate-800">Security Alerts</p>
                                    <p className="text-sm text-slate-500">Receive alerts for suspicious activities</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-semibold text-slate-800">Daily Reports</p>
                                    <p className="text-sm text-slate-500">Receive daily system summary</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Shutdown Modal */}
            {showShutdownModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Shutdown Platform</h3>
                                <p className="text-sm text-slate-500">This action cannot be undone easily</p>
                            </div>
                        </div>
                        <div className="mb-4 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700">⚠️ Warning: This will take the entire platform offline. All users will be disconnected.</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Reason for shutdown</label>
                            <textarea
                                value={shutdownReason}
                                onChange={(e) => setShutdownReason(e.target.value)}
                                placeholder="Enter reason for shutdown..."
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowShutdownModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleShutdown}
                                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600"
                            >
                                Shutdown Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Restart Modal */}
            {showRestartModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Play className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Restart Platform</h3>
                                <p className="text-sm text-slate-500">This will restart all services</p>
                            </div>
                        </div>
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">ℹ️ The system will be unavailable for approximately 30 seconds during restart.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRestartModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRestart}
                                className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600"
                            >
                                Restart Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemControls;
