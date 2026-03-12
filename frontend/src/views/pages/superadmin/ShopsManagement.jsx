/**
 * @file views/pages/superadmin/ShopsManagement.jsx
 * Manage all shops across the platform.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Search, Filter, Trash2,
    Eye, MoreVertical, ArrowUpDown
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

const MOCK_SHOPS = [
    { id: 1, name: "Savanna Crafts", vendor: "John Doe", category: "Handmade", location: "Nairobi", status: "active", products: 45, orders: 234, revenue: 156000, verified: true, created: "2024-01-15" },
    { id: 2, name: "Mountain Brew Coffee", vendor: "Jane Smith", category: "Food & Beverage", location: "Nakuru", status: "active", products: 12, orders: 89, revenue: 78000, verified: true, created: "2024-02-20" },
    { id: 3, name: "Kili Electronics", vendor: "Mike Johnson", category: "Electronics", location: "Mombasa", status: "active", products: 156, orders: 567, revenue: 890000, verified: true, created: "2024-03-10" },
    { id: 4, name: "Coastal Fashion", vendor: "Sarah Williams", category: "Fashion", location: "Mombasa", status: "active", products: 78, orders: 234, revenue: 234000, verified: false, created: "2024-04-05" },
    { id: 5, name: "AgroHub", vendor: "Tom Brown", category: "Agriculture", location: "Kisumu", status: "suspended", products: 34, orders: 12, revenue: 45000, verified: false, created: "2024-05-12" },
    { id: 6, name: "Urban Tech", vendor: "David Lee", category: "Electronics", location: "Nairobi", status: "active", products: 234, orders: 890, revenue: 1200000, verified: true, created: "2024-06-01" },
    { id: 7, name: "Rift Valley Organics", vendor: "Emily Davis", category: "Food & Beverage", location: "Naivasha", status: "active", products: 23, orders: 67, revenue: 56000, verified: true, created: "2024-06-15" },
    { id: 8, name: "Nairobi Home Decor", vendor: "Peter Wilson", category: "Home & Garden", location: "Nairobi", status: "active", products: 67, orders: 123, revenue: 189000, verified: true, created: "2024-07-02" },
];

const ShopsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [shops, setShops] = useState(MOCK_SHOPS);

    const filteredShops = shops.filter(shop => {
        const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            shop.vendor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || shop.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDeleteShop = (id) => {
        if (window.confirm("Are you sure you want to delete this shop? This action cannot be undone.")) {
            setShops(shops.filter(s => s.id !== id));
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
                        <h1 className="text-lg font-bold text-slate-800">Shops Management</h1>
                        <p className="text-xs text-slate-400">View and manage all shops on the platform</p>
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
                                    placeholder="Search shops by name or vendor..."
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
                            <p className="text-slate-500 text-xs font-medium">Total Shops</p>
                            <p className="text-2xl font-black text-slate-800">{shops.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Active Shops</p>
                            <p className="text-2xl font-black text-green-600">{shops.filter(s => s.status === 'active').length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Verified</p>
                            <p className="text-2xl font-black text-blue-600">{shops.filter(s => s.verified).length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Total Revenue</p>
                            <p className="text-2xl font-black text-purple-600">KES {shops.reduce((a, s) => a + s.revenue, 0).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Shops Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Shop</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Location</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Products</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Orders</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Revenue</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredShops.map((shop) => (
                                        <tr key={shop.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                                        {shop.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 flex items-center gap-2">
                                                            {shop.name}
                                                            {shop.verified && <span className="text-blue-500" title="Verified">✓</span>}
                                                        </p>
                                                        <p className="text-xs text-slate-400">Created: {shop.created}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{shop.vendor}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{shop.category}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{shop.location}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{shop.products}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{shop.orders}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">KES {shop.revenue.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${shop.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {shop.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                                                        <Eye className="w-4 h-4 text-slate-400" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteShop(shop.id)}
                                                        className="p-2 hover:bg-red-50 rounded-lg" 
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredShops.length === 0 && (
                            <div className="p-12 text-center">
                                <Store className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500">No shops found matching your criteria</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ShopsManagement;
