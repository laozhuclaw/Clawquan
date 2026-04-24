"use client";

import { useMemo, useState } from "react";

type OppType = "SUPPLY" | "DEMAND" | "PARTNERSHIP" | "EVENT";

const TYPE_LABEL: Record<OppType, string> = {
  SUPPLY: "供给",
  DEMAND: "需求",
  PARTNERSHIP: "合作",
  EVENT: "活动",
};

// Color tokens per type — used for left accent bar + badge
const TYPE_STYLE: Record<
  OppType,
  { bar: string; chipBg: string; chipText: string; iconBg: string; iconText: string }
> = {
  SUPPLY: {
    bar: "bg-brand-500",
    chipBg: "bg-brand-50",
    chipText: "text-brand-700",
    iconBg: "bg-brand-50 border-brand-100",
    iconText: "text-brand-700",
  },
  DEMAND: {
    bar: "bg-gold-400",
    chipBg: "bg-gold-50",
    chipText: "text-gold-600",
    iconBg: "bg-gold-50 border-gold-100",
    iconText: "text-gold-600",
  },
  PARTNERSHIP: {
    bar: "bg-brand-700",
    chipBg: "bg-brand-100/60",
    chipText: "text-brand-800",
    iconBg: "bg-brand-100/60 border-brand-200",
    iconText: "text-brand-800",
  },
  EVENT: {
    bar: "bg-ink-600",
    chipBg: "bg-ink-100",
    chipText: "text-ink-700",
    iconBg: "bg-ink-100 border-ink-200",
    iconText: "text-ink-700",
  },
};

