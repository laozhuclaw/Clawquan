"use client";

import { useEffect, useState } from "react";
import AgentCard from "./AgentCard";
import { listAgents, formatUsage, type Agent } from "@/lib/api";

// Fallback shown if the backend is unreachable — keeps the landing page
// presentable even when the API is down, and matches the seed data.
const FALLBACK_AGENTS: Agent[] = [
  {
    id: "fallback-1",
    icon: "🌶️",
    name: "湘商联络官",
    description: "苏州市湖南商会试点智能体，负责会员画像、线索扫描与湘苏资源撮合。",
    category: "试点联络",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 12500,
  },
  {
    id: "fallback-2",
    icon: "⚙️",
    name: "湘江方案官",
    description: "代表湘江智装识别制造业技改、设备更新与联合投标机会。",
    category: "企业代表",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 8300,
  },
  {
    id: "fallback-3",
    icon: "🥢",
    name: "湘味渠道官",
    description: "为湖南特色食品供应链对接园区团餐、商超和企业福利采购。",
    category: "企业代表",
    tags: [],
    is_public: true,
    star_count: 0,
    usage_count: 5700,
  },
];


export default function AgentList() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await listAgents({ limit: 12 });
        if (!cancelled) setAgents(data);
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
      <h2 className="text-3xl lg:text-5xl font-bold text-center text-gray-900 mb-10">
        试点智能体
      </h2>

      {error && (
        <p className="text-center text-sm text-amber-600 mb-6">
          暂时无法连接到服务器（{error}），展示本地示例。
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
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
