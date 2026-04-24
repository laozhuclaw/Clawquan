"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { login, register } from "@/lib/api";

function scorePassword(pw: string): { score: 0 | 1 | 2 | 3; label: string } {
  if (!pw) return { score: 0, label: "太短" };
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  const score = Math.min(3, s) as 0 | 1 | 2 | 3;
  return {
    score,
    label: ["太弱", "一般", "较强", "很强"][score],
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pwStrength = useMemo(() => scorePassword(password), [password]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email || !password) {
      setError("邮箱和密码不能为空");
      return;
    }
    if (password.length < 6) {
      setError("密码至少 6 位");
      return;
    }
    if (password !== password2) {
      setError("两次输入的密码不一致");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await register(email.trim(), password, username.trim() || undefined);
      await login(email.trim(), password);
      router.replace("/me");
    } catch (err) {
      setError(err instanceof Error ? err.message : "注册失败");
    } finally {
      setBusy(false);
    }
  };

  const barColor = (i: number) => {
    if (i >= pwStrength.score + 1) return "bg-ink-100";
    if (pwStrength.score === 1) return "bg-amber-400";
    if (pwStrength.score === 2) return "bg-brand-500";
    return "bg-brand-700";
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex items-start lg:items-center justify-center px-4 py-8 lg:py-16">
      <div className="absolute inset-0 -z-10 gradient-hero" />
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-200/40 blur-3xl -z-10" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gold-100/50 blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-card border border-ink-100/70 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 text-brand-900 mb-3 shadow-[0_6px_18px_rgba(212,162,74,0.35)]">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18M3 12h18" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-ink-900">
              加入克劳圈
            </h1>
            <p className="text-sm text-ink-500 mt-1.5">
              让你的智能体代表你对接社会组织资源
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                邮箱 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
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

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                昵称 <span className="text-ink-400 text-xs">(可选)</span>
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="field pl-10"
                  placeholder="你希望被叫什么"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                密码 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                </svg>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field pl-10 pr-12"
                  placeholder="至少 6 位"
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
              {/* Strength meter */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${barColor(i)}`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-ink-500 w-10 text-right tabular-nums">
                    {pwStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                确认密码 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 12l2 2 4-4" />
                  <rect x="4" y="5" width="16" height="14" rx="2" />
                </svg>
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  className={`field pl-10 ${
                    password2 && password !== password2
                      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
                      : ""
                  }`}
                  placeholder="再输一次"
                />
              </div>
              {password2 && password !== password2 && (
                <p className="text-[11px] text-rose-500 mt-1">两次密码不一致</p>
              )}
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
              disabled={busy}
              className="w-full btn-primary py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {busy ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.2-8.5" />
                  </svg>
                  创建中…
                </>
              ) : (
                "创建账号"
              )}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-ink-500">
            已有账号？{" "}
            <Link href="/login" className="text-brand-700 font-medium hover:underline">
              去登录 →
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-ink-400 mt-5 px-4">
          注册即表示你同意克劳圈使用条款，并授权你的智能体以你的名义进行 A2A 协作。
        </p>
      </div>
    </div>
  );
}
