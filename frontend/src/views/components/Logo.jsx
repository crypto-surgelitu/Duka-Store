/**
 * @file views/components/Logo.jsx
 * The Duka Store African-inspired SVG logo used across all pages.
 */
const Logo = ({ size = 40, textSize = "text-xl", showText = true }) => {
    return (
        <div className="flex items-center gap-2 group cursor-pointer">
            {/* Baobab Exchange SVG Emblem */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
            >
                {/* Background soft glow */}
                <circle cx="50" cy="50" r="45" fill="#2f7f33" opacity="0.05" />

                {/* Baobab Trunk - Stability & Roots */}
                <path
                    d="M42 85C42 85 38 75 38 65C38 55 42 45 42 45L58 45C58 45 62 55 62 65C62 75 58 85 58 85H42Z"
                    fill="#2f7f33"
                />
                <path
                    d="M35 88C40 86 42 85 42 85H58C58 85 60 86 65 88C60 90 40 90 35 88Z"
                    fill="#246127"
                />

                {/* Branches spreading community commerce */}
                <path d="M42 48C30 42 25 30 25 30" stroke="#2f7f33" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 45C50 35 50 20 50 20" stroke="#2f7f33" strokeWidth="4" strokeLinecap="round" />
                <path d="M58 48C70 42 75 30 75 30" stroke="#2f7f33" strokeWidth="4" strokeLinecap="round" />

                {/* Packages/Nodes as leaves - Digital Marketplace */}
                {/* Left Package (Blue) */}
                <rect x="20" y="24" width="12" height="10" rx="2" fill="#3b82f6" />
                <path d="M26 24V34M20 29H32" stroke="white" strokeWidth="1" opacity="0.5" />

                {/* Top Package (Orange) */}
                <rect x="44" y="12" width="12" height="10" rx="2" fill="#f97316" />
                <path d="M50 12V22M44 17H56" stroke="white" strokeWidth="1" opacity="0.5" />

                {/* Right Package (Green) */}
                <rect x="68" y="24" width="12" height="10" rx="2" fill="#2f7f33" />
                <path d="M74 24V34M68 29H80" stroke="white" strokeWidth="1" opacity="0.5" />

                {/* Connecting community vibes */}
                <circle cx="26" cy="29" r="2" fill="white" opacity="0.8" />
                <circle cx="50" cy="17" r="2" fill="white" opacity="0.8" />
                <circle cx="74" cy="29" r="2" fill="white" opacity="0.8" />
            </svg>

            {showText && (
                <span className={`font-black tracking-tight text-[#2f7f33] ${textSize} select-none`}>
                    Duka<span className="text-[#f97316]">Store</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
