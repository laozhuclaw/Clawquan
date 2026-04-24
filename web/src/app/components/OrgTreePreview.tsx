"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrgTree, type Organization, ORG_TYPE_LABEL } from "@/lib/api";

export default function OrgTreePreview() {
  const [tree, setTree] = useState<Organization[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getOrgTree();
        if (!cancelled) setTree(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "加载失败");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-4 lg:px-6 pt-10 lg:pt-16 pb-6 max-w-5xl mx-auto">
      <header className="flex items-end justify-between mb-5">
        <div>
          <div className="chip chip-brand mb-2">组织网络</div>
          <h2 className="text-xl lg:text-3xl font-bold text-ink-900 tracking-tight">
            总会 → 商会协会 → 企业，三层连通
          </h2>
          <p className="text-sm text-ink-500 mt-1">
            从苏州市社会组织总会到一线企业，每一层都配备自己的智能体代表。
          </p>
        </div>
        <Link
          href="/organizations"
          className="hidden sm:inline-flex items-center gap-1 text-brand-700 text-sm font-medium hover:underline shrink-0"
        >
          查看全部
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </header>

      {error && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
          暂时无法加载组织（{error}）
        </p>
      )}

      {!tree && !error && (
        <div className="space-y-3">
          <div className="skeleton h-20" />
          <div className="skeleton h-16 ml-6" />
          <div className="skeleton h-16 ml-6" />
        </div>
      )}

      {tree && tree.length === 0 && (
        <p className="text-sm text-ink-500">
          还没有组织，
          <Link href="/register" className="text-brand-700 hover:underline">
            注册第一个商会
          </Link>
        </p>
      )}

      <div className="space-y-3">
        {tree?.map((grand) => (
          <OrgNode key={grand.id} org={grand} depth={0} isLast={false} />
        ))}
      </div>

      <div className="mt-5 sm:hidden">
        <Link
          href="/organizations"
          className="btn-secondary w-full"
        >
          查看全部组织
        </Link>
      </div>
    </section>
  );
}

function OrgNode({
  org,
  depth,
  isLast,
}: {
  org: Organization;
  depth: number;
  isLast: boolean;
}) {
  const typeAccent =
    org.type === "GRAND_CHAMBER"
      ? "border-l-[3px] border-brand-700"
      : org.type === "CHAMBER"
      ? "border-l-[3px] border-brand-400"
      : "border-l-[3px] border-gold-400";

  return (
    <div className={depth === 0 ? "" : "relative"}>
      {/* Tree connector line on left */}
      {depth > 0 && (
        <>
          <span
            aria-hidden
            className="absolute left-3 -top-3 bottom-1/2 w-px bg-ink-200"
            style={{ marginLeft: (depth - 1) * 24 }}
          />
          <span
            aria-hidden
            className="absolute left-3 top-1/2 h-px w-3 bg-ink-200"
            style={{ marginLeft: (depth - 1) * 24 }}
          />
        </>
      )}

      <Link
        href={`/organization?id=${org.id}`}
        className={`group flex items-center gap-3 p-3.5 pr-2 bg-white rounded-xl
                    shadow-card hover:shadow-card-hover border border-ink-100/70
                    transition-all ${typeAccent}`}
        style={{ marginLeft: depth * 24 }}
      >
        {/* Type badge */}
        <div
          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                      ${
                        org.type === "GRAND_CHAMBER"
                          ? "bg-brand-700 text-white"
                          : org.type === "CHAMBER"
                          ? "bg-brand-50 text-brand-700 border border-brand-100"
                          : "bg-gold-50 text-gold-600 border border-gold-100"
                      }`}
        >
          <OrgIcon type={org.type} />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-ink-900 truncate">
              {org.name}
            </span>
            {org.is_verified && (
              <span className="chip chip-brand">✓ 认证</span>
            )}
          </div>
          <div className="text-[12px] text-ink-500 flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 tabular-nums">
            <span>{ORG_TYPE_LABEL[org.type]}</span>
            {org.region && (
              <span className="flex items-center gap-0.5">
                <span className="text-ink-300">·</span>
                {org.region}
              </span>
            )}
            {org.industry && (
              <span className="flex items-center gap-0.5">
                <span className="text-ink-300">·</span>
                {org.industry}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <span className="text-ink-300">·</span>
              成员 {org.member_count}
            </span>
            <span className="flex items-center gap-0.5">
              <span className="text-ink-300">·</span>
              智能体 {org.agent_count}
            </span>
          </div>
        </div>

        <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink-300 group-hover:text-brand-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </Link>

      {org.children && org.children.length > 0 && (
        <div className="mt-2.5 space-y-2.5">
          {org.children.map((c, i) => (
            <OrgNode
              key={c.id}
              org={c}
              depth={depth + 1}
              isLast={i === (org.children?.length || 0) - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrgIcon({ type }: { type: Organization["type"] }) {
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
