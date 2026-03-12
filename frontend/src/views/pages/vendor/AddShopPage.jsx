/**
 * @file views/pages/vendor/AddShopPage.jsx
 * Vendor shop creation/profile setup form.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { LayoutDashboard, Store, Package, BarChart2, Settings, Upload, AlertCircle } from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", to: "/vendor", Icon: LayoutDashboard },
    { label: "My Shops", to: "/vendor/shops", Icon: Store },
    { label: "Products", to: "/vendor/products", Icon: Package },
    { label: "Analytics", to: "/vendor/analytics", Icon: BarChart2 },
    { label: "Settings", to: "/vendor/settings", Icon: Settings },
];

const CATEGORIES = [
    "Handmade Crafts", "Fashion & Clothing", "Food & Beverages", "Electronics",
    "Home & Living", "Beauty & Wellness", "Sports & Outdoors", "Books & Education", "Other"
];

const AddShopPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", description: "", category: "", phone: "", location: "", website: ""
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: POST to /api/vendor/shops
        setSaved(true);
        setTimeout(() => navigate("/vendor"), 1500);
    };

    return (
        <DashboardLayout navItems={NAV_ITEMS} title="My Shops / Create New Shop">
            {/* Alert Banner */}
            <div className="flex items-start gap-3 p-4 mb-6 bg-[#f97316]/10 border border-[#f97316]/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-[#f97316] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                    <strong>Almost there!</strong> Complete your shop profile to start selling to millions of customers on Duka Store.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl">
                {/* Shop Branding */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-slate-800">Shop Branding</h3>
                        <p className="text-slate-400 text-xs mt-0.5">Upload your shop's banner and logo</p>
                    </div>
                    <div className="p-6">
                        {/* Banner Upload */}
                        <div className="relative w-full h-36 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#2f7f33] flex flex-col items-center justify-center bg-[#f6f8f6] cursor-pointer hover:bg-[#2f7f33]/5 transition-all mb-3 group">
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-[#2f7f33] transition-colors" />
                            <p className="text-sm text-slate-400 mt-2 group-hover:text-[#2f7f33]">Click or drag to upload Shop Banner</p>
                            <p className="text-xs text-slate-300 mt-1">Recommended: 1280 × 400px</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                        {/* Logo Upload */}
                        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-300 hover:border-[#2f7f33] flex flex-col items-center justify-center bg-[#f6f8f6] cursor-pointer hover:bg-[#2f7f33]/5 transition-all mx-auto group">
                            <Upload className="w-5 h-5 text-slate-300 group-hover:text-[#2f7f33] transition-colors" />
                            <p className="text-xs text-slate-300 mt-1 text-center">Logo</p>
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer rounded-full" accept="image/*" />
                        </div>
                    </div>
                </div>

                {/* Shop Info */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-slate-800">Shop Information</h3>
                    </div>
                    <div className="p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} required
                                placeholder="e.g. Green Earth Ceramics"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Business Category *</label>
                            <select name="category" value={form.category} onChange={handleChange} required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] bg-white">
                                <option value="">Select a category...</option>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
                            <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                                placeholder="Tell shoppers what makes your store unique..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number (M-Pesa) *</label>
                                <input name="phone" value={form.phone} onChange={handleChange} required
                                    placeholder="0712 345 678"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Location *</label>
                                <input name="location" value={form.location} onChange={handleChange} required
                                    placeholder="Nairobi, CBD"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pb-8">
                    <button type="button" onClick={() => navigate("/vendor")} className="px-6 py-3 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-all">
                        Cancel
                    </button>
                    <button type="submit"
                        className={`px-8 py-3 rounded-lg text-sm font-bold transition-all ${saved ? "bg-green-500 text-white" : "bg-[#2f7f33] text-white hover:bg-[#1e5e21] hover:shadow-lg hover:shadow-[#2f7f33]/30"}`}>
                        {saved ? "✓ Saved! Redirecting..." : "Save Shop Profile"}
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default AddShopPage;
