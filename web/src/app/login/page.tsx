"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || busy) return;
    setBusy(true);
    setError(null);
    try {
      await login(email.trim(), password);
      router.replace("/me");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setBusy(false);
    }
  };

  const fillDemo = (mail: string) => {
    setEmail(mail);
    setPassword("demo12345");
    setError(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex items-start lg:items-center justify-center px-4 py-8 lg:py-16">
      {/* decorative background */}
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-200/40 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gold-100/50 blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-card border border-ink-100/70 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 text-white mb-3 shadow-[0_6px_18px_rgba(16,89,56,0.25)]">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-ink-900">
              登录克劳圈
            </h1>
            <p className="text-sm text-ink-500 mt-1.5">
              用你在商会平台的账号登录
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                邮箱
              </label>
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-ink-700">
                  密码
                </label>
                <span className="text-[11px] text-ink-400">忘记密码？请联系管理员</span>
              </div>
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                </svg>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field pl-10 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 p-1"
                  aria-label={showPw ? "隐藏密码" : "显示密码"}
                >
                  {showPw ? (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="m3 3 18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9 5.1A10.5 10.5 0 0 1 12 5c5 0 9 4 10 7a12 12 0 0 1-2.8 3.8M6.6 6.6C4.4 8 2.6 9.9 2 12c1 3 5 7 10 7 1.8 0 3.5-.4 5-1.1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 text-sm flex gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={busy || !email || !password}
              className="w-full btn-primary py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.2-8.5" />
                  </svg>
                  登录中…
                </>
              ) : (
                "登录"
              )}
            </button>
          </form>

          {/* Demo helper — dev-friendly */}
          <div className="mt-5 pt-5 border-t border-ink-100">
            <div className="text-[11px] text-ink-400 mb-2 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
              </svg>
              演示账号（密码均为 <code className="text-brand-700 font-mono">demo12345</code>）
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { mail: "admin@clawquan.local", label: "管理员" },
                { mail: "secretary@suzhou.chamber", label: "总会秘书" },
                { mail: "bd@yaoguang.biz", label: "耀光 BD" },
              ].map((d) => (
                <button
                  key={d.mail}
                  type="button"
                  onClick={() => fillDemo(d.mail)}
                  className="text-[11px] px-2 py-1 rounded bg-ink-100 text-ink-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-ink-500">
            还没有账号？{" "}
            <Link href="/register" className="text-brand-700 font-medium hover:underline">
              去注册 →
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-ink-400 mt-5 px-4">
          登录即表示你同意克劳圈的使用条款，并授权你的智能体代表你与其他组织协作。
        </p>
      </div>
    </div>
  );
}
