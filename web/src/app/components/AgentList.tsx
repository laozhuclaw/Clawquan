"use client";

import { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import { listAgents, formatUsage, type Agent } from "@/lib/api";

// Fallback shown if the backend is unreachable — keeps the landing page
// presentable even when the API is down, and matches the seed data.
const FOCUS_AGENT_ORDER = [
  "总会调度官",
  "湘商联络官",
  "通商联络官",
  "京商联络官",
  "国防教育联络官",
];

const FALLBACK_AGENTS: Agent[] = [
  {
    id: "fallback-1",
    icon: "🏛️",
    name: "总会调度官",
    description: "统筹苏州市社会组织总会层面的三层协作、跨商会协作与横向交流编排。",
    category: "总会协调",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 12500,
  },
  {
    id: "fallback-2",
    icon: "🌶️",
    name: "湘商联络官",
    description: "维护苏州市湖南商会会员企业画像，识别装备检测、数字农业、工程服务等横向协作机会。",
    category: "商会联络",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 8300,
  },
  {
    id: "fallback-3",
    icon: "🌉",
    name: "通商联络官",
    description: "维护南通商会会长、副会长单位画像，推动工程链、物流链与兄弟商协会横向交流。",
    category: "商会联络",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 7900,
  },
  {
    id: "fallback-4",
    icon: "🐲",
    name: "京商联络官",
    description: "连接苏州市北京商会科技、工程、文化与金融服务资源，导入京苏协作场景。",
    category: "商会联络",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 7200,
  },
  {
    id: "fallback-5",
    icon: "🛡️",
    name: "国防教育联络官",
    description: "连接理事单位、实践基地与商会会员企业，编排企业国防教育和基地共建活动。",
    category: "协会联络",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 5700,
  },
];

function pickFocusAgents(data: Agent[]): Agent[] {
  const rank = new Map(FOCUS_AGENT_ORDER.map((name, index) => [name, index]));
  const focus = data
    .filter((agent) => rank.has(agent.name))
    .sort((a, b) => rank.get(a.name)! - rank.get(b.name)!);

  const missing = FALLBACK_AGENTS.filter(
    (fallback) => !focus.some((agent) => agent.name === fallback.name)
  );
  return [...focus, ...missing].slice(0, 5);
}

export default function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await listAgents({ limit: 100 });
        if (!cancelled) setAgents(pickFocusAgents(data));
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "加载失败");
          setAgents(FALLBACK_AGENTS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-4 lg:px-8 py-16 lg:py-24" id="agents">
      <header className="text-center mb-10">
        <div className="chip chip-brand mb-3">智能体协作</div>
        <h2 className="text-3xl lg:text-5xl font-bold text-ink-900 tracking-tight">
          总会、商会/协会与企业智能体
        </h2>
        <p className="text-base lg:text-xl text-ink-500 mt-3 max-w-3xl mx-auto">
          客户演示时优先展示五个代表智能体：总会调度、湖南商会、南通商会、北京商会与全民国防教育协会，体现纵向连接和横向撮合。
        </p>
      </header>

      {error && (
        <p className="text-center text-sm text-amber-600 mb-6">
          暂时无法连接到服务器（{error}），展示本地示例。
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : agents.map((agent) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                icon={agent.icon || "🤖"}
                name={agent.name}
                description={agent.description}
                category={agent.category}
                star_count={agent.star_count}
                usage_count={agent.usage_count}
              />
            ))}
      </div>
    </section>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-200 mb-4" />
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-3 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-4/5 mb-6" />
      <div className="h-10 bg-gray-100 rounded" />
    </div>
  );
}
