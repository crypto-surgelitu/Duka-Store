/**
 * @file views/layout/Sidebar.jsx
 * Collapsible sidebar for dashboard views (vendor, user, admin).
 */
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

const Sidebar = ({ navItems }) => {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-gray-100">
                <Logo size={34} textSize="text-base" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map(({ label, to, Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-[#2f7f33]/10 text-[#2f7f33] font-semibold"
                                : "text-slate-600 hover:bg-gray-50 hover:text-[#2f7f33]"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#2f7f33]" : "text-slate-400"
                                        }`}
                                />
                                {label}
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2f7f33]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer - user */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#2f7f33] flex items-center justify-center text-white text-sm font-bold">
                        A
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">Alex Mwangi</p>
                        <p className="text-xs text-slate-400 truncate">alex@dukastore.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
