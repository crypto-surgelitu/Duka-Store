/**
 * @file views/pages/AuthPage.jsx
 * Combined Login and Sign-Up page with role selection.
 */
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Eye, EyeOff, User, Store, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../../controllers/AuthController";

const ROLES = [
    { id: "customer", label: "Customer", icon: User, desc: "Shop from local vendors" },
    { id: "vendor", label: "Vendor", icon: Store, desc: "Sell your products" },
];

const AuthPage = () => {
    const [params] = useSearchParams();
    const [tab, setTab] = useState(params.get("tab") === "vendor" ? "signup" : "signin");
    const [role, setRole] = useState(params.get("tab") === "vendor" ? "vendor" : "customer");
    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
    const [error, setError] = useState("");
    const { login, register, loading } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (tab === "signin") {
            const result = await login(form.email, form.password, role);
            if (result.success) {
                const dest = role === "vendor" ? "/vendor" : "/dashboard";
                navigate(dest);
            } else {
                setError(result.error || "Invalid credentials. Please try again.");
            }
        } else {
            const result = await register(form.name, form.email, form.password, form.phone, role);
            if (result.success) {
                const loginResult = await login(form.email, form.password, role);
                if (loginResult.success) {
                    const dest = role === "vendor" ? "/vendor" : "/dashboard";
                    navigate(dest);
                } else {
                    setTab("signin");
                }
            } else {
                setError(result.error || "Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Branding Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
                style={{ background: "linear-gradient(135deg, #1e5e21 0%, #2f7f33 40%, #3b82f6 100%)" }}>
                <div className="relative z-10 text-white max-w-sm">
                    <Link to="/">
                        <Logo size={56} textSize="text-2xl" />
                    </Link>
                    <h2 className="text-3xl font-black mt-10 mb-4 leading-snug">
                        Empowering modern e-commerce for everyone.
                    </h2>
                    <p className="text-green-100 text-lg leading-relaxed mb-10">
                        Join thousands of African vendors and shoppers building a thriving community marketplace.
                    </p>
                    {/* Feature highlights */}
                    {["M-Pesa payments built in", "Real-time SMS notifications", "Vendor analytics dashboard"].map((f) => (
                        <div key={f} className="flex items-center gap-3 mb-3">
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <ArrowRight className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-green-100 text-sm">{f}</span>
                        </div>
                    ))}
                </div>

                {/* Background decorative circles */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/5 rounded-full" />
            </div>

            {/* Right Form Panel */}
            <div className="flex-1 flex items-center justify-center p-8 bg-[#f6f8f6]">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-8">
                        <Link to="/"><Logo size={40} textSize="text-lg" /></Link>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        {/* Tab switch */}
                        <div className="flex bg-[#f6f8f6] rounded-lg p-1 mb-8">
                            {["signin", "signup"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`flex-1 py-2.5 rounded-md text-sm font-semibold transition-all ${tab === t ? "bg-white shadow-sm text-[#2f7f33]" : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    {t === "signin" ? "Sign In" : "Create Account"}
                                </button>
                            ))}
                        </div>

                        <h2 className="text-2xl font-black mb-2">
                            {tab === "signin" ? "Welcome back!" : "Join Duka Store"}
                        </h2>
                        <p className="text-slate-500 text-sm mb-6">
                            {tab === "signin" ? "Sign in to your account to continue." : "Create your account in seconds."}
                        </p>

                        {/* Role selection */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            {ROLES.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setRole(id)}
                                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${role === id
                                        ? "border-[#2f7f33] bg-[#2f7f33]/5 text-[#2f7f33]"
                                        : "border-gray-200 text-slate-500 hover:border-gray-300"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {tab === "signup" && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="Alex Mwangi"
                                            value={form.name}
                                            onChange={handleChange}
                                            required={tab === "signup"}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="254700000000"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="alex@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2f7f33] focus:ring-2 focus:ring-[#2f7f33]/20"
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

                            {tab === "signin" && (
                                <div className="text-right">
                                    <button type="button" onClick={() => alert("Password reset instructions sent to your email!")} className="text-sm text-[#3b82f6] hover:underline">Forgot Password?</button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-[#2f7f33] text-white rounded-lg font-bold text-sm hover:bg-[#1e5e21] transition-all hover:shadow-lg hover:shadow-[#2f7f33]/30 disabled:opacity-60"
                            >
                                {loading ? "Please wait..." : tab === "signin" ? "Sign In to Dashboard" : "Create My Account"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">
                            {tab === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
                                className="text-[#2f7f33] font-semibold hover:underline"
                            >
                                {tab === "signin" ? "Create one" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
