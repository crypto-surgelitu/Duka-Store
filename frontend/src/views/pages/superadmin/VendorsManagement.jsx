/**
 * @file views/pages/superadmin/VendorsManagement.jsx
 * Manage all vendors on the platform - suspend/activate.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Search, Ban, CheckCircle,
    AlertTriangle, Mail, Phone
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

const MOCK_VENDORS = [
    { id: 1, name: "John Doe", email: "john@vendor.com", phone: "+254712345678", shop: "Savanna Crafts", status: "active", totalSales: 156000, orders: 234, joined: "2024-01-15", verified: true },
    { id: 2, name: "Jane Smith", email: "jane@vendor.com", phone: "+254723456789", shop: "Mountain Brew Coffee", status: "active", totalSales: 78000, orders: 89, joined: "2024-02-20", verified: true },
    { id: 3, name: "Mike Johnson", email: "mike@vendor.com", phone: "+254734567890", shop: "Kili Electronics", status: "active", totalSales: 890000, orders: 567, joined: "2024-03-10", verified: true },
    { id: 4, name: "Sarah Williams", email: "sarah@vendor.com", phone: "+254745678901", shop: "Coastal Fashion", status: "active", totalSales: 234000, orders: 234, joined: "2024-04-05", verified: false },
    { id: 5, name: "Tom Brown", email: "tom@vendor.com", phone: "+254756789012", shop: "AgroHub", status: "suspended", totalSales: 45000, orders: 12, joined: "2024-05-12", verified: false, suspensionReason: "Policy violation - selling prohibited items" },
    { id: 6, name: "David Lee", email: "david@vendor.com", phone: "+254767890123", shop: "Urban Tech", status: "active", totalSales: 1200000, orders: 890, joined: "2024-06-01", verified: true },
    { id: 7, name: "Emily Davis", email: "emily@vendor.com", phone: "+254778901234", shop: "Rift Valley Organics", status: "active", totalSales: 56000, orders: 67, joined: "2024-06-15", verified: true },
    { id: 8, name: "Peter Wilson", email: "peter@vendor.com", phone: "+254789012345", shop: "Nairobi Home Decor", status: "active", totalSales: 189000, orders: 123, joined: "2024-07-02", verified: true },
    { id: 9, name: "Alice Martin", email: "alice@vendor.com", phone: "+254790123456", shop: "Western Kenya Crafts", status: "suspended", totalSales: 12000, orders: 8, joined: "2024-07-10", verified: false, suspensionReason: "Suspected fraudulent activity" },
];

const VendorsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [vendors, setVendors] = useState(MOCK_VENDORS);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [suspendReason, setSuspendReason] = useState("");

    const filteredVendors = vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            vendor.shop.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || vendor.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSuspendClick = (vendor) => {
        setSelectedVendor(vendor);
        setShowSuspendModal(true);
    };

    const handleSuspend = () => {
        if (selectedVendor) {
            setVendors(vendors.map(v => 
                v.id === selectedVendor.id 
                    ? { ...v, status: "suspended", suspensionReason: suspendReason }
                    : v
            ));
            setShowSuspendModal(false);
            setSelectedVendor(null);
            setSuspendReason("");
            alert(`Vendor ${selectedVendor.name} has been suspended.`);
        }
    };

    const handleActivate = (vendor) => {
        if (window.confirm(`Are you sure you want to activate ${vendor.name}?`)) {
            setVendors(vendors.map(v => 
                v.id === vendor.id 
                    ? { ...v, status: "active", suspensionReason: null }
                    : v
            ));
            alert(`Vendor ${vendor.name} has been activated.`);
        }
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
                        <h1 className="text-lg font-bold text-slate-800">Vendors Management</h1>
                        <p className="text-xs text-slate-400">Suspend or activate vendor accounts</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-bold">S</div>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {/* Filters */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search vendors by name, email or shop..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Total Vendors</p>
                            <p className="text-2xl font-black text-slate-800">{vendors.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Active Vendors</p>
                            <p className="text-2xl font-black text-green-600">{vendors.filter(v => v.status === 'active').length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Suspended</p>
                            <p className="text-2xl font-black text-red-600">{vendors.filter(v => v.status === 'suspended').length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Total Sales</p>
                            <p className="text-2xl font-black text-purple-600">KES {vendors.reduce((a, v) => a + v.totalSales, 0).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Vendors Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Shop</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Sales</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Orders</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Joined</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredVendors.map((vendor) => (
                                        <tr key={vendor.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                                        {vendor.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 flex items-center gap-2">
                                                            {vendor.name}
                                                            {vendor.verified && <span className="text-blue-500 text-xs" title="Verified">✓</span>}
                                                        </p>
                                                        <p className="text-xs text-slate-400">{vendor.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{vendor.shop}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{vendor.phone}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">KES {vendor.totalSales.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{vendor.orders}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{vendor.joined}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {vendor.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {vendor.status === 'active' ? (
                                                        <button 
                                                            onClick={() => handleSuspendClick(vendor)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100"
                                                        >
                                                            <Ban className="w-3 h-3" /> Suspend
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleActivate(vendor)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-semibold hover:bg-green-100"
                                                        >
                                                            <CheckCircle className="w-3 h-3" /> Activate
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Suspend Modal */}
            {showSuspendModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">Suspend Vendor</h3>
                                <p className="text-sm text-slate-500">This action will block vendor access</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-slate-600 mb-2">Vendor: <span className="font-semibold">{selectedVendor?.name}</span></p>
                            <p className="text-sm text-slate-600 mb-4">Shop: <span className="font-semibold">{selectedVendor?.shop}</span></p>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Reason for suspension</label>
                            <textarea
                                value={suspendReason}
                                onChange={(e) => setSuspendReason(e.target.value)}
                                placeholder="Enter reason for suspension..."
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSuspendModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSuspend}
                                disabled={!suspendReason.trim()}
                                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Suspend Vendor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorsManagement;
