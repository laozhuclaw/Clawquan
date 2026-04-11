"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 gradient-primary shadow-lg">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <span className="text-2xl">🦀</span>
          <span>ClawQuan</span>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl p-2 min-h-[44px] min-w-[44px] flex items-center justify-center tap-highlight-transparent"
          aria-label="菜单"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } bg-white shadow-lg absolute top-full left-0 right-0`}
      >
        <ul className="flex flex-col">
          {["首页", "智能体", "社区", "关于"].map((item, index) => (
            <li key={index}>
              <a
                href={`#${["home", "agents", "community", "about"][index]}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-800 font-medium border-b border-gray-100 min-h-[44px] flex items-center hover:bg-gray-50 transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-8 px-4 pb-3 justify-center">
        {["首页", "智能体", "社区", "关于"].map((item, index) => (
          <li key={index}>
            <a
              href={`#${["home", "agents", "community", "about"][index]}`}
              className="text-white font-medium hover:opacity-80 transition-opacity"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
