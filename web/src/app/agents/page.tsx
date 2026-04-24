"use client";

import { useEffect, useMemo, useState } from "react";
import AgentCard from "@/app/components/AgentCard";
import { listAgents, type Agent } from "@/lib/api";

type SortOption = "latest" | "popular" | "rating";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [sort, setSort] = useState<SortOption>("latest");

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

  const visible = useMemo(() => {
    let filtered =
      category === "ALL"
        ? agents
        : agents.filter((a) => a.category === category);

    // Apply sorting
    const sorted = [...filtered];
    if (sort === "popular") {
      sorted.sort((a, b) => b.usage_count - a.usage_count);
    } else if (sort === "rating") {
      sorted.sort((a, b) => b.star_count - a.star_count);
    }
    // "latest" keeps original order

    return sorted;
  }, [agents, category, sort]);

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

      {/* Search & Sort controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
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

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors font-medium text-sm"
        >
          <option value="latest">最新</option>
          <option value="popular">最热门</option>
          <option value="rating">评分最高</option>
        </select>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-64" />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-ink-100/70 text-center">
          <p className="text-ink-500 mb-2">没有匹配的智能体</p>
          <p className="text-sm text-ink-400">
            试试更换搜索词或分类筛选条件
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-500 mb-4">
            找到 {visible.length} 个智能体
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((agent) => (
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
        </>
      )}
    </div>
  );
}
