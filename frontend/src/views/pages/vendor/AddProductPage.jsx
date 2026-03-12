/**
 * @file views/pages/vendor/AddProductPage.jsx
 * Vendor - Add or edit a product listing.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import { LayoutDashboard, Store, Package, BarChart2, Settings, Upload, X, AlertCircle } from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", to: "/vendor", Icon: LayoutDashboard },
    { label: "My Shops", to: "/vendor/shops", Icon: Store },
    { label: "Products", to: "/vendor/products", Icon: Package },
    { label: "Analytics", to: "/vendor/analytics", Icon: BarChart2 },
    { label: "Settings", to: "/vendor/settings", Icon: Settings },
];

const CATEGORIES = ["Handmade Crafts", "Fashion & Clothing", "Food & Beverages", "Electronics", "Home & Living", "Other"];

const AddProductPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", description: "", price: "", discount: "", sku: "", stock: "", category: "" });
    const [lowStock, setLowStock] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handlePublish = (e) => {
        e.preventDefault();
        // TODO: POST to /api/vendor/products
        setSubmitted(true);
        setTimeout(() => navigate("/vendor/products"), 1500);
    };

    return (
        <DashboardLayout navItems={NAV_ITEMS} title="Products / Add New Product">
            <form onSubmit={handlePublish}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Left Column: Media + Content */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Image Upload */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-slate-800 mb-4">Product Media</h3>
                            <div className="relative w-full h-48 rounded-xl border-2 border-dashed border-[#3b82f6]/40 hover:border-[#3b82f6] flex flex-col items-center justify-center bg-blue-50/30 cursor-pointer hover:bg-blue-50/60 transition-all group">
                                <Upload className="w-10 h-10 text-[#3b82f6]/40 group-hover:text-[#3b82f6] transition-colors" />
                                <p className="text-sm font-medium text-slate-500 mt-2 group-hover:text-[#3b82f6]">Drag & drop product images here</p>
                                <p className="text-xs text-slate-300 mt-1">PNG, JPG, WEBP up to 10MB each</p>
                                <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                            <h3 className="font-bold text-slate-800">Product Details</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Product Title *</label>
                                <input name="title" value={form.title} onChange={handleChange} required
                                    placeholder="e.g. Handmade Kikuyu Pottery Set"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description *</label>
                                <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
                                    placeholder="Describe your product: materials, dimensions, how it's made, care instructions..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 resize-none" />
                                <p className="text-xs text-slate-400 mt-1">{form.description.length}/1000 characters</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Settings Cards */}
                    <div className="space-y-5">
                        {/* Pricing */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-slate-800 mb-4">Pricing</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Price (KES) *</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">KES</span>
                                        <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="5,400"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Discount (%)</label>
                                    <input name="discount" value={form.discount} onChange={handleChange} type="number" placeholder="10"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                                </div>
                            </div>
                        </div>

                        {/* Inventory */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-slate-800 mb-4">Inventory</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">SKU</label>
                                    <input name="sku" value={form.sku} onChange={handleChange} placeholder="GEC-POT-001"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Stock Available *</label>
                                    <input name="stock" value={form.stock} onChange={handleChange} required type="number" placeholder="50"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20" />
                                </div>
                                {/* Low stock toggle */}
                                <div className="flex items-center justify-between pt-1 p-3 bg-[#f97316]/5 rounded-lg border border-[#f97316]/20">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-[#f97316]" />
                                        <span className="text-sm font-medium text-slate-700">Low Stock Alert</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setLowStock(!lowStock)}
                                        className={`w-10 h-5 rounded-full transition-all relative ${lowStock ? "bg-[#f97316]" : "bg-gray-200"}`}
                                    >
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${lowStock ? "left-5" : "left-0.5"}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <h3 className="font-bold text-slate-800 mb-4">Category</h3>
                            <select name="category" value={form.category} onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] bg-white">
                                <option value="">Select a category...</option>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                    <button type="button" onClick={() => navigate("/vendor/products")}
                        className="px-5 py-2.5 text-slate-500 hover:text-slate-700 text-sm font-medium">
                        ← Back to Products
                    </button>
                    <div className="flex gap-3">
                        <button type="button" className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-gray-50">
                            Save as Draft
                        </button>
                        <button type="submit"
                            className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${submitted ? "bg-green-500 text-white" : "bg-[#2f7f33] text-white hover:bg-[#1e5e21] hover:shadow-lg hover:shadow-[#2f7f33]/30"}`}>
                            {submitted ? "✓ Product Published!" : "Publish Product"}
                        </button>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default AddProductPage;
