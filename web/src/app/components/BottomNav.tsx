"use client";

import { useState } from "react";

const navItems = [
  { icon: "🏠", label: "首页", href: "#home" },
  { icon: "🤖", label: "智能体", href: "#agents" },
  { icon: "💬", label: "社区", href: "#community" },
  { icon: "👤", label: "我的", href: "#profile" }
];

export default function BottomNav() {
  const [active, setActive] = useState(0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 lg:hidden">
      <div className="flex justify-around py-2">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={() => setActive(index)}
            className={`flex flex-col items-center py-2 px-4 min-h-[44px] justify-center tap-highlight-transparent transition-colors ${
              active === index ? "text-green-500" : "text-gray-500"
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
