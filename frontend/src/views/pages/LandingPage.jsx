import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const LandingPage = () => {
    return (
        <div className="bg-[#f6f8f6] dark:bg-[#141e15] text-slate-900 dark:text-slate-100 font-display">
            {/* Shared Navigation Bar */}
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-[#2f7f33] uppercase bg-[#2f7f33]/10 rounded-full">
                                    The Local Community Marketplace
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
                                    Empowering Small Vendors, <span className="text-[#2f7f33]">Connecting</span> Smart Shoppers
                                </h1>
                                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl">
                                    Discover unique products and professional services from local entrepreneurs. The all-in-one marketplace for your community to thrive together.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/login" className="bg-[#2f7f33] text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-[#2f7f33]/30 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                        Start Shopping
                                    </Link>
                                    <Link to="/login?tab=vendor" className="bg-[#f97316] text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg hover:shadow-[#f97316]/30 transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">sell</span>
                                        Become a Seller
                                    </Link>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#3b82f6]/10 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#2f7f33]/10 rounded-full blur-3xl"></div>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
                                    <img alt="Vibrant and authentic African outdoor market scene with local vendors" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF7ZR347yu08-ZZPkEJSjRzWa-TSiOtKEw_B5hhgZlO5c8kDu_TvmnGeByifu_QCs2ikvcq-KEC5GQ4GJ426omvgepnbhJ7JDcb6e6BGvb1QrRjMQ24xckBbct4vaM_3ynmI9xrUoNpcjCs2rF4RxmlQrCkWN8RuI32NtkDAW8X1bbySiqC8BU1TQE7KqOU4WZR52N739IkGGCaOkpnWUG_wGDeJUkRr9VT1aHuIFk0ryFAgWIV4kjY91NcyYOdLDEn3A667RoiOw" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-20 bg-white dark:bg-[#141e15]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                                <p className="text-slate-500">Handpicked treasures from our top-rated local vendors</p>
                            </div>
                            <Link to="/login" className="text-[#2f7f33] font-bold flex items-center gap-1 hover:underline">
                                View all <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Product 1 */}
                            <div className="group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                    <div className="absolute top-4 left-4 z-10 bg-[#f97316] text-white text-xs font-bold px-2 py-1 rounded">HOT</div>
                                    <img alt="Handmade Pottery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Handmade pottery ceramics collection" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGPkAmq2kOuea5w18mkxWbHJFQ3Na6u-1ieYU_Fcs64wAkKH8WeISzrkoSp7u_uLjkHr-uoywdYv_kxm9NrPAt-ICIBR7xA-ulTf7weOuiCJanM0MHA1G_7h12z0U2EQofcZ4JS-epiSpxMV_RO491eMMKKAZ0gTYwW1YcEuSVG-uGJcn4RZKhcj-Vb2i_r2jPYCKjn85hcjrX92LDOrkMcSmgCS8Lb4GFdhvCholZLGt72Ty_2rQThbl1WSi-KrFqYRxJ9ZnGInE" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-[#2f7f33] transition-colors">Handmade Pottery Set</h3>
                                <p className="text-[#2f7f33] font-bold mb-1">$45.00</p>
                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">store</span> Green Earth Ceramics
                                </p>
                            </div>
                            {/* Product 2 */}
                            <div className="group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                    <img alt="Organic Honey" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Jar of organic honey on a table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWeGvjXJfLrTgYMllBPXDnJsyweZhi_4lw_JepczL659AUfrwnHDbjd-FxnIMm3sVh6CZOIgBxit9HQF1gOYn6-ES1w8qf1kH4rItzuixqLRZBnlRc_BzUx3tsUNI2DKSf2lCuuEvxJynDZA7OYAyxNByR8f6EpdIIHf0sjPMN6is-Q_XzbFYgls_E84P0TvI2vPmGkHL3IwPjxZyIxQSZN_NZJI01UFdZi5EL9HqxmdqxtiqCS-RNzZf5lEgKcSw8RGD5yNI4paI" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-[#2f7f33] transition-colors">Wildflower Organic Honey</h3>
                                <p className="text-[#2f7f33] font-bold mb-1">$18.00</p>
                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">store</span> Bee Happy Farm
                                </p>
                            </div>
                            {/* Product 3 */}
                            <div className="group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                    <img alt="Artisan Coffee" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Freshly roasted artisan coffee beans" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCF_4KmVENkylLhOzCHZYd25egOuFJGqrxN7JKpxfpkbu5se7l4UA6Cjsyf8vPgdvyV7WnC1s6QX4iedGrQ8EvjppdGLML8ktmyW-NpITAIGkrfEqShums1LyyZTSDRyBzeBrmOn67_i7pugSMHyxqgZcQ-6CSsy4CKn1cZylZOtJo5wuO5ZmiMt7oi1-KkDswodV-VprcHt8OpquIGWAMrCTAtd5dFjTfz44JrzE8ss8bZLjEfLJufRVD1xZ4R1CBPDfxIyK5rNIU" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-[#2f7f33] transition-colors">Ethiopian Dark Roast</h3>
                                <p className="text-[#2f7f33] font-bold mb-1">$22.50</p>
                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">store</span> Mountain Brew Co.
                                </p>
                            </div>
                            {/* Product 4 */}
                            <div className="group">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-4">
                                    <img alt="Woven Baskets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Hand-woven traditional craft basket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADCY6dQAA33H7sXbWFLpFEZSG_iJj7ejdQ9N7y43-4NZmwmn42XKVDgfC4Tkx9Xrfsb9x6EyBn5EP7p1X57NH_xkA22TYlA-wXpoMJrCb2RHkFEZH8fdMA9pNrfMLlZP3puzv1CyFVf2gdwfW8NUMsq8NIaq6VKuOGW1DeImIx3td1EEFEfbJagKY1tNQ9TP1rpHXfZL4PIOVdHhFG4b-ln0mkeH4ko5UX2nGA99FkLPnSSx81yJ60wp4bDS5gNpe_ssvWvAOTpaI" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-[#2f7f33] transition-colors">Heritage Woven Basket</h3>
                                <p className="text-[#2f7f33] font-bold mb-1">$35.00</p>
                                <p className="text-slate-500 text-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">store</span> Village Crafts
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Services */}
                <section className="py-20 bg-[#f6f8f6] dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Popular Local Services</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto">Expert professionals in your neighborhood ready to help with your projects.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-[#141e15] p-6 rounded-2xl border border-[#2f7f33]/5 hover:border-[#2f7f33]/20 transition-all shadow-sm">
                                <div className="w-12 h-12 bg-[#2f7f33]/10 text-[#2f7f33] rounded-xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">brush</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Custom Illustration</h3>
                                <p className="text-slate-500 mb-6 text-sm">Professional digital and traditional artists for your personal or business branding.</p>
                                <Link to="/login" className="text-[#2f7f33] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Book Service <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="bg-white dark:bg-[#141e15] p-6 rounded-2xl border border-[#2f7f33]/5 hover:border-[#2f7f33]/20 transition-all shadow-sm">
                                <div className="w-12 h-12 bg-[#3b82f6]/10 text-[#3b82f6] rounded-xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">home_repair_service</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Home Repair</h3>
                                <p className="text-slate-500 mb-6 text-sm">Reliable handymen for minor fixes, painting, and general home maintenance.</p>
                                <Link to="/login" className="text-[#3b82f6] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Book Service <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                            <div className="bg-white dark:bg-[#141e15] p-6 rounded-2xl border border-[#2f7f33]/5 hover:border-[#2f7f33]/20 transition-all shadow-sm">
                                <div className="w-12 h-12 bg-[#f97316]/10 text-[#f97316] rounded-xl flex items-center justify-center mb-6">
                                    <span className="material-symbols-outlined text-3xl">content_cut</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">Tailoring & Styling</h3>
                                <p className="text-slate-500 mb-6 text-sm">Local experts in fashion design, alterations, and wardrobe styling.</p>
                                <Link to="/login" className="text-[#f97316] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Book Service <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="py-20 bg-white dark:bg-[#141e15] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <h2 className="text-4xl font-bold mb-8">How <span className="text-[#2f7f33]">Duka Store</span> Works</h2>
                                <div className="space-y-10">
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#2f7f33] text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Discover Unique Finds</h4>
                                            <p className="text-slate-500">Browse through thousands of products and services listed by verified local entrepreneurs in your area.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#2f7f33] text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Connect & Purchase</h4>
                                            <p className="text-slate-500">Chat directly with vendors, customize your orders, and complete secure payments within the platform.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#2f7f33] text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">Support Your Community</h4>
                                            <p className="text-slate-500">Receive your items through local delivery or pickup, knowing you're supporting small business growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-slate-200" data-alt="Person handing over a package in a vibrant African market setting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYWwRAnFvWl52LqfJdIn907V6VdI0oPj22hD2v-T5V-0z6y-lV6H1_hH-v-G-7z-L-P-N-M-L-K-J-I-H-G-F-E-D-C-B-A')", backgroundSize: "cover" }}></div>
                                        <div className="rounded-2xl overflow-hidden shadow-lg h-48 bg-slate-200" data-alt="Friendly local African vendor smiling in front of their stall" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_9-H-G-F-E-D-C-B-A-Z-Y-X-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A')", backgroundSize: "cover" }}></div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="rounded-2xl overflow-hidden shadow-lg h-48 bg-slate-200" data-alt="Hands carefully packing local African artisanal goods" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_9-H-G-F-E-D-C-B-A-Z-Y-X-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A')", backgroundSize: "cover" }}></div>
                                        <div className="rounded-2xl overflow-hidden shadow-lg h-64 bg-slate-200" data-alt="Colorful, modern storefront in an African community area" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_9-H-G-F-E-D-C-B-A-Z-Y-X-W-V-U-T-S-R-Q-P-O-N-M-L-K-J-I-H-G-F-E-D-C-B-A')", backgroundSize: "cover" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join as Vendor CTA Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#2f7f33] rounded-[2.5rem] p-8 lg:p-16 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0,0 L100,0 L100,100 L50,100 Z" fill="white"></path>
                                </svg>
                            </div>
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">Ready to grow your small business?</h2>
                                <p className="text-xl text-[#2f7f33]-20 opacity-90 mb-10 leading-relaxed">
                                    Join thousands of successful vendors on Duka Store. Get your own storefront, manage orders, and reach customers in your neighborhood today.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/login?tab=vendor" className="bg-white text-[#2f7f33] px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-100 transition-all">
                                        Open Your Store Now
                                    </Link>
                                    <Link to="/login" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all text-center">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden lg:block absolute bottom-0 right-16 transform translate-y-12">
                                <span className="material-symbols-outlined text-[15rem] opacity-20 rotate-12">rocket_launch</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Shared Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
