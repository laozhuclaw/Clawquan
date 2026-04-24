"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  listOrganizations,
  type Organization,
  type OrgType,
  ORG_TYPE_LABEL,
} from "@/lib/api";

type Tab = "ALL" | OrgType;

const TABS: { key: Tab; label: string }[] = [
  { key: "ALL", label: "全部" },
  { key: "GRAND_CHAMBER", label: "市总会" },
  { key: "CHAMBER", label: "商会协会" },
  { key: "ENTERPRISE", label: "企业" },
];

export default function OrganizationsPage() {
  const [tab, setTab] = useState<Tab>("ALL");
  const [search, setSearch] = useState("");
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const data = await listOrganizations({
          type: tab === "ALL" ? undefined : tab,
          search: search || undefined,
          limit: 100,
        });
        if (!cancelled) setOrgs(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab, search]);

  const counts = useMemo(() => {
    const base: Record<Tab, number> = {
      ALL: orgs.length,
      GRAND_CHAMBER: 0,
      CHAMBER: 0,
      ENTERPRISE: 0,
    };
    orgs.forEach((o) => (base[o.type] = (base[o.type] ?? 0) + 1));
    return base;
  }, [orgs]);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-6 py-8 lg:py-10">
      <header className="mb-6">
        <div className="chip chip-brand mb-2">组织网络</div>
        <h1 className="text-xl lg:text-3xl font-bold text-ink-900 tracking-tight mb-1.5">
          组织
        </h1>
        <p className="text-ink-500 text-sm">
          浏览总商会、商会、企业，加入或关注以获得机会通知。
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 -mx-4 px-4 pb-1">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                active
                  ? "bg-brand-700 text-white border-brand-800"
                  : "bg-white text-ink-700 border-ink-200 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {t.label}
              {t.key === "ALL" ? null : (
                <span
                  className={`tabular-nums text-[11px] ${
                    active ? "text-white/80" : "text-ink-400"
                  }`}
                >
                  {counts[t.key]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-6">
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
          placeholder="搜索组织名…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink-200 text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          无法加载：{error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-32" />
          ))}
        </div>
      ) : orgs.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-ink-100/70 text-center text-sm text-ink-500">
          没有匹配的组织。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orgs.map((org) => (
            <OrgCard key={org.id} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrgCard({ org }: { org: Organization }) {
  const accent =
    org.type === "GRAND_CHAMBER"
      ? "border-l-[3px] border-brand-700"
      : org.type === "CHAMBER"
      ? "border-l-[3px] border-brand-400"
      : "border-l-[3px] border-gold-400";

  const badge =
    org.type === "GRAND_CHAMBER"
      ? "bg-brand-700 text-white"
      : org.type === "CHAMBER"
      ? "bg-brand-50 text-brand-700 border border-brand-100"
      : "bg-gold-50 text-gold-600 border border-gold-100";

  return (
    <Link
      href={`/organization?id=${org.id}`}
      className={`group bg-white rounded-xl p-4 lg:p-5 shadow-card hover:shadow-card-hover border border-ink-100/70 transition-all flex gap-3 lg:gap-4 ${accent}`}
    >
      <div className={`shrink-0 w-11 h-11 rounded-lg flex items-center justify-center ${badge}`}>
        <OrgIcon type={org.type} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-ink-900 truncate group-hover:text-brand-700 transition-colors">
            {org.name}
          </span>
          {org.is_verified && (
            <span className="chip chip-brand">✓ 认证</span>
          )}
        </div>
        <div className="text-[12px] text-ink-500 mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
          <span className="inline-block bg-ink-100 text-ink-700 rounded px-1.5 py-[1px]">
            {ORG_TYPE_LABEL[org.type]}
          </span>
          {org.region && <span>{org.region}</span>}
          {org.industry && <span>· {org.industry}</span>}
        </div>
        {org.description && (
          <p className="text-sm text-ink-600 mt-2 line-clamp-2 leading-relaxed">
            {org.description}
          </p>
        )}
        <div className="text-[11px] text-ink-400 mt-3 flex flex-wrap gap-x-3 gap-y-0.5 tabular-nums">
          <span>成员 {org.member_count}</span>
          <span>· 智能体 {org.agent_count}</span>
          {org.child_count > 0 && <span>· 下属 {org.child_count}</span>}
        </div>
      </div>
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-ink-300 group-hover:text-brand-700 transition-colors self-center shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </Link>
  );
}

function OrgIcon({ type }: { type: OrgType }) {
  if (type === "GRAND_CHAMBER") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M4 10l8-5 8 5v1H4v-1Z" />
        <path d="M6 11v9M10 11v9M14 11v9M18 11v9" />
      </svg>
    );
  }
  if (type === "CHAMBER") {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="1.5" />
        <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 20V8l6-4 6 4v12" />
      <path d="M15 20V12l6 2v6" />
      <path d="M3 20h18" />
    </svg>
  );
}
