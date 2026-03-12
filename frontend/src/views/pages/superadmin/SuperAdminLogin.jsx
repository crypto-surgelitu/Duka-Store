/**
 * @file views/pages/superadmin/SuperAdminLogin.jsx
 * Dedicated Super Admin login page with hardcoded credentials.
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";
import Logo from "../../components/Logo";

const SUPER_ADMIN_EMAIL = "superadmin@dukastore.com";
const SUPER_ADMIN_PASSWORD = "SuperAdmin@2024!";

const SuperAdminLogin = () => {
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (form.email === SUPER_ADMIN_EMAIL && form.password === SUPER_ADMIN_PASSWORD) {
            const superAdminUser = {
                id: 0,
                name: "Super Admin",
                email: SUPER_ADMIN_EMAIL,
                role: "superadmin"
            };
            localStorage.setItem("duka_user", JSON.stringify(superAdminUser));
            localStorage.setItem("duka_token", "superadmin_secure_token_" + Date.now());
            navigate("/superadmin");
        } else {
            setError("Invalid super admin credentials.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
                style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1e5e8f 40%, #3b82f6 100%)" }}>
                <div className="relative z-10 text-white max-w-sm">
                    <Link to="/">
                        <Logo size={56} textSize="text-2xl" />
                    </Link>
                    <h2 className="text-3xl font-black mt-10 mb-4 leading-snug">
                        Super Admin Portal
                    </h2>
                    <p className="text-blue-100 text-lg leading-relaxed mb-10">
                        Secure access to system controls, analytics, and management.
                    </p>
                    <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-yellow-300 text-sm font-semibold mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            Authorized Personnel Only
                        </div>
                        <p className="text-blue-100 text-xs">
                            This area is restricted to authorized super administrators only. 
                            All access attempts are logged.
                        </p>
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
            </div>

            <div className="flex-1 flex items-center justify-center p-8 bg-[#f6f8f6]">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <Link to="/"><Logo size={40} textSize="text-lg" /></Link>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>

                        <h2 className="text-2xl font-black text-center mb-2">
                            Super Admin
                        </h2>
                        <p className="text-slate-500 text-sm text-center mb-6">
                            Enter your credentials to access the admin panel.
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="superadmin@dukastore.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-60"
                            >
                                {loading ? "Please wait..." : "Access Admin Panel"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">
                            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                                Back to User Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLogin;
