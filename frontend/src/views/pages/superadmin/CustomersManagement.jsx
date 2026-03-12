/**
 * @file views/pages/superadmin/CustomersManagement.jsx
 * Manage all customers on the platform - suspend/activate.
 */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard, Store, Users, BarChart2, FileText,
    Activity, Settings, Shield, Search, Ban, CheckCircle,
    AlertTriangle, Mail, Phone, ShoppingBag
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

const MOCK_CUSTOMERS = [
    { id: 1, name: "Alice Johnson", email: "alice@gmail.com", phone: "+254711111111", location: "Nairobi", status: "active", totalSpent: 45600, orders: 12, joined: "2024-01-10" },
    { id: 2, name: "Bob Smith", email: "bob@yahoo.com", phone: "+254722222222", location: "Mombasa", status: "active", totalSpent: 23400, orders: 8, joined: "2024-02-15" },
    { id: 3, name: "Carol Williams", email: "carol@outlook.com", phone: "+254733333333", location: "Nakuru", status: "active", totalSpent: 89000, orders: 23, joined: "2024-03-05" },
    { id: 4, name: "David Brown", email: "david@gmail.com", phone: "+254744444444", location: "Kisumu", status: "active", totalSpent: 12300, orders: 4, joined: "2024-04-20" },
    { id: 5, name: "Emma Davis", email: "emma@yahoo.com", phone: "+254755555555", location: "Eldoret", status: "suspended", totalSpent: 6700, orders: 2, joined: "2024-05-12", suspensionReason: "Suspected fraud - chargebacks" },
    { id: 6, name: "Frank Miller", email: "frank@gmail.com", phone: "+254766666666", location: "Nairobi", status: "active", totalSpent: 156000, orders: 45, joined: "2024-06-01" },
    { id: 7, name: "Grace Wilson", email: "grace@outlook.com", phone: "+254777777777", location: "Mombasa", status: "active", totalSpent: 34500, orders: 15, joined: "2024-06-15" },
    { id: 8, name: "Henry Moore", email: "henry@yahoo.com", phone: "+254788888888", location: "Naivasha", status: "active", totalSpent: 8900, orders: 3, joined: "2024-07-02" },
    { id: 9, name: "Ivy Taylor", email: "ivy@gmail.com", phone: "+254799999999", location: "Nairobi", status: "active", totalSpent: 78000, orders: 21, joined: "2024-07-10" },
    { id: 10, name: "Jack Anderson", email: "jack@outlook.com", phone: "+254700000000", location: "Kisumu", status: "suspended", totalSpent: 4500, orders: 1, joined: "2024-07-15", suspensionReason: "Violation of terms - fake reviews" },
];

const CustomersManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [suspendReason, setSuspendReason] = useState("");

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleSuspendClick = (customer) => {
        setSelectedCustomer(customer);
        setShowSuspendModal(true);
    };

    const handleSuspend = () => {
        if (selectedCustomer) {
            setCustomers(customers.map(c => 
                c.id === selectedCustomer.id 
                    ? { ...c, status: "suspended", suspensionReason: suspendReason }
                    : c
            ));
            setShowSuspendModal(false);
            setSelectedCustomer(null);
            setSuspendReason("");
            alert(`Customer ${selectedCustomer.name} has been suspended.`);
        }
    };

    const handleActivate = (customer) => {
        if (window.confirm(`Are you sure you want to activate ${customer.name}?`)) {
            setCustomers(customers.map(c => 
                c.id === customer.id 
                    ? { ...c, status: "active", suspensionReason: null }
                    : c
            ));
            alert(`Customer ${customer.name} has been activated.`);
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
                        <h1 className="text-lg font-bold text-slate-800">Customers Management</h1>
                        <p className="text-xs text-slate-400">View and manage customer accounts</p>
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
                                    placeholder="Search customers by name or email..."
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
                            <p className="text-slate-500 text-xs font-medium">Total Customers</p>
                            <p className="text-2xl font-black text-slate-800">{customers.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Active</p>
                            <p className="text-2xl font-black text-green-600">{customers.filter(c => c.status === 'active').length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Suspended</p>
                            <p className="text-2xl font-black text-red-600">{customers.filter(c => c.status === 'suspended').length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                            <p className="text-slate-500 text-xs font-medium">Total Revenue</p>
                            <p className="text-2xl font-black text-purple-600">KES {customers.reduce((a, c) => a + c.totalSpent, 0).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Customers Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Location</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Total Spent</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Orders</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Joined</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{customer.name}</p>
                                                        <p className="text-xs text-slate-400">{customer.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{customer.phone}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{customer.location}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">KES {customer.totalSpent.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{customer.orders}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{customer.joined}</td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {customer.status === 'active' ? (
                                                        <button 
                                                            onClick={() => handleSuspendClick(customer)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100"
                                                        >
                                                            <Ban className="w-3 h-3" /> Suspend
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleActivate(customer)}
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
                                <h3 className="font-bold text-slate-800">Suspend Customer</h3>
                                <p className="text-sm text-slate-500">This action will block customer access</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-slate-600 mb-2">Customer: <span className="font-semibold">{selectedCustomer?.name}</span></p>
                            <p className="text-sm text-slate-600 mb-4">Email: <span className="font-semibold">{selectedCustomer?.email}</span></p>
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
                                Suspend Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersManagement;
