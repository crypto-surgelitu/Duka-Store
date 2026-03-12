/**
 * @file views/layout/Navbar.jsx
 * Main public navigation bar for the landing page.
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Store, Menu, X, Bell } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../../controllers/AuthController";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/">
                        <Logo size={38} textSize="text-lg" />
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {["Shop", "Vendors", "How it Works", "About"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                                className="text-sm font-medium text-slate-600 hover:text-[#2f7f33] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="hidden sm:flex relative items-center">
                            <Search className="absolute left-3 w-4 h-4 text-[#2f7f33] opacity-60" />
                            <input
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-[#f6f8f6] border border-gray-200 focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20 rounded-lg text-sm w-48 lg:w-60 outline-none"
                                placeholder="Search products..."
                            />
                        </div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <button className="relative p-2 rounded-full hover:bg-gray-100">
                                    <Bell className="w-5 h-5 text-slate-600" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#f97316] rounded-full" />
                                </button>
                                <button
                                    onClick={() => navigate(user.role === "vendor" ? "/vendor" : user.role === "admin" ? "/admin" : "/dashboard")}
                                    className="flex items-center gap-2 bg-[#2f7f33] text-white px-3 py-2 rounded-lg text-sm font-semibold"
                                >
                                    Dashboard
                                </button>
                                <button onClick={handleLogout} className="text-sm text-slate-600 hover:text-red-500">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-[#2f7f33]"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/login?tab=vendor"
                                    className="flex items-center gap-2 bg-[#2f7f33] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1e5e21] shadow-sm"
                                >
                                    <Store className="w-4 h-4" />
                                    Join as Vendor
                                </Link>
                            </>
                        )}

                        {/* Mobile menu toggle */}
                        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-100">
                    {["Shop", "Vendors", "How it Works", "About"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 text-sm font-medium text-slate-600 hover:text-[#2f7f33]"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
