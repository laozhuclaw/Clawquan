"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listAgents, type Agent, formatUsage } from "@/lib/api";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const data = await listAgents({
          search: search || undefined,
          limit: 100,
        });
        if (!cancelled) setAgents(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [search]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.category && set.add(a.category));
    return ["ALL", ...Array.from(set)];
  }, [agents]);

  const visible = useMemo(
    () =>
      category === "ALL"
        ? agents
        : agents.filter((a) => a.category === category),
    [agents, category]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
      <header className="mb-6">
        <div className="chip chip-brand mb-2">智能体市场</div>
        <h1 className="text-xl lg:text-3xl font-bold text-ink-900 tracking-tight mb-1.5">
          智能体
        </h1>
        <p className="text-ink-500 text-sm">
          浏览平台上的智能体——包括组织代表和通用助手，点开即可试用或关注。
        </p>
      </header>

      {/* Search */}
      <div className="relative mb-4">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          placeholder="搜索智能体名称或描述…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-4 px-4 pb-1">
        {categories.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                active
                  ? "bg-brand-700 text-white border-brand-800"
                  : "bg-white text-ink-700 border-ink-200 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {c === "ALL" ? "全部" : c}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          加载失败：{error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-44" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-ink-100/70 text-center text-sm text-ink-500">
          没有匹配的智能体。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((a) => (
            <Link
              key={a.id}
              href={`/agent?id=${a.id}`}
              className="group bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover border border-ink-100/70 transition-all flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-11 h-11 rounded-lg bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center text-xl">
                  {a.icon || "🤖"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900 truncate group-hover:text-brand-700 transition-colors">
                    {a.name}
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5 truncate">
                    {a.category}
                  </div>
                </div>
              </div>
              <p className="text-sm text-ink-600 line-clamp-3 mb-3 leading-relaxed flex-1">
                {a.description}
              </p>
              <div className="flex justify-between items-center text-xs text-ink-400 tabular-nums pt-3 border-t border-ink-100">
                <span className="inline-flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.5-6 3.5 1.5-7.3L2 10l7.1-1.1L12 2Z" />
                  </svg>
                  {a.star_count}
                </span>
                <span>{formatUsage(a.usage_count)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
