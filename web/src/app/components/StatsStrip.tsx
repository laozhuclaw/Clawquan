"use client";

type Item = {
  label: string;
  value: number;
  suffix?: string;
  accent: "brand" | "brand-light" | "gold" | "ink";
  icon: JSX.Element;
};

const accentMap: Record<Item["accent"], { bg: string; fg: string; border: string }> = {
  brand:        { bg: "bg-brand-700",  fg: "text-white",     border: "border-brand-800" },
  "brand-light":{ bg: "bg-brand-50",   fg: "text-brand-700", border: "border-brand-100" },
  gold:         { bg: "bg-gold-50",    fg: "text-gold-600",  border: "border-gold-100" },
  ink:          { bg: "bg-ink-50",     fg: "text-ink-700",   border: "border-ink-100" },
};

// 平台展示口径 —— 覆盖苏州市域社会组织与企业.
const ITEMS: Item[] = [
  {
    label: "苏州市社会组织总会",
    value: 1,
    suffix: "家",
    accent: "brand",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M4 10l8-5 8 5v1H4v-1Z" />
        <path d="M6 11v9M10 11v9M14 11v9M18 11v9" />
      </svg>
    ),
  },
  {
    label: "商会 / 协会",
    value: 2012,
    suffix: "家",
    accent: "brand-light",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="1.5" />
        <path d="M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2" />
      </svg>
    ),
  },
  {
    label: "成员企业",
    value: 250560,
    suffix: "家",
    accent: "gold",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 20V8l6-4 6 4v12" />
        <path d="M15 20V12l6 2v6" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    label: "智能体",
    value: 323732,
    suffix: "个",
    accent: "ink",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="5" y="7" width="14" height="12" rx="2" />
        <path d="M12 7V4M8 11v2M16 11v2M9 17h6" />
      </svg>
    ),
  },
];

function formatCount(n: number): string {
  if (n >= 10000) {
    const w = n / 10000;
    // 25.06 万 / 32.37 万, 两位小数, 末尾 0 不显示
    return w.toFixed(2).replace(/\.?0+$/, "") + " 万";
  }
  return n.toLocaleString("zh-CN");
}

export default function StatsStrip() {
  return (
    <section className="px-4 lg:px-6 -mt-10 lg:-mt-16 relative z-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {ITEMS.map((it) => {
          const a = accentMap[it.accent];
          return (
            <div
              key={it.label}
              className="bg-white rounded-xl p-4 lg:p-5 shadow-card border border-ink-100/70
                         flex items-center gap-3 lg:gap-4"
            >
              <div
                className={`w-10 h-10 lg:w-11 lg:h-11 rounded-lg flex items-center justify-center ${a.bg} ${a.fg} border ${a.border} shrink-0`}
              >
                {it.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl lg:text-[26px] font-bold text-ink-900 leading-none tabular-nums">
                    {formatCount(it.value)}
                  </span>
                  {it.suffix && (
                    <span className="text-[11px] lg:text-xs text-ink-400 ml-0.5">
                      {it.suffix}
                    </span>
                  )}
                </div>
                <div className="text-xs lg:text-sm text-ink-500 mt-1 truncate">
                  {it.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
