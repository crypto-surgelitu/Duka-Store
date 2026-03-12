/**
 * @file views/layout/DashboardLayout.jsx
 * Shared layout wrapper for all dashboard pages (user, vendor, admin).
 */
import { Bell, Search } from "lucide-react";
import Sidebar from "./Sidebar";
import Logo from "../components/Logo";

const DashboardLayout = ({ navItems, children, title }) => {
    return (
        <div className="min-h-screen flex bg-[#f6f8f6]">
            <Sidebar navItems={navItems} />

            {/* Main content area */}
            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                {/* Top header */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 h-16 flex items-center justify-between px-6 shadow-sm">
                    <h1 className="text-lg font-bold text-slate-800">{title}</h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-[#f6f8f6] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] w-48"
                            />
                        </div>
                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f97316] rounded-full" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#2f7f33] flex items-center justify-center text-white text-sm font-bold cursor-pointer">
                            A
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
