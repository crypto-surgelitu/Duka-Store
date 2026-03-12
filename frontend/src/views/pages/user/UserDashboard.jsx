/**
 * @file views/pages/user/UserDashboard.jsx
 * Main dashboard view for customer users.
 */
import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import {
    LayoutDashboard, ShoppingBag, Bookmark, BarChart2, Settings,
    ArrowUp, ArrowDown, Package, TrendingUp, Heart
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", Icon: LayoutDashboard },
    { label: "My Orders", to: "/dashboard/orders", Icon: ShoppingBag },
    { label: "Saved Shops", to: "/dashboard/saved", Icon: Bookmark },
    { label: "Analytics", to: "/dashboard/analytics", Icon: BarChart2 },
    { label: "Settings", to: "/dashboard/settings", Icon: Settings },
];

const STATS = [
    { label: "Monthly Spending", value: "KES 12,400", change: "+12%", up: true, color: "#2f7f33" },
    { label: "Active Orders", value: "3", change: "2 shipping", up: true, color: "#f97316" },
    { label: "Saved Shops", value: "14", change: "+2 this week", up: true, color: "#3b82f6" },
];

const RECENT_ORDERS = [
    { id: "#DS-1104", product: "Handmade Pottery Set", shop: "Green Earth Ceramics", status: "Delivered", amount: "KES 5,400", emoji: "🏺" },
    { id: "#DS-1098", product: "Wildflower Honey", shop: "Bee Happy Farm", status: "Shipped", amount: "KES 2,160", emoji: "🍯" },
    { id: "#DS-1091", product: "Ethiopian Dark Roast", shop: "Mountain Brew Co.", status: "Processing", amount: "KES 2,700", emoji: "☕" },
    { id: "#DS-1087", product: "Heritage Woven Basket", shop: "Village Crafts", status: "Delivered", amount: "KES 4,200", emoji: "🧺" },
];

const STATUS_STYLES = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-orange-100 text-orange-700",
    Cancelled: "bg-red-100 text-red-600",
};

const RECOMMENDED_SHOPS = [
    { name: "Green Earth Ceramics", category: "Handmade Crafts", followers: "2.4k", emoji: "🏺" },
    { name: "Bee Happy Farm", category: "Organic Foods", followers: "1.8k", emoji: "🍯" },
    { name: "Mountain Brew Co.", category: "Coffee & Beverages", followers: "3.1k", emoji: "☕" },
    { name: "Village Crafts", category: "Traditional Art", followers: "987", emoji: "🧺" },
];

const UserDashboard = () => {
    const [followedShops, setFollowedShops] = useState([]);

    const toggleFollow = (name) => {
        setFollowedShops((prev) =>
            prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
        );
    };

    return (
        <DashboardLayout navItems={NAV_ITEMS} title="My Dashboard">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#2f7f33] to-[#3b82f6] rounded-2xl p-6 text-white mb-6 flex items-center justify-between">
                <div>
                    <p className="text-green-100 text-sm mb-1">Good morning,</p>
                    <h2 className="text-2xl font-black">Welcome to Duka Store, Alex! 👋</h2>
                    <p className="text-green-100 text-sm mt-1">You have 3 active orders and 2 unread notifications.</p>
                </div>
                <button className="bg-white text-[#2f7f33] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-green-50 transition-all whitespace-nowrap">
                    Browse New Arrivals →
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {STATS.map(({ label, value, change, up, color }) => (
                    <div key={label} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-slate-500 text-sm mb-2">{label}</p>
                        <p className="text-2xl font-black" style={{ color }}>{value}</p>
                        <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${up ? "text-green-600" : "text-red-500"}`}>
                            {up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />} {change}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Content: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Purchases */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Package className="w-5 h-5 text-[#f97316]" /> Recent Purchases
                        </h3>
                        <button className="text-[#2f7f33] text-sm font-semibold hover:underline">View all →</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {RECENT_ORDERS.map((order) => (
                            <div key={order.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#f6f8f6] transition-colors">
                                <div className="w-12 h-12 bg-[#f6f8f6] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                                    {order.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-800 text-sm truncate">{order.product}</p>
                                    <p className="text-slate-400 text-xs">{order.shop} · {order.id}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status]}`}>
                                    {order.status}
                                </span>
                                <p className="text-sm font-bold text-slate-700 whitespace-nowrap">{order.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Shops */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-[#f97316]" /> Recommended Shops
                        </h3>
                    </div>
                    <div className="p-4 space-y-3">
                        {RECOMMENDED_SHOPS.map((shop) => (
                            <div key={shop.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f6f8f6] transition-colors">
                                <div className="w-10 h-10 bg-[#f6f8f6] rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                                    {shop.emoji}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-slate-800 truncate">{shop.name}</p>
                                    <p className="text-xs text-slate-400">{shop.category} · {shop.followers} followers</p>
                                </div>
                                <button
                                    onClick={() => toggleFollow(shop.name)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${followedShops.includes(shop.name)
                                            ? "bg-[#2f7f33] text-white"
                                            : "border border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50"
                                        }`}
                                >
                                    {followedShops.includes(shop.name) ? "✓ Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserDashboard;
