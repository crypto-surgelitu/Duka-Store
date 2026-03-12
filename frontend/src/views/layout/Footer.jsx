/**
 * @file views/layout/Footer.jsx
 * Main site footer for all public-facing pages.
 */
import { Link } from "react-router-dom";
import { Globe, Share2, Mail } from "lucide-react";
import Logo from "../components/Logo";

const Footer = () => {
    const links = {
        Marketplace: ["Featured Products", "All Vendors", "Popular Services", "Gift Cards"],
        "For Vendors": ["Sell on Duka", "Seller Handbook", "Vendor Dashboard", "Marketing Tools"],
        Support: ["Help Center", "Safety & Trust", "Contact Us", "Privacy Policy"],
    };

    return (
        <footer className="bg-slate-900 text-slate-400 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2">
                        <div className="mb-6">
                            <Logo size={36} textSize="text-lg" showText={true} />
                        </div>
                        <p className="mb-8 max-w-xs leading-relaxed text-sm">
                            The neighborhood marketplace dedicated to helping local small vendors reach their
                            full potential and connecting them with smart shoppers across Africa.
                        </p>
                        <div className="flex gap-3">
                            {[Globe, Share2, Mail].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="/"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#2f7f33] transition-colors"
                                >
                                    <Icon className="w-4 h-4 text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([heading, items]) => (
                        <div key={heading}>
                            <h5 className="text-white font-bold mb-6 text-sm">{heading}</h5>
                            <ul className="space-y-3 text-sm">
                                {items.map((item) => (
                                    <li key={item}>
                                        <Link to="/" className="hover:text-[#2f7f33] transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {new Date().getFullYear()} Duka Store Marketplace. All rights reserved.</p>
                    <div className="flex gap-6">
                        {["Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
                            <Link key={item} to="/" className="hover:text-white transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