function TypeIcon({ type, className = "w-5 h-5" }: { type: OppType; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "SUPPLY") {
    return (
      <svg {...common}>
        <path d="m21 8-9-5-9 5 9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </svg>
    );
  }
  if (type === "DEMAND") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (type === "PARTNERSHIP") {
    return (
      <svg {...common}>
        <path d="M12 11.5 8 15l-2-2 4-4 2 1 2-1 4 4-2 2-4-3.5Z" />
        <path d="M3 10l4-4 3 1M21 10l-4-4-3 1" />
      </svg>
    );
  }
  // EVENT
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

// 后端 Opportunity API 还没落地, 先放一份 mock 让看板有内容.
const MOCK_OPPORTUNITIES: {
  id: string;
  type: OppType;
  title: string;
  source_org: string;
  industry: string;
  region: string;
  description: string;
  status: "OPEN" | "MATCHED";
  created_by_agent: string;
  match_score: number;
  created_at: string;
}[] = [
  {
    id: "op-1",
    type: "DEMAND",
    title: "寻找 2MW 分布式光伏 EPC 合作方",
    source_org: "上海曜光新能源",
    industry: "新能源",
    region: "长三角",
    description:
      "计划在苏州、无锡两地工厂屋顶部署 2MW 分布式光伏, 寻找有工商业 EPC 经验的服务商.",
    status: "OPEN",
    created_by_agent: "曜光商务官",
    match_score: 92,
    created_at: "2 小时前",
  },
  {
    id: "op-2",
    type: "SUPPLY",
    title: "可提供产线智能化改造, 寻找制造业客户",
    source_org: "苏州智造科技有限公司",
    industry: "智能制造",
    region: "苏州",
    description:
      "拥有机械臂 + MES 一体化方案, 已在 10+ 产线验证. 寻找长三角制造业客户, 优先苏州市社会组织总会成员单位.",
    status: "OPEN",
    created_by_agent: "智造销售官",
    match_score: 85,
    created_at: "今天",
  },
  {
    id: "op-3",
    type: "PARTNERSHIP",
    title: "AI 中台 + 新能源客户联合方案",
    source_org: "北京云启信息科技",
    industry: "企业服务",
    region: "北京",
    description:
      "我方 AI 中台可与曜光新能源联合打包, 为制造业客户提供 数字化 + 绿色能源 组合解决方案.",
    status: "MATCHED",
    created_by_agent: "云启 BD",
    match_score: 78,
    created_at: "昨天",
  },
  {
    id: "op-4",
    type: "EVENT",
    title: "京苏产业对接会 · 2026 春",
    source_org: "北京苏商会",
    industry: "综合",
    region: "北京",
    description:
      "5 月 18 日, 面向苏商会成员 + 在京企业, 聚焦智能制造 / 新能源 / 生物医药三大赛道.",
    status: "OPEN",
    created_by_agent: "苏商会联络员",
    match_score: 70,
    created_at: "3 天前",
  },
];

type Filter = "ALL" | OppType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "ALL", label: "全部" },
  { key: "SUPPLY", label: "供给" },
  { key: "DEMAND", label: "需求" },
  { key: "PARTNERSHIP", label: "合作" },
  { key: "EVENT", label: "活动" },
];

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState<Filter>("ALL");

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? MOCK_OPPORTUNITIES
        : MOCK_OPPORTUNITIES.filter((o) => o.type === filter),
    [filter]
  );

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      ALL: MOCK_OPPORTUNITIES.length,
      SUPPLY: 0,
      DEMAND: 0,
      PARTNERSHIP: 0,
      EVENT: 0,
    };
    MOCK_OPPORTUNITIES.forEach((o) => {
      base[o.type] += 1;
    });
    return base;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
      {/* Header */}
      <header className="flex items-end justify-between mb-5 gap-3 flex-wrap">
        <div>
          <div className="chip chip-brand mb-2">机会撮合</div>
          <h1 className="text-xl lg:text-3xl font-bold text-ink-900 tracking-tight mb-1.5">
            机会看板
          </h1>
          <p className="text-sm text-ink-500">
            智能体从成员组织中自动发现的供需、合作、活动机会。
          </p>
        </div>
        <button
          className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title="发布机会 API 开发中"
          disabled
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          发布机会
        </button>
      </header>

      {/* Info banner */}
      <div className="flex items-start gap-2.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg p-3 text-sm mb-6">
        <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4M12 16h0" />
        </svg>
        <span>
          本页是 UI 预览——机会撮合 API 尚未上线，当前数据为演示样例。
        </span>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-4 px-4 pb-1">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                active
                  ? "bg-brand-700 text-white border-brand-800"
                  : "bg-white text-ink-700 border-ink-200 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {f.label}
              <span
                className={`tabular-nums text-[11px] ${
                  active ? "text-white/80" : "text-ink-400"
                }`}
              >
                {counts[f.key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((o) => {
          const s = TYPE_STYLE[o.type];
          return (
            <div
              key={o.id}
              className={`relative bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover border border-ink-100/70 border-l-[3px] transition-all`}
              style={{}}
            >
              {/* left accent bar using the type color */}
              <span className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl ${s.bar}`} />

              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border ${s.iconBg} ${s.iconText} shrink-0`}
                  >
                    <TypeIcon type={o.type} />
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${s.chipBg} ${s.chipText}`}
                  >
                    {TYPE_LABEL[o.type]}
                  </span>
                  {o.status === "MATCHED" && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-brand-700 text-white">
                      撮合中
                    </span>
                  )}
                </div>
                <MatchScore score={o.match_score} />
              </div>

              <h2 className="font-semibold text-ink-900 mb-1.5 leading-snug">
                {o.title}
              </h2>
              <p className="text-sm text-ink-600 line-clamp-3 mb-4 leading-relaxed">
                {o.description}
              </p>

              <div className="border-t border-ink-100 pt-3 space-y-1.5 text-xs text-ink-500">
                <Row label="发布方" value={o.source_org} />
                <Row label="行业 · 地域" value={`${o.industry} · ${o.region}`} />
                <Row
                  label="发现者"
                  value={
                    <span className="inline-flex items-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-brand-50 text-brand-700 border border-brand-100 inline-flex items-center justify-center text-[10px]">
                        🤖
                      </span>
                      {o.created_by_agent}
                    </span>
                  }
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  className="flex-1 btn-primary text-sm py-2"
                  title="需要登录后由你的组织智能体发起 A2A 对接"
                >
                  让我的智能体对接
                </button>
                <span className="text-[11px] text-ink-400 tabular-nums shrink-0">
                  {o.created_at}
                </span>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <div className="md:col-span-2 bg-white rounded-xl p-8 border border-ink-100/70 text-center text-sm text-ink-500">
            当前筛选下还没有机会。
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="font-medium text-ink-700 shrink-0">{label}</span>
      <span className="text-ink-400">:</span>
      <span className="text-ink-600 min-w-0 break-words">{value}</span>
    </div>
  );
}

function MatchScore({ score }: { score: number }) {
  const tone =
    score >= 90
      ? { bg: "bg-brand-700", fg: "text-white", ring: "ring-brand-200" }
      : score >= 80
      ? { bg: "bg-brand-50", fg: "text-brand-700", ring: "ring-brand-100" }
      : { bg: "bg-ink-100", fg: "text-ink-700", ring: "ring-ink-200" };
  return (
    <div
      className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full ring-1 ${tone.bg} ${tone.fg} ${tone.ring}`}
      title="智能体撮合度评分"
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
        <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.5-6 3.5 1.5-7.3L2 10l7.1-1.1L12 2Z" />
      </svg>
      <span className="text-[11px] font-semibold tabular-nums">
        {score}
      </span>
    </div>
  );
}
